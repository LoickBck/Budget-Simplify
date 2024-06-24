<?php

namespace App\Command;

use App\Entity\Expense;
use App\Entity\Income;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CheckRegularTransactionsCommand extends Command
{
    protected static $defaultName = 'app:check-regular-transactions';
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this
            ->setDescription('Vérifie les transactions régulières (dépenses et revenus) et recrée celles dont un mois est écoulé.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $now = new \DateTime();

        $this->checkRegularExpenses($now, $io);
        $this->checkRegularIncomes($now, $io);

        $this->entityManager->flush();

        $io->success('Transactions régulières vérifiées et recréées si nécessaire.');
        return Command::SUCCESS;
    }

    private function checkRegularExpenses(\DateTime $now, SymfonyStyle $io)
    {
        $expenses = $this->entityManager->getRepository(Expense::class)->findBy(['isRegular' => true]);

        foreach ($expenses as $expense) {
            $createdAt = $expense->getDate();
            $interval = $now->diff($createdAt);

            if ($interval->m >= 1 || $interval->y >= 1) {
                $newExpense = clone $expense;
                $newExpense->setDate($now);
                $this->entityManager->persist($newExpense);
                $io->info(sprintf('Dépense régulière recréée (ID: %d)', $expense->getId()));
            }
        }
    }

    private function checkRegularIncomes(\DateTime $now, SymfonyStyle $io)
    {
        $incomes = $this->entityManager->getRepository(Income::class)->findBy(['isRegular' => true]);

        foreach ($incomes as $income) {
            $createdAt = $income->getDate();
            $interval = $now->diff($createdAt);

            if ($interval->m >= 1 || $interval->y >= 1) {
                $newIncome = clone $income;
                $newIncome->setDate($now);
                $this->entityManager->persist($newIncome);
                $io->info(sprintf('Revenu régulier recréé (ID: %d)', $income->getId()));
            }
        }
    }
}
