<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    private $entityManager;
    private $categoryRepository;

    public function __construct(EntityManagerInterface $entityManager, CategoryRepository $categoryRepository)
    {
        $this->entityManager = $entityManager;
        $this->categoryRepository = $categoryRepository;
    }

    #[Route('/categories', name: 'category_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->getUser();
        $categories = $this->categoryRepository->findBy(['user' => $user]);

        $data = [];
        foreach ($categories as $category) {
            $data[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'description' => $category->getDescription(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/categories', name: 'category_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        $category = new Category();
        $category->setName($data['name']);
        $category->setDescription($data['description'] ?? null);
        $category->setUser($user);

        $this->entityManager->persist($category);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Catégorie créée avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/categories/{id}', name: 'category_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (!$category || $category->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Catégorie non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $data = [
            'id' => $category->getId(),
            'name' => $category->getName(),
            'description' => $category->getDescription(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/categories/{id}', name: 'category_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (!$category || $category->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Catégorie non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $category->setName($data['name'] ?? $category->getName());
        $category->setDescription($data['description'] ?? $category->getDescription());

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Catégorie mise à jour avec succès']);
    }

    #[Route('/categories/{id}', name: 'category_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $category = $this->categoryRepository->find($id);

        if (!$category || $category->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Catégorie non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($category);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Catégorie supprimée avec succès']);
    }
}
