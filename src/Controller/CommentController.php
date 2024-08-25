<?php

namespace App\Controller;

use App\Entity\BlogPost;
use App\Entity\Comment;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class CommentController extends AbstractController
{
    private $commentRepository;
    private $entityManager;
    private $security;

    public function __construct(CommentRepository $commentRepository, EntityManagerInterface $entityManager, Security $security)
    {
        $this->commentRepository = $commentRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    #[Route('/api/blog-posts/{id}/comments', name: 'get_comments', methods: ['GET'])]
    public function getComments(int $id): JsonResponse
    {
        // Find the BlogPost by ID
        $blogPost = $this->entityManager->getRepository(BlogPost::class)->find($id);

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Blog post not found'], 404);
        }

        // Get the comments related to the BlogPost
        $comments = $blogPost->getComments();

        return $this->json($comments, 200, [], ['groups' => 'comment']);
    }

    #[Route('/api/blog-posts/{id}/comments', name: 'add_comment', methods: ['POST'])]
    public function addComment(int $id, Request $request): JsonResponse
    {
        // Find the BlogPost by ID
        $blogPost = $this->entityManager->getRepository(BlogPost::class)->find($id);

        if (!$blogPost) {
            return new JsonResponse(['error' => 'Blog post not found'], 404);
        }

        // Create a new Comment
        $comment = new Comment();
        $data = json_decode($request->getContent(), true);
        $comment->setContent($data['content']);
        $comment->setBlogPost($blogPost);
        $comment->setAuthor($this->getUser());
        $comment->setCreatedAt(new \DateTime());

        // Save the comment
        $this->entityManager->persist($comment);
        $this->entityManager->flush();

       return $this->json($comment, 201, [], ['groups' => 'comment']);
    }

    #[Route('/api/comments/{id}', name: 'update_comment', methods: ['PUT'])]
    public function updateComment(int $id, Request $request): JsonResponse
    {
        $comment = $this->commentRepository->find($id);

        if (!$comment) {
            return new JsonResponse(['error' => 'Comment not found'], 404);
        }

        $user = $this->getUser();

        if ($comment->getAuthor() !== $user) {
            return new JsonResponse(['error' => 'Unauthorized'], 403);
        }

        $data = json_decode($request->getContent(), true);
        $comment->setContent($data['content']);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Comment updated'], 200);
    }

    #[Route('/api/comments/{id}', name: 'delete_comment', methods: ['DELETE'])]
    public function deleteComment(int $id): JsonResponse
    {
        $comment = $this->commentRepository->find($id);

        if (!$comment) {
            return new JsonResponse(['error' => 'Comment not found'], 404);
        }

        $user = $this->getUser();

        if ($comment->getAuthor() !== $user) {
            return new JsonResponse(['error' => 'Unauthorized'], 403);
        }

        $this->entityManager->remove($comment);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Comment deleted'], 200);
    }
}
