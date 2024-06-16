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

    
    #[Route("/api/check-auth", name:"check_auth", methods: ['POST'])]
    public function checkAuth(): JsonResponse
    {
        $user = $this->security->getUser();

        if ($user) {
            // L'utilisateur est authentifié
            $data = [
                'authenticated' => true,
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'email' => $user->getEmail(),
                ],
            ];
        } else {
            // L'utilisateur n'est pas authentifié
            $data = [
                'authenticated' => false,
            ];
        }

        return new JsonResponse($data);
    }
}
