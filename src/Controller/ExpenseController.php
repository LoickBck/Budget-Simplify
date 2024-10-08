<?php

namespace App\Controller;

use App\Entity\Expense;
use App\Repository\ExpenseRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class ExpenseController extends AbstractController
{
    private $entityManager;
    private $expenseRepository;
    private $categoryRepository;
    private $security;

    public function __construct(EntityManagerInterface $entityManager, ExpenseRepository $expenseRepository, CategoryRepository $categoryRepository, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->expenseRepository = $expenseRepository;
        $this->categoryRepository = $categoryRepository;
        $this->security = $security;
    }

    #[Route('/expenses', name: 'expense_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->security->getUser();
        $expenses = $this->expenseRepository->findBy(['user' => $user]);

        $data = [];
        foreach ($expenses as $expense) {
            $data[] = [
                'id' => $expense->getId(),
                'name' => $expense->getName(),
                'amount' => $expense->getAmount(),
                'category' => [
                    'id' => $expense->getCategory()->getId(),
                    'name' => $expense->getCategory()->getName()
                ],
                'date' => $expense->getDate()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/expenses', name: 'expense_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $user = $this->security->getUser();
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['amount'], $data['category'], $data['date'])) {
            return new JsonResponse(['message' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }

        $category = $this->categoryRepository->find($data['category']);
        if (!$category) {
            return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $expense = new Expense();
        $expense->setName($data['name']);
        $expense->setAmount($data['amount']);
        $expense->setCategory($category);
        $expense->setUser($user);
        $expense->setDate(new \DateTime($data['date']));

        $this->entityManager->persist($expense);

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Expense created successfully'], Response::HTTP_CREATED);
    }

    private function createRecurringExpenses(Expense $expense)
    {
        $currentDate = new \DateTime($expense->getDate()->format('Y-m-d'));
        $endDate = (clone $currentDate)->add(new \DateInterval('P1Y'));

        $interval = new \DateInterval('P1M');
        $period = new \DatePeriod($currentDate, $interval, $endDate);

        foreach ($period as $date) {
            if ($date == $currentDate) {
                continue;
            }

            $recurringExpense = clone $expense;
            $recurringExpense->setDate($date);
            $this->entityManager->persist($recurringExpense);
        }
    }

    #[Route('/expenses/{id}', name: 'expense_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $expense = $this->expenseRepository->find($id);

        if (!$expense || $expense->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Expense not found'], Response::HTTP_NOT_FOUND);
        }

        $data = [
            'id' => $expense->getId(),
            'name' => $expense->getName(),
            'amount' => $expense->getAmount(),
            'category' => $expense->getCategory()->getName(),
            'date' => $expense->getDate()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse($data);
    }

    #[Route('/expenses/{id}', name: 'expense_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $expense = $this->expenseRepository->find($id);

        if (!$expense || $expense->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Expense not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $expense->setName($data['name']);
        }
        if (isset($data['amount'])) {
            $expense->setAmount($data['amount']);
        }
        if (isset($data['category'])) {
            $category = $this->categoryRepository->find($data['category']);
            if ($category) {
                $expense->setCategory($category);
            }
        }
        if (isset($data['date'])) {
            $expense->setDate(new \DateTime($data['date']));
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Expense updated successfully']);
    }

    #[Route('/expenses/{id}', name: 'expense_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $expense = $this->expenseRepository->find($id);

        if (!$expense || $expense->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Expense not found'], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($expense);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Expense deleted successfully']);
    }
}
