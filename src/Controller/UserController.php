<?php

use UserController;
use App\Entity\User;
use App\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    /**
     * @Route("/register", name="user_register")
     */
    public function register(Request $request)
    {
        // Logic for registration
    }

    /**
     * @Route("/login", name="user_login")
     */
    public function login(Request $request)
    {
        // Logic for login
    }

    /**
     * @Route("/profile", name="user_profile")
     */
    public function profile()
    {
        // Logic for viewing and updating profile
    }
}
