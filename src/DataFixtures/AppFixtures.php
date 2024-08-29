<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Category;
use App\Entity\Expense;
use App\Entity\Income;
use Cocur\Slugify\Slugify;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $slugify = new Slugify();

        // Ajouter un utilisateur par défaut
        $defaultUser = new User();
        $defaultHash = $this->passwordHasher->hashPassword($defaultUser, 'password');

        $defaultUser->setFirstName('Loick')
            ->setLastName('Buck')
            ->setEmail('loickbuck@hotmail.com')
            ->setIntroduction('Lorem ipsum dolor sit amet')
            ->setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            ->setPassword($defaultHash);

        $manager->persist($defaultUser);

        // Ajouter un utilisateur administrateur
        $admin = new User();
        $admin->setFirstName('Admin')
            ->setLastName('User')
            ->setEmail('admin@example.com')
            ->setRoles(['ROLE_ADMIN'])
            ->setIntroduction('Admin user introduction')
            ->setDescription('Admin user description escription scription cription ription iption ption')
            ->setPassword($this->passwordHasher->hashPassword($admin, 'password'));

        $manager->persist($admin);

        // Gestion des utilisateurs aléatoires
        $users = [$defaultUser];
        $genres = ['homme', 'femme'];

        for ($u = 1; $u <= 10; $u++) {
            $user = new User();
            $genre = $faker->randomElement($genres);
            $picture = 'https://picsum.photos/seed/picsum/500/500';

            $hash = $this->passwordHasher->hashPassword($user, 'password');

            $user->setFirstName($faker->firstName($genre))
                ->setLastName($faker->lastName())
                ->setEmail($faker->email())
                ->setIntroduction($faker->sentence())
                ->setDescription('<p>' . join('</p><p>', $faker->paragraphs(3)) . '</p>')
                ->setPassword($hash);

            $manager->persist($user);
            $users[] = $user;
        }

        // Gestion des catégories
        $categoryEntities = [];
        $categories = [
            ['name' => 'Assurance', 'description' => 'Dépenses pour les assurances'],
            ['name' => 'Alimentation', 'description' => 'Dépenses pour la nourriture'],
            ['name' => 'Santé', 'description' => 'Dépenses pour les soins de santé'],
            ['name' => 'Salaire', 'description' => 'Revenus provenant du salaire'],
            ['name' => 'Loyer', 'description' => 'Dépenses pour le loyer'],
            ['name' => 'Vêtements et accessoires', 'description' => 'Dépenses pour les vêtements et accessoires'],
            ['name' => 'Éducation', 'description' => 'Dépenses pour l\'éducation'],
            ['name' => 'Mobilité', 'description' => 'Dépenses pour les transports'],
            ['name' => 'Autres', 'description' => 'Dépenses diverses'],
            ['name' => 'Divertissement', 'description' => 'Dépenses pour les loisirs'],
            ['name' => 'Épargne', 'description' => 'Revenus pour l\'épargne'],
            ['name' => 'Investissements', 'description' => 'Revenus provenant des investissements'],
            ['name' => 'Impôts', 'description' => 'Dépenses pour les impôts'],
            ['name' => 'Cadeaux', 'description' => 'Dépenses pour les cadeaux'],
            ['name' => 'Voyages', 'description' => 'Dépenses pour les voyages']
        ];

        foreach ($categories as $catData) {
            $category = new Category();
            $category->setName($catData['name']);
            $category->setDescription($catData['description']);
            $category->setUser($defaultUser);

            $manager->persist($category);
            $categoryEntities[] = $category;
        }

        $manager->flush();

        // Ajouter des dépenses
        for ($i = 0; $i < 90; $i++) {
            $expense = new Expense();
            $expense->setName($faker->word())
                ->setAmount($faker->randomFloat(2, 10, 1000))
                ->setCategory($faker->randomElement($categoryEntities))
                ->setUser($defaultUser)
                ->setIsRegular($faker->boolean())
                ->setDate($faker->dateTimeBetween('-2 years', 'now'));

            $manager->persist($expense);
        }

        // Ajouter des revenus
        for ($i = 0; $i < 30; $i++) {
            $income = new Income();
            $income->setName($faker->word())
                ->setAmount($faker->randomFloat(2, 1000, 5000))
                ->setCategory($faker->randomElement($categoryEntities))
                ->setUser($defaultUser)
                ->setIsRegular($faker->boolean())
                ->setDate($faker->dateTimeBetween('-2 years', 'now'));

            $manager->persist($income);
        }

        $manager->flush();
    }
}
