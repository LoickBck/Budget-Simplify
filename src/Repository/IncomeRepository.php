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
}
