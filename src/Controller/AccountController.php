<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AccountController extends AbstractController
{
    private $entityManager;
    private $userRepository;
    private $security;
    private $passwordHasher;
    private $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        Security $security,
        UserPasswordHasherInterface $passwordHasher,
        LoggerInterface $logger // Injection du service logger
    ) {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->security = $security;
        $this->passwordHasher = $passwordHasher;
        $this->logger = $logger;
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, ValidatorInterface $validator): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $user = new User();
            $user->setEmail($data['email']);
            $user->setPassword($this->passwordHasher->hashPassword($user, $data['password']));
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            $user->setIntroduction($data['introduction']);
            $user->setDescription($data['description']);

            // Forcer la génération du slug
            $user->initializeSlug();

            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[$error->getPropertyPath()] = $error->getMessage();
                }
                return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
            }

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Utilisateur enregistré avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());
            return new JsonResponse(['message' => 'Une erreur est survenue lors de l\'enregistrement'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        try {
            $user = $this->getUser();
            if ($user) {
                return new JsonResponse(['message' => 'Utilisateur connecté avec succès']);
            }
            return new JsonResponse(['message' => 'Adresse email ou mot de passe invalide'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage());
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la connexion'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse(['message' => 'Utilisateur déconnecté', 'redirect' => 'homepage']);
    }

    #[Route('/update-password', name: 'update_password', methods: ['POST'])]
    public function updatePassword(Request $request): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $oldPassword = $data['currentPassword'];
        $newPassword = $data['newPassword'];

        if (!$this->passwordHasher->isPasswordValid($user, $oldPassword)) {
            return $this->json(['message' => 'Current password is incorrect'], Response::HTTP_BAD_REQUEST);
        }

        $user->setPassword($this->passwordHasher->hashPassword($user, $newPassword));
        $this->entityManager->flush();

        return $this->json(['message' => 'Password updated successfully'], Response::HTTP_OK);
    }

    #[Route("/account", name: "account_index", methods: ['GET', 'POST'])]
    public function account(Request $request): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);
            $user->setEmail($data['email']);
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            $user->setIntroduction($data['introduction']);
            $user->setDescription($data['description']);

            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Informations mises à jour avec succès'], Response::HTTP_OK);
        }

        if ($request->headers->get('Accept') === 'application/json') {
            return new JsonResponse([
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'introduction' => $user->getIntroduction(),
                'description' => $user->getDescription(),
                'slug' => $user->getSlug(),
            ]);
        }

        return $this->render('base.html.twig');
    }
}
