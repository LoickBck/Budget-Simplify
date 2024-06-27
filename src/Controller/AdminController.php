<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class AdminController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/admin/users', name: 'admin_users_index', methods: ['GET'])]
    public function index(): Response
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();
        return $this->json($users, Response::HTTP_OK, [], ['groups' => 'user']);
    }

    #[Route('/admin/users/{id}', name: 'admin_user_show', methods: ['GET'])]
    public function show(User $user): Response
    {
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user']);
    }

    #[Route('/admin/users/{id}/edit', name: 'admin_user_edit', methods: ['POST'])]
    public function edit(Request $request, User $user): Response
    {
        $data = json_decode($request->getContent(), true);

        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setIntroduction($data['introduction']);
        $user->setDescription($data['description']);

        $this->entityManager->flush();

        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user']);
    }

    #[Route('/admin/users/{id}', name: 'admin_user_delete', methods: ['DELETE'])]
    public function delete(User $user): Response
    {
        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return $this->json(['message' => 'User deleted successfully'], Response::HTTP_OK);
    }
}
