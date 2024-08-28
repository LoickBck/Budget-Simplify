<?php

namespace App\Controller;

use App\Entity\BlogPost;
use App\Entity\Comment;
use App\Entity\User;
use App\Repository\BlogPostRepository;
use App\Repository\CommentRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AdminController extends AbstractController
{
    private $entityManager;
    private $userRepository;
    private $blogPostRepository;
    private $commentRepository;
    private $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        BlogPostRepository $blogPostRepository,
        CommentRepository $commentRepository,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->blogPostRepository = $blogPostRepository;
        $this->commentRepository = $commentRepository;
        $this->passwordHasher = $passwordHasher;
    }

    // Route pour récupérer les statistiques de l'administration
    #[Route('/api/admin/stats', name: 'admin_stats', methods: ['GET'])]
    public function getStats(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $totalUsers = $this->userRepository->count([]);
        $totalBlogs = $this->blogPostRepository->count([]);
        $totalComments = $this->commentRepository->count([]);

        return new JsonResponse([
            'totalUsers' => $totalUsers,
            'totalBlogs' => $totalBlogs,
            'totalComments' => $totalComments,
        ]);
    }

    // Tableau de bord de l'administration
    #[Route('/api/admin/dashboard', name: 'admin_dashboard')]
    public function dashboard(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        return $this->redirectToRoute('admin_stats');
    }

    // Gestion des utilisateurs

    #[Route('/api/admin/users', name: 'admin_manage_users', methods: ['GET'])]
    public function manageUsers(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $users = $this->userRepository->findAll();

        $userData = array_map(function(User $user) {
            return [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'introduction' => $user->getIntroduction(),
                'description' => $user->getDescription(),
            ];
        }, $users);

        return new JsonResponse($userData);
    }

    #[Route('/api/admin/users', name: 'admin_user_create', methods: ['POST'])]
    public function createUser(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = $request->toArray();

        $user = new User();
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($data['email']);
        $user->setPassword(
            $this->passwordHasher->hashPassword($user, $data['password'])
        );
        $user->setIntroduction($data['introduction']);
        $user->setDescription($data['description']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'User created'], Response::HTTP_CREATED);
    }

    #[Route('/api/admin/users/{id}', name: 'admin_user_edit', methods: ['PUT'])]
    public function editUser(int $id, Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $user = $this->userRepository->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $request->toArray();

        $user->setFirstName($data['firstName'] ?? $user->getFirstName());
        $user->setLastName($data['lastName'] ?? $user->getLastName());
        $user->setEmail($data['email'] ?? $user->getEmail());
        $user->setIntroduction($data['introduction'] ?? $user->getIntroduction());
        $user->setDescription($data['description'] ?? $user->getDescription());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'User updated']);
    }

    #[Route('/api/admin/users/{id}', name: 'admin_user_delete', methods: ['DELETE'])]
    public function deleteUser(int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $user = $this->userRepository->find($id);

        if ($user) {
            $this->entityManager->remove($user);
            $this->entityManager->flush();
        }

        return new JsonResponse(['status' => 'User deleted']);
    }

    // Gestion des blogs

    #[Route('/api/admin/blogs', name: 'admin_manage_blogs', methods: ['GET'])]
    public function manageBlogs(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $blogPosts = $this->blogPostRepository->findAll();

        $blogData = array_map(function(BlogPost $blogPost) {
            return [
                'id' => $blogPost->getId(),
                'title' => $blogPost->getTitle(),
                'content' => $blogPost->getContent(),
                'authorName' => $blogPost->getAuthorFullName(),
                'image' => $blogPost->getImage(),
                'date' => $blogPost->getDate()->format('Y-m-d'),
                'category' => $blogPost->getCategory(),
                'excerpt' => $blogPost->getExcerpt(),
            ];
        }, $blogPosts);

        return new JsonResponse($blogData);
    }

    #[Route('/api/admin/blogs/{id}', name: 'admin_blog_edit', methods: ['PUT'])]
    public function editBlogPost(int $id, Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $blogPost = $this->blogPostRepository->find($id);

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Blog post not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $request->toArray();

        $blogPost->setTitle($data['title'] ?? $blogPost->getTitle());
        $blogPost->setContent($data['content'] ?? $blogPost->getContent());
        $blogPost->setImage($data['image'] ?? $blogPost->getImage());
        $blogPost->setDate(new \DateTime($data['date'] ?? $blogPost->getDate()->format('Y-m-d')));
        $blogPost->setCategory($data['category'] ?? $blogPost->getCategory());
        $blogPost->setExcerpt($data['excerpt'] ?? $blogPost->getExcerpt());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Blog post updated']);
    }

    #[Route('/api/admin/blogs/{id}', name: 'admin_blog_delete', methods: ['DELETE'])]
    public function deleteBlogPost(int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $blogPost = $this->blogPostRepository->find($id);

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Blog not found'], 404);
        }
    
        $this->entityManager->remove($blogPost);
        $this->entityManager->flush(); 

        return new JsonResponse(['success' => 'Blog deleted'], 200);
    }

    // Gestion des commentaires

    #[Route('/api/admin/comments', name: 'admin_manage_comments', methods: ['GET'])]
    public function manageComments(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $comments = $this->commentRepository->findAll();

        $commentData = array_map(function(Comment $comment) {
            return [
                'id' => $comment->getId(),
                'content' => $comment->getContent(),
                'authorName' => $comment->getAuthorFullName(), // Assurez-vous que cette méthode existe dans l'entité Comment
                'blogPostId' => $comment->getBlogPost()->getId(), // Assurez-vous que cette relation existe dans l'entité Comment
            ];
        }, $comments);

        return new JsonResponse($commentData);
    }

    #[Route('/api/admin/comments/{id}', name: 'admin_comment_edit', methods: ['PUT'])]
    public function editComment(int $id, Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $comment = $this->commentRepository->find($id);

        if (!$comment) {
            return new JsonResponse(['error' => 'Comment not found'], Response::HTTP_NOT_FOUND);
        }

        $data = $request->toArray();

        $comment->setContent($data['content'] ?? $comment->getContent());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Comment updated']);
    }

    #[Route('/api/admin/comments/{id}', name: 'admin_comment_delete', methods: ['DELETE'])]
    public function deleteComment(int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $comment = $this->commentRepository->find($id);

        if ($comment) {
            $this->entityManager->remove($comment);
            $this->entityManager->flush();
        }

        return new JsonResponse(['status' => 'Comment deleted']);
    }

    // Connexion et déconnexion de l'administration

    #[Route('/api/admin/login', name: 'admin_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        // Récupère les erreurs de connexion s'il y en a
        $error = $authenticationUtils->getLastAuthenticationError();
        // Récupère le dernier nom d'utilisateur entré par l'utilisateur
        $lastUsername = $authenticationUtils->getLastUsername();

        return new JsonResponse([
            'last_username' => $lastUsername,
            'error' => $error ? $error->getMessage() : null,
        ]);
    }

    #[Route('/api/admin/logout', name: 'admin_logout', methods: ['POST'])]
    public function logout(): void
    {
        // Symfony gère le processus de déconnexion automatiquement, donc ce code ne sera jamais exécuté.
        throw new \Exception('This should never be reached!');
    }
}
