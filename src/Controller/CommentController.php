<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\BlogPost;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class CommentController extends AbstractController
{
    private $entityManager;
    private $security;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    #[Route('/comments', name: 'comment_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $blogPost = $this->entityManager->getRepository(BlogPost::class)->find($data['postId']);
        if (!$blogPost) {
            return $this->json(['message' => 'Blog post not found'], Response::HTTP_NOT_FOUND);
        }

        $comment = new Comment();
        $comment->setContent($data['content']);
        $comment->setAuthor($user);
        $comment->setBlogPost($blogPost);
        $comment->setCreatedAt(new \DateTime());

        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        return $this->json([
            'id' => $comment->getId(),
            'content' => $comment->getContent(),
            'author' => [
                'email' => $user->getEmail(),
            ],
            'createdAt' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('/comments/{postId<\d+>}', name: 'comment_index', methods: ['GET'])]
    public function index(int $postId): Response
    {
        $blogPost = $this->entityManager->getRepository(BlogPost::class)->find($postId);
        if (!$blogPost) {
            return $this->json(['message' => 'Blog post not found'], Response::HTTP_NOT_FOUND);
        }

        $comments = $blogPost->getComments();

        $data = [];
        foreach ($comments as $comment) {
            $data[] = [
                'id' => $comment->getId(),
                'content' => $comment->getContent(),
                'author' => [
                    'email' => $comment->getAuthor()->getEmail(),
                ],
                'createdAt' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data, Response::HTTP_OK);
    }

    #[Route('/comments/{id}', name: 'comment_delete', methods: ['DELETE'])]
    public function delete(Comment $comment): Response
    {
        $user = $this->getUser();
        if ($comment->getAuthor() !== $user && $comment->getBlogPost()->getAuthor() !== $user) {
            return $this->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $this->entityManager->remove($comment);
        $this->entityManager->flush();

        return $this->json(['message' => 'Comment deleted'], Response::HTTP_OK);
    }
}
