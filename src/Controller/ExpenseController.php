<?php

namespace App\Controller;

use App\Entity\Expense;
use App\Repository\ExpenseRepository;
use App\Repository\BudgetRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ExpenseController extends AbstractController
{
    private $entityManager;
    private $expenseRepository;
    private $budgetRepository;
    private $categoryRepository;

    public function __construct(EntityManagerInterface $entityManager, ExpenseRepository $expenseRepository, BudgetRepository $budgetRepository, CategoryRepository $categoryRepository)
    {
        $this->entityManager = $entityManager;
        $this->expenseRepository = $expenseRepository;
        $this->budgetRepository = $budgetRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @Route("/expenses", methods={"GET"})
     */
    public function index(): JsonResponse
    {
        $expenses = $this->expenseRepository->findAll();
        return new JsonResponse($expenses);
    }

    /**
     * @Route("/expenses", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $budget = $this->budgetRepository->find($data['budget']);
        $category = $this->categoryRepository->find($data['category']);

        $expense = new Expense();
        $expense->setName($data['name']);
        $expense->setAmount($data['amount']);
        $expense->setBudget($budget);
        $expense->setCategory($category);

        $this->entityManager->persist($expense);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Expense created!'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/expenses/{id}", methods={"DELETE"})
     */
    public function delete($id): JsonResponse
    {
        $expense = $this->expenseRepository->find($id);

        if (!$expense) {
            return new JsonResponse(['status' => 'Expense not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($expense);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Expense deleted!']);
    }
}
