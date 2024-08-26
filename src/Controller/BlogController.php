<?php

namespace App\Controller;

use App\Entity\BlogPost;
use App\Repository\BlogPostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class BlogController extends AbstractController
{
    private $blogPostRepository;
    private $entityManager;
    private $serializer;

    public function __construct(
        BlogPostRepository $blogPostRepository, 
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer
    ) {
        $this->blogPostRepository = $blogPostRepository;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/api/blog-posts', name: 'blog_posts', methods: ['GET'])]
    public function getBlogPosts(): JsonResponse
    {
        $posts = $this->blogPostRepository->findAll();
        $data = $this->serializer->serialize($posts, 'json', ['groups' => 'blog_post']);
        
        return new JsonResponse($data, 200, [], true);
    }

    #[Route('/api/blog-posts/{id}', name: 'blog_post', methods: ['GET'])]
    public function getBlogPost(int $id): JsonResponse
    {
        $post = $this->blogPostRepository->find($id);

        if (!$post) {
            return new JsonResponse(['error' => 'Article not found'], 404);
        }

        $data = $this->serializer->serialize($post, 'json', ['groups' => 'blog_post']);

        return new JsonResponse($data, 200, [], true);
    }

    #[Route('/api/blog-posts', name: 'create_blog_post', methods: ['POST'])]
    public function createBlogPost(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $this->getUser(); // Récupère l'utilisateur actuellement connecté

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié'], 401);
        }

        $blogPost = new BlogPost();
        $blogPost->setTitle($data['title']);
        $blogPost->setContent($data['content']);
        $blogPost->setImage($data['image']);
        $blogPost->setAuthor($user); // Associe l'utilisateur connecté comme auteur
        $blogPost->setDate(new \DateTime($data['date']));
        $blogPost->setCategory($data['category']);
        $blogPost->setExcerpt($data['excerpt']);

        $this->entityManager->persist($blogPost);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Article créé'], 201);
    }

    #[Route('/api/blog-posts/{id}', name: 'update_blog_post', methods: ['PUT'])]
    public function updateBlogPost(int $id, Request $request): JsonResponse
    {
        $blogPost = $this->blogPostRepository->find($id);
        $user = $this->getUser();

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Article not found'], 404);
        }

        // Vérifie si l'utilisateur connecté est l'auteur de l'article
        if ($blogPost->getAuthor() !== $user) {
            return new JsonResponse(['error' => 'Unauthorized'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $blogPost->setTitle($data['title'] ?? $blogPost->getTitle());
        $blogPost->setContent($data['content'] ?? $blogPost->getContent());
        $blogPost->setImage($data['image'] ?? $blogPost->getImage());
        $blogPost->setDate(new \DateTime($data['date'] ?? $blogPost->getDate()->format('Y-m-d')));
        $blogPost->setCategory($data['category'] ?? $blogPost->getCategory());
        $blogPost->setExcerpt($data['excerpt'] ?? $blogPost->getExcerpt());

        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Article mis à jour'], 200);
    }

    #[Route('/api/blog-posts/{id}', name: 'delete_blog_post', methods: ['DELETE'])]
    public function deleteBlogPost(int $id): JsonResponse
    {
        $blogPost = $this->blogPostRepository->find($id);
        $user = $this->getUser();

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Article non trouvé'], 404);
        }

        // Vérifie si l'utilisateur connecté est l'auteur de l'article
        if ($blogPost->getAuthor() !== $user) {
            return new JsonResponse(['error' => 'Unauthorized'], 403);
        }

        $this->entityManager->remove($blogPost);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Article supprimé'], 200);
    }
}
