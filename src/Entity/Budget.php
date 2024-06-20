<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Income;
use App\Entity\Expense;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: "App\Repository\BudgetRepository")]
class Budget
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'decimal', scale: 2)]
    private $totalAmount;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private $user;

    #[ORM\OneToMany(mappedBy: 'budget', targetEntity: Expense::class)]
    private $expenses;

    #[ORM\OneToMany(mappedBy: 'budget', targetEntity: Income::class)]
    private $incomes;

    public function __construct()
    {
        $this->expenses = new ArrayCollection();
        $this->incomes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getTotalAmount(): ?string
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(string $totalAmount): self
    {
        $this->totalAmount = $totalAmount;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getExpenses(): Collection
    {
        return $this->expenses;
    }

    public function getIncomes(): Collection
    {
        return $this->incomes;
    }
}
