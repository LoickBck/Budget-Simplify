<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\AccountType;
use App\Entity\PasswordUpdate;
use App\Form\RegistrationType;
use App\Form\PasswordUpdateType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\TooManyLoginAttemptsAuthenticationException;

class AccountController extends AbstractController
{

    /**
     * Permet à l'utilisateur de se connecter
     *
     * @param AuthenticationUtils $utils
     * @return Response
     */   
    #[Route('/api/login', name: 'account_login', methods: ['POST'])]
    public function login(AuthenticationUtils $utils): Response
    {
        $error = $utils->getLastAuthenticationError();
        $username = $utils->getLastUsername();

        if ($error instanceof TooManyLoginAttemptsAuthenticationException) {
            return $this->json(['error' => 'Trop de tentatives de connexion. Réessayez plus tard'], Response::HTTP_TOO_MANY_REQUESTS);
        }

        return $this->json([
            'hasError' => $error !== null,
            'username' => $username
        ]);
    }

    /**
     * Permet de se déconnecter
     *
     * @return void
     */
    #[Route("/api/logout", name: "account_logout", methods: ['POST'])]
    public function logout(): void
    {
        // Le framework gère la déconnexion automatiquement
    }

    /**
     * Permet d'afficher le formulaire d'inscription ainsi que la gestion de l'inscription de l'utilisateur
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param UserPasswordHasherInterface $hasher
     * @return Response
     */
    #[Route("/api/register", name: "account_register", methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $manager, UserPasswordHasherInterface $hasher): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $hash = $hasher->hashPassword($user, $user->getPassword());
            $user->setPassword($hash);

            $manager->persist($user);
            $manager->flush();

            return $this->json(['success' => 'L\'utilisateur a été enregistré avec succès.'], Response::HTTP_CREATED);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Permet de modifier le mot de passe
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param UserPasswordHasherInterface $hasher
     * @return Response
     */
    #[Route("/api/account/password-update", name: "account_password", methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function updatePassword(Request $request, EntityManagerInterface $manager, UserPasswordHasherInterface $hasher): Response
    {
        $passwordUpdate = new PasswordUpdate();
        $user = $this->getUser();
        $form = $this->createForm(PasswordUpdateType::class, $passwordUpdate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if (!password_verify($passwordUpdate->getOldPassword(), $user->getPassword())) {
                return $this->json(['error' => "Le mot de passe que vous avez tapé n'est pas votre mot de passe actuel"], Response::HTTP_BAD_REQUEST);
            }

            $newPassword = $passwordUpdate->getNewPassword();
            $hash = $hasher->hashPassword($user, $newPassword);

            $user->setPassword($hash);
            $manager->persist($user);
            $manager->flush();

            return $this->json(['success' => 'Votre mot de passe a bien été modifié']);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Permet de supprimer l'image de l'utilisateur
     *
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route("/api/account/delimg", name: "account_delimg", methods: ['DELETE'])]
    #[IsGranted('ROLE_USER')]
    public function removeImg(EntityManagerInterface $manager): Response
    {
        $user = $this->getUser();
        if (!empty($user->getPicture())) {
            unlink($this->getParameter('uploads_directory') . '/' . $user->getPicture());
            $user->setPicture('');
            $manager->persist($user);
            $manager->flush();
            return $this->json(['success' => 'Votre avatar a bien été supprimé']);
        }

        return $this->json(['error' => 'Aucune image trouvée à supprimer'], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Permet de modifier l'avatar de l'utilisateur
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route("/api/account/imgmodify", name: "account_modifimg", methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function imgModify(Request $request, EntityManagerInterface $manager): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(ImgModifyType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if (!empty($user->getPicture())) {
                unlink($this->getParameter('uploads_directory') . '/' . $user->getPicture());
            }

            $file = $form['newPicture']->getData();
            if (!empty($file)) {
                $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
                $newFilename = $safeFilename . "-" . uniqid() . '.' . $file->guessExtension();
                try {
                    $file->move(
                        $this->getParameter('uploads_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
                }
                $user->setPicture($newFilename);
            }
            $manager->persist($user);
            $manager->flush();

            return $this->json(['success' => 'Votre avatar a bien été modifié']);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
    }
}
