<?php

namespace App\Controller;

use App\Repository\ExpenseRepository;
use App\Repository\IncomeRepository;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;

class RapportController extends AbstractController
{
    private $expenseRepository;
    private $incomeRepository;
    private $categoryRepository;
    private $security;

    public function __construct(
        ExpenseRepository $expenseRepository, 
        IncomeRepository $incomeRepository, 
        CategoryRepository $categoryRepository, 
        Security $security
    ) {
        $this->expenseRepository = $expenseRepository;
        $this->incomeRepository = $incomeRepository;
        $this->categoryRepository = $categoryRepository;
        $this->security = $security;
    }

    #[Route('/report/monthly', name: 'report_monthly', methods: ['GET'])]
    public function getMonthlyReport(Request $request): JsonResponse
    {
        $user = $this->security->getUser();
        $month = $request->query->get('month');
        $currentMonthStart = new \DateTime("$month-01");
        $currentMonthEnd = (clone $currentMonthStart)->modify('last day of this month');

        $expenses = $this->expenseRepository->findByUserAndDateRange($user, $currentMonthStart, $currentMonthEnd);
        $incomes = $this->incomeRepository->findByUserAndDateRange($user, $currentMonthStart, $currentMonthEnd);

        $report = $this->generateReport($expenses, $incomes);

        return new JsonResponse($report);
    }

    #[Route('/report/annual', name: 'report_annual', methods: ['GET'])]
    public function getAnnualReport(Request $request): JsonResponse
    {
        $user = $this->security->getUser();
        $year = $request->query->get('year');
        $currentYearStart = new \DateTime("$year-01-01");
        $currentYearEnd = new \DateTime("$year-12-31");

        $expenses = $this->expenseRepository->findByUserAndDateRange($user, $currentYearStart, $currentYearEnd);
        $incomes = $this->incomeRepository->findByUserAndDateRange($user, $currentYearStart, $currentYearEnd);

        $report = $this->generateReport($expenses, $incomes);

        return new JsonResponse($report);
    }

    #[Route('/report/comparison', name: 'report_comparison', methods: ['GET'])]
    public function getComparisonReport(Request $request): JsonResponse
    {
        $user = $this->security->getUser();
        $period1Start = new \DateTime($request->query->get('period1Start'));
        $period1End = new \DateTime($request->query->get('period1End'));
        $period2Start = new \DateTime($request->query->get('period2Start'));
        $period2End = new \DateTime($request->query->get('period2End'));

        $expenses1 = $this->expenseRepository->findByUserAndDateRange($user, $period1Start, $period1End);
        $incomes1 = $this->incomeRepository->findByUserAndDateRange($user, $period1Start, $period1End);

        $expenses2 = $this->expenseRepository->findByUserAndDateRange($user, $period2Start, $period2End);
        $incomes2 = $this->incomeRepository->findByUserAndDateRange($user, $period2Start, $period2End);

        $report1 = $this->generateReport($expenses1, $incomes1);
        $report2 = $this->generateReport($expenses2, $incomes2);

        return new JsonResponse(['period1' => $report1, 'period2' => $report2]);
    }

    private function generateReport($expenses, $incomes)
    {
        $totalIncome = array_reduce($incomes, fn($sum, $income) => $sum + $income->getAmount(), 0);
        $totalExpense = array_reduce($expenses, fn($sum, $expense) => $sum + $expense->getAmount(), 0);
        $totalSavings = $totalIncome - $totalExpense;

        $categories = $this->categoryRepository->findAll();
        $categoryData = [];

        foreach ($categories as $category) {
            $categoryExpense = array_reduce($expenses, fn($sum, $expense) => $expense->getCategory()->getId() === $category->getId() ? $sum + $expense->getAmount() : $sum, 0);
            $categoryIncome = array_reduce($incomes, fn($sum, $income) => $income->getCategory()->getId() === $category->getId() ? $sum + $income->getAmount() : $sum, 0);

            $categoryData[] = [
                'name' => $category->getName(),
                'amount' => $categoryIncome - $categoryExpense,
            ];
        }

        return [
            'totalIncome' => $totalIncome,
            'totalExpense' => $totalExpense,
            'totalSavings' => $totalSavings,
            'categories' => $categoryData
        ];
    }
}
