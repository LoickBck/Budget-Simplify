<?php

namespace App\Controller;

use App\Entity\BlogPost;
use App\Repository\BlogPostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/blog')]
class BlogController extends AbstractController
{
    private $entityManager;
    private $blogPostRepository;

    public function __construct(EntityManagerInterface $entityManager, BlogPostRepository $blogPostRepository)
    {
        $this->entityManager = $entityManager;
        $this->blogPostRepository = $blogPostRepository;
    }

    #[Route('/', name: 'blog_index', methods: ['GET'])]
    public function index(): Response
    {
        $blogPosts = $this->blogPostRepository->findAll();
        $data = [];

        foreach ($blogPosts as $post) {
            $data[] = [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'content' => $post->getContent(),
                'source' => $post->getSource(),
                'author' => [
                    'email' => $post->getAuthor()->getEmail(),
                ],
                'createdAt' => $post->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }
        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/new', name: 'blog_new', methods: ['POST'])]
    public function new(Request $request): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $blogPost = new BlogPost();
        $blogPost->setTitle($data['title']);
        $blogPost->setContent($data['content']);
        $blogPost->setSource($data['source'] ?? '');
        $blogPost->setAuthor($user);
        $blogPost->setCreatedAt(new \DateTime());

        $this->entityManager->persist($blogPost);
        $this->entityManager->flush();

        return $this->json([
            'id' => $blogPost->getId(),
            'title' => $blogPost->getTitle(),
            'content' => $blogPost->getContent(),
            'source' => $blogPost->getSource(),
            'author' => [
                'email' => $user->getEmail(),
            ],
            'createdAt' => $blogPost->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'blog_show', methods: ['GET'])]
    public function show(int $id): Response
    {
        $blogPost = $this->blogPostRepository->find($id);

        if (!$blogPost) {
            throw $this->createNotFoundException('The blog post does not exist');
        }

        return $this->json([
            'id' => $blogPost->getId(),
            'title' => $blogPost->getTitle(),
            'content' => $blogPost->getContent(),
            'source' => $blogPost->getSource(),
            'author' => [
                'email' => $blogPost->getAuthor()->getEmail(),
            ],
            'createdAt' => $blogPost->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'blog_edit', methods: ['PUT'])]
    public function edit(Request $request, BlogPost $blogPost): Response
    {
        $user = $this->getUser();
        if ($blogPost->getAuthor() !== $user) {
            return $this->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);

        $blogPost->setTitle($data['title']);
        $blogPost->setContent($data['content']);
        $blogPost->setSource($data['source'] ?? '');

        $this->entityManager->flush();

        return $this->json([
            'id' => $blogPost->getId(),
            'title' => $blogPost->getTitle(),
            'content' => $blogPost->getContent(),
            'source' => $blogPost->getSource(),
            'author' => [
                'email' => $user->getEmail(),
            ],
            'createdAt' => $blogPost->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'blog_delete', methods: ['DELETE'])]
    public function delete(BlogPost $blogPost): Response
    {
        $user = $this->getUser();
        if ($blogPost->getAuthor() !== $user) {
            return $this->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $this->entityManager->remove($blogPost);
        $this->entityManager->flush();

        return $this->json(['message' => 'Blog post deleted'], Response::HTTP_OK);
    }
}
