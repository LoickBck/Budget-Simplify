<?php

namespace App\Controller;

use App\Entity\Budget;
use App\Repository\BudgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class BudgetController extends AbstractController
{
    private $entityManager;
    private $budgetRepository;

    public function __construct(EntityManagerInterface $entityManager, BudgetRepository $budgetRepository)
    {
        $this->entityManager = $entityManager;
        $this->budgetRepository = $budgetRepository;
    }

    /**
     * @Route("/budgets", methods={"GET"})
     */
    public function index(): JsonResponse
    {
        $budgets = $this->budgetRepository->findAll();
        return new JsonResponse($budgets);
    }

    /**
     * @Route("/budgets", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $budget = new Budget();
        $budget->setName($data['name']);
        $budget->setTotalAmount($data['totalAmount']);

        $this->entityManager->persist($budget);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Budget created!'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/budgets/{id}", methods={"PUT"})
     */
    public function update($id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $budget = $this->budgetRepository->find($id);

        if (!$budget) {
            return new JsonResponse(['status' => 'Budget not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $budget->setName($data['name']);
        $budget->setTotalAmount($data['totalAmount']);

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Budget updated!']);
    }

    /**
     * @Route("/budgets/{id}", methods={"DELETE"})
     */
    public function delete($id): JsonResponse
    {
        $budget = $this->budgetRepository->find($id);

        if (!$budget) {
            return new JsonResponse(['status' => 'Budget not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($budget);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Budget deleted!']);
    }
}
