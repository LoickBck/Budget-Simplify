<?php

namespace App\Controller;

use App\Entity\Income;
use App\Repository\IncomeRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class IncomeController extends AbstractController
{
    private $entityManager;
    private $incomeRepository;
    private $categoryRepository;
    private $security;

    public function __construct(EntityManagerInterface $entityManager, IncomeRepository $incomeRepository, CategoryRepository $categoryRepository, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->incomeRepository = $incomeRepository;
        $this->categoryRepository = $categoryRepository;
        $this->security = $security;
    }

    #[Route('/incomes', name: 'income_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->security->getUser();
        $incomes = $this->incomeRepository->findBy(['user' => $user]);

        $data = [];
        foreach ($incomes as $income) {
            $data[] = [
                'id' => $income->getId(),
                'name' => $income->getName(),
                'amount' => $income->getAmount(),
                'category' => $income->getCategory()->getName(),
                'isRegular' => $income->getIsRegular(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/incomes', name: 'income_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $user = $this->security->getUser();
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['amount'], $data['category'], $data['isRegular'])) {
            return new JsonResponse(['message' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $category = $this->categoryRepository->find($data['category']);
        if (!$category) {
            return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $income = new Income();
        $income->setName($data['name']);
        $income->setAmount($data['amount']);
        $income->setCategory($category);
        $income->setUser($user);
        $income->setIsRegular($data['isRegular']);

        $this->entityManager->persist($income);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Income created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/incomes/{id}', name: 'income_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $income = $this->incomeRepository->find($id);

        if (!$income || $income->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Income not found'], Response::HTTP_NOT_FOUND);
        }

        $data = [
            'id' => $income->getId(),
            'name' => $income->getName(),
            'amount' => $income->getAmount(),
            'category' => $income->getCategory()->getName(),
            'isRegular' => $income->getIsRegular(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/incomes/{id}', name: 'income_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $income = $this->incomeRepository->find($id);

        if (!$income || $income->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Income not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $income->setName($data['name']);
        }
        if (isset($data['amount'])) {
            $income->setAmount($data['amount']);
        }
        if (isset($data['category'])) {
            $category = $this->categoryRepository->find($data['category']);
            if ($category) {
                $income->setCategory($category);
            }
        }
        if (isset($data['isRegular'])) {
            $income->setIsRegular($data['isRegular']);
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Income updated successfully']);
    }

    #[Route('/incomes/{id}', name: 'income_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $income = $this->incomeRepository->find($id);

        if (!$income || $income->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Income not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($income);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Income deleted successfully']);
    }
}
