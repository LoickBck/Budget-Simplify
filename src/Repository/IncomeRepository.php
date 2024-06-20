<?php

namespace App\Repository;

use App\Entity\Income;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class IncomeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Income::class);
    }

    /**
     * @return Income[] Returns an array of Income objects for a specific user
     */
    public function findByUser($user)
    {
        return $this->createQueryBuilder('i')
            ->innerJoin('i.budget', 'b')
            ->where('b.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return float Returns the total amount of incomes for a specific budget
     */
    public function getTotalIncomesByBudget($budget)
    {
        return $this->createQueryBuilder('i')
            ->select('SUM(i.amount)')
            ->where('i.budget = :budget')
            ->setParameter('budget', $budget)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
