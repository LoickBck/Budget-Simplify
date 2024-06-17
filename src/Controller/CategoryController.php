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

    #[Route('/api/categorie', name: 'api_create_category', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $category = new Category();
            $category->setName($data['name']);
            $category->setDescription($data['description'] ?? null);

            $this->entityManager->persist($category);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Catégorie créée avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            // Enregistrez l'exception dans les logs
            $this->container->get('logger')->error($e->getMessage());

            // Retournez une réponse d'erreur JSON
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la création'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/categorie', name: 'api_get_category', methods: ['GET'])]
    public function index(): JsonResponse
    {
        try {
            $categorys = $this->categoryRepository->findAll();

            $data = [];
            foreach ($categorys as $category) {
                $data[] = [
                    'id' => $category->getId(),
                    'name' => $category->getName(),
                    'description' => $category->getDescription(),
                ];
            }

            return new JsonResponse($data);
        } catch (\Exception $e) {
            // Enregistrez l'exception dans les logs
            $this->container->get('logger')->error($e->getMessage());

            // Retournez une réponse d'erreur JSON
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la récupération des catégories'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/categorie/{id}', name: 'api_update_category', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $category = $this->categoryRepository->find($id);

            if (!$category) {
                return new JsonResponse(['message' => 'Catégorie non trouvée'], Response::HTTP_NOT_FOUND);
            }

            $data = json_decode($request->getContent(), true);
            $category->setName($data['name'] ?? $category->getName());
            $category->setDescription($data['description'] ?? $category->getDescription());

            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Catégorie mise à jour avec succès']);
        } catch (\Exception $e) {
            // Enregistrez l'exception dans les logs
            $this->container->get('logger')->error($e->getMessage());

            // Retournez une réponse d'erreur JSON
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la mise à jour'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/categorie/{id}', name: 'api_delete_category', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $category = $this->categoryRepository->find($id);

            if (!$category) {
                return new JsonResponse(['message' => 'Catégorie non trouvée'], Response::HTTP_NOT_FOUND);
            }

            $this->entityManager->remove($category);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Catégorie supprimée avec succès']);
        } catch (\Exception $e) {
            // Enregistrez l'exception dans les logs
            $this->container->get('logger')->error($e->getMessage());

            // Retournez une réponse d'erreur JSON
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la suppression'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
