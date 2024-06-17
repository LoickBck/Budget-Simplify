<?php

namespace App\Controller;

use App\Entity\Budget;
use App\Repository\BudgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class BudgetController extends AbstractController
{
    private $entityManager;
    private $budgetRepository;
    private $security;

    public function __construct(EntityManagerInterface $entityManager, BudgetRepository $budgetRepository, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->budgetRepository = $budgetRepository;
        $this->security = $security;
    }

    #[Route('/api/budgets', name: 'api_create_budget', methods: ['POST'])]
    public function createBudget(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $budget = new Budget();
            $budget->setName($data['name']);
            $budget->setAmount($data['amount']);
            $budget->setCreatedAt(new \DateTime());
            $budget->setUser($this->getUser());

            $this->entityManager->persist($budget);
            $this->entityManager->flush();

            return new JsonResponse(['message' => 'Budget créé avec succès'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            // Enregistrez l'exception dans les logs
            $this->container->get('logger')->error($e->getMessage());

            // Retournez une réponse d'erreur JSON
            return new JsonResponse(['message' => 'Une erreur est survenue lors de la création du budget'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
