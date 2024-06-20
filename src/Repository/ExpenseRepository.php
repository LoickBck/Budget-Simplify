<?php

namespace App\Repository;

use App\Entity\Expense;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ExpenseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Expense::class);
    }

    /**
     * @return Expense[] Returns an array of Expense objects for a specific user
     */
    public function findByUser($user)
    {
        return $this->createQueryBuilder('e')
            ->innerJoin('e.budget', 'b')
            ->where('b.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return float Returns the total amount of expenses for a specific budget
     */
    public function getTotalExpensesByBudget($budget)
    {
        return $this->createQueryBuilder('e')
            ->select('SUM(e.amount)')
            ->where('e.budget = :budget')
            ->setParameter('budget', $budget)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
