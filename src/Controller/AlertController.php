<?php

namespace App\Controller;

use App\Repository\BudgetRepository;
use App\Repository\ExpenseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class AlertController extends AbstractController
{
    private $budgetRepository;
    private $expenseRepository;
    private $security;

    public function __construct(BudgetRepository $budgetRepository, ExpenseRepository $expenseRepository, Security $security)
    {
        $this->budgetRepository = $budgetRepository;
        $this->expenseRepository = $expenseRepository;
        $this->security = $security;
    }

    #[Route('/alerts', name: 'alert_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->security->getUser();
        $budgets = $this->budgetRepository->findBy(['user' => $user]);

        $alerts = [];
        foreach ($budgets as $budget) {
            $totalExpenses = $this->expenseRepository->getTotalExpensesByBudget($budget);
            if ($totalExpenses > $budget->getTotalAmount()) {
                $alerts[] = [
                    'budget' => $budget->getName(),
                    'totalAmount' => $budget->getTotalAmount(),
                    'totalExpenses' => $totalExpenses
                ];
            }
        }

        return new JsonResponse($alerts);
    }
}
