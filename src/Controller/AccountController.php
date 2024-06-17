<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
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

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->security = $security;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $user = new User();
            $user->setEmail($data['email']);
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            $user->setIntroduction($data['introduction']);
            $user->setDescription($data['description']);

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
            $this->container->get('logger')->error($e->getMessage());
            return new JsonResponse(['message' => 'Une erreur est survenue lors de l\'enregistrement'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        try {
            $user = $this->getUser();
            if ($user) {
                return new JsonResponse(['message' => 'Utilisateur connecté avec succès']);
            }
            return new JsonResponse(['message' => 'Adresse email ou mot de passe invalide'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            $this->container->get('logger')->error($e->getMessage());
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la connexion'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse(['message' => 'Utilisateur déconnecté', 'redirect' => 'homepage']);
    }

    #[Route('/api/update-password', name: 'api_update_password', methods: ['POST'])]
    public function updatePassword(Request $request, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator): JsonResponse
    {
        try {
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $data = json_decode($request->getContent(), true);
            $user->setPassword($passwordHasher->hashPassword($user, $data['newPassword']));

            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[$error->getPropertyPath()] = $error->getMessage();
                }
                return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
            }

            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Mot de passe mis à jour avec succès']);
        } catch (\Exception $e) {
            $this->container->get('logger')->error($e->getMessage());
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la mise à jour du mot de passe'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
