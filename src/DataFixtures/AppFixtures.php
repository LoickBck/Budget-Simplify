<?php
namespace App\DataFixtures;

use App\Entity\Ad;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Image;
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


        // gestion des utilisateurs 
        $users = []; // init d'un tableau pour récup des user pour les annonces
        $genres = ['homme','femme'];

        for($u=1 ; $u <= 10; $u++)
        {
            $user = new User();
            $genre = $faker->randomElement($genres);
            $picture = 'https://picsum.photos/seed/picsum/500/500';

            $hash = $this->passwordHasher->hashPassword($user, 'password');

            $user->setFirstName($faker->firstName($genre))
                ->setLastName($faker->lastName())
                ->setEmail($faker->email())
                ->setIntroduction($faker->sentence())
                ->setDescription('<p>'.join('</p><p>',$faker->paragraphs(3)).'</p>')
                ->setPassword($hash)
                ->setPicture($picture);

            $manager->persist($user);    

            $users[] = $user; // ajouter un user au tableau (pour les annonces)

        }

        $manager->flush();
    }
}