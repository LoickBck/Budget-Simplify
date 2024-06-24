<?php

namespace App\Controller;

use App\Repository\ExpenseRepository;
use App\Repository\IncomeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class AlertController extends AbstractController
{
    private $expenseRepository;
    private $incomeRepository;
    private $security;

    public function __construct(
        ExpenseRepository $expenseRepository,
        IncomeRepository $incomeRepository,
        Security $security
    ) {
        $this->expenseRepository = $expenseRepository;
        $this->incomeRepository = $incomeRepository;
        $this->security = $security;
    }

    #[Route('/alerts', name: 'alert_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->security->getUser();

        $expenses = $this->expenseRepository->findBy(['user' => $user]);
        $incomes = $this->incomeRepository->findBy(['user' => $user]);

        $alerts = [
            'expenses' => $expenses,
            'incomes' => $incomes
        ];

        return new JsonResponse($alerts);
    }
}
