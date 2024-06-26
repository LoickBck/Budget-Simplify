<?php

namespace App\Repository;

use App\Entity\Income;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;

/**
 * @method Income|null find($id, $lockMode = null, $lockVersion = null)
 * @method Income|null findOneBy(array $criteria, array $orderBy = null)
 * @method Income[]    findAll()
 * @method Income[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IncomeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Income::class);
    }

    /**
     * @param User $user
     * @param \DateTime $startDate
     * @param \DateTime $endDate
     * @return Income[]
     */
    public function findByUserAndDateRange($user, \DateTime $start, \DateTime $end)
    {
        return $this->createQueryBuilder('i')
            ->where('i.user = :user')
            ->andWhere('i.date BETWEEN :start AND :end')
            ->setParameter('user', $user)
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->getQuery()
            ->getResult();
    }

    public function findRegularAndNonRegularByUserAndDateRange($user, $startDate, $endDate)
    {
        $qb = $this->createQueryBuilder('i')
            ->where('i.user = :user')
            ->andWhere('i.date BETWEEN :startDate AND :endDate')
            ->setParameter('user', $user)
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate);

        $incomes = $qb->getQuery()->getResult();

        // Ajouter les revenus récurrents pour chaque mois de la période
        $regularIncomes = $this->findBy(['user' => $user, 'isRegular' => true]);
        foreach ($regularIncomes as $income) {
            $currentDate = clone $startDate;
            while ($currentDate <= $endDate) {
                $incomeCopy = clone $income;
                $incomeCopy->setDate(clone $currentDate);
                $incomes[] = $incomeCopy;
                $currentDate->modify('first day of next month');
            }
        }

        return $incomes;
    }
}
