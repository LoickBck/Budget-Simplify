<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\BlogPost;
use App\Repository\CommentRepository;
use App\Repository\BlogPostRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CommentController extends AbstractController
{
    private $commentRepository;
    private $blogPostRepository;
    private $entityManager;
    private $serializer;

    public function __construct(
        CommentRepository $commentRepository, 
        BlogPostRepository $blogPostRepository, 
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer
    ) {
        $this->commentRepository = $commentRepository;
        $this->blogPostRepository = $blogPostRepository;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/api/blog-posts/{id}/comments', name: 'get_comments', methods: ['GET'])]
    public function getComments(int $id): JsonResponse
    {
        $blogPost = $this->blogPostRepository->find($id);

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Article non trouvé'], 404);
        }

        $comments = $blogPost->getComments();
        $data = $this->serializer->serialize($comments, 'json', ['groups' => 'blog_post']);

        return new JsonResponse($data, 200, [], true);
    }

    #[Route('/api/blog-posts/{id}/comments', name: 'add_comment', methods: ['POST'])]
    public function addComment(int $id, Request $request): JsonResponse
    {
        $blogPost = $this->blogPostRepository->find($id);

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Article non trouvé'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $comment = new Comment();
        $comment->setAuthor($data['author']);
        $comment->setContent($data['content']);
        $comment->setDate(new \DateTime());
        $comment->setBlogPost($blogPost);

        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Commentaire ajouté'], 201);
    }
}
