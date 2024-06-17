<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class AuthController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    #[Route("/api/check-auth", name:"api_check_auth", methods: ['GET'])]
    public function checkAuth(): JsonResponse
    {
        $user = $this->security->getUser();

        if ($user) {
            return new JsonResponse([
                'authenticated' => true,
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'email' => $user->getEmail(),
                ],
            ]);
        } else {
            return new JsonResponse(['authenticated' => false]);
        }
    }
}
