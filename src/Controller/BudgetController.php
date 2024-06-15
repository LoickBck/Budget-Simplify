<?php

namespace App\Controller;

use App\Controller\BudgetController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BudgetController extends AbstractController
{
    #[Route('/budget', name: 'app_budget')]
    public function index(): Response
    {
        return $this->render('budget/index.html.twig', [
            'controller_name' => 'BudgetController',
        ]);
    }
}
