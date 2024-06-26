<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class UserController extends AbstractController
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

        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'introduction' => $user->getIntroduction(),
            'description' => $user->getDescription(),
            'picture' => $user->getPicture(),
            'slug' => $user->getSlug(),
        ]);
    }

    #[Route('/user/{slug}', name: 'user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'introduction' => $user->getIntroduction(),
            'description' => $user->getDescription(),
            'picture' => $user->getPicture(),
            'slug' => $user->getSlug(),
        ]);
    }
}