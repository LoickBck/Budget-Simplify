<?php

namespace App\Controller;

use App\Entity\Income;
use App\Repository\IncomeRepository;
use App\Repository\BudgetRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class IncomeController extends AbstractController
{
    private $entityManager;
    private $incomeRepository;
    private $budgetRepository;
    private $categoryRepository;

    public function __construct(EntityManagerInterface $entityManager, IncomeRepository $incomeRepository, BudgetRepository $budgetRepository, CategoryRepository $categoryRepository)
    {
        $this->entityManager = $entityManager;
        $this->incomeRepository = $incomeRepository;
        $this->budgetRepository = $budgetRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @Route("/incomes", methods={"GET"})
     */
    public function index(): JsonResponse
    {
        $incomes = $this->incomeRepository->findAll();
        return new JsonResponse($incomes);
    }

    /**
     * @Route("/incomes", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $budget = $this->budgetRepository->find($data['budget']);
        $category = $this->categoryRepository->find($data['category']);

        $income = new Income();
        $income->setName($data['name']);
        $income->setAmount($data['amount']);
        $income->setBudget($budget);
        $income->setCategory($category);

        $this->entityManager->persist($income);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Income created!'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/incomes/{id}", methods={"DELETE"})
     */
    public function delete($id): JsonResponse
    {
        $income = $this->incomeRepository->find($id);

        if (!$income) {
            return new JsonResponse(['status' => 'Income not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($income);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Income deleted!']);
    }
}
