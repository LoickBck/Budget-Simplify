<?php

namespace App\DataFixtures;

use App\Entity\Ad;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Image;
use App\Entity\Category;
use Cocur\Slugify\Slugify;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
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
            ->setIntroduction('Lorem ipsum dolor sit amet') // lorem5
            ->setDescription('<p>' . join('</p><p>', ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam', 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', 'Excepteur sint occaecat cupidatat non proident', 'Sunt in culpa qui officia deserunt mollit anim id est laborum', 'Curabitur pretium tincidunt lacus']) . '</p>') // lorem10
            ->setPassword($defaultHash)
            ->setPicture('https://picsum.photos/seed/picsum/500/500');

        $manager->persist($defaultUser);

        // Gestion des utilisateurs aléatoires
        $users = [$defaultUser]; // Init d'un tableau pour récup des user pour les annonces
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
                ->setPassword($hash)
                ->setPicture($picture);

            $manager->persist($user);
            $users[] = $user; // Ajouter l'utilisateur au tableau des utilisateurs
        }

        // Gestion des catégories
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
            $category->setUser($defaultUser); // Associer chaque catégorie à l'utilisateur par défaut

            $manager->persist($category);
        }

        $manager->flush();
    }
}
