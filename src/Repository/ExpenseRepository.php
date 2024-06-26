<?php

namespace App\Repository;

use App\Entity\Expense;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;

/**
 * @method Expense|null find($id, $lockMode = null, $lockVersion = null)
 * @method Expense|null findOneBy(array $criteria, array $orderBy = null)
 * @method Expense[]    findAll()
 * @method Expense[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Expense::class);
    }

    /**
     * @param User $user
     * @param \DateTime $startDate
     * @param \DateTime $endDate
     * @return Expense[]
     */
    public function findByUserAndDateRange($user, \DateTime $start, \DateTime $end)
    {
        return $this->createQueryBuilder('e')
            ->where('e.user = :user')
            ->andWhere('e.date BETWEEN :start AND :end')
            ->setParameter('user', $user)
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->getQuery()
            ->getResult();
    }

    public function findRegularAndNonRegularByUserAndDateRange($user, $startDate, $endDate)
    {
        $qb = $this->createQueryBuilder('e')
            ->where('e.user = :user')
            ->andWhere('e.date BETWEEN :startDate AND :endDate')
            ->setParameter('user', $user)
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate);

        $expenses = $qb->getQuery()->getResult();

        // Ajouter les dépenses récurrentes pour chaque mois de la période
        $regularExpenses = $this->findBy(['user' => $user, 'isRegular' => true]);
        foreach ($regularExpenses as $expense) {
            $currentDate = clone $startDate;
            while ($currentDate <= $endDate) {
                $expenseCopy = clone $expense;
                $expenseCopy->setDate(clone $currentDate);
                $expenses[] = $expenseCopy;
                $currentDate->modify('first day of next month');
            }
        }

        return $expenses;
    }
}
