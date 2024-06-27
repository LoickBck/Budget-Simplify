<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/comments')]
class CommentController extends AbstractController
{
    private $entityManager;
    private $commentRepository;

    public function __construct(EntityManagerInterface $entityManager, CommentRepository $commentRepository)
    {
        $this->entityManager = $entityManager;
        $this->commentRepository = $commentRepository;
    }

    #[Route('/', name: 'comment_new', methods: ['POST'])]
    public function new(Request $request): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $comment = new Comment();
        $comment->setContent($data['content']);
        $comment->setBlogId($data['blog_id']);
        $comment->setUserId($user->getId());
        $comment->setCreatedAt(new \DateTime());

        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        return $this->json([
            'id' => $comment->getId(),
            'content' => $comment->getContent(),
            'blog_id' => $comment->getBlogId(),
            'user_id' => $comment->getUserId(),
            'createdAt' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'comment_show', methods: ['GET'])]
    public function show(Comment $comment): Response
    {
        return $this->json([
            'id' => $comment->getId(),
            'content' => $comment->getContent(),
            'blog_id' => $comment->getBlogId(),
            'user_id' => $comment->getUserId(),
            'createdAt' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_OK);
    }

    #[Route('/{id}/edit', name: 'comment_edit', methods: ['PUT'])]
    public function edit(Request $request, Comment $comment): Response
    {
        $user = $this->getUser();
        if ($comment->getUserId() !== $user->getId()) {
            return $this->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);

        $comment->setContent($data['content']);

        $this->entityManager->flush();

        return $this->json([
            'id' => $comment->getId(),
            'content' => $comment->getContent(),
            'blog_id' => $comment->getBlogId(),
            'user_id' => $comment->getUserId(),
            'createdAt' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'comment_delete', methods: ['DELETE'])]
    public function delete(Comment $comment): Response
    {
        $user = $this->getUser();
        if ($comment->getUserId() !== $user->getId()) {
            return $this->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $this->entityManager->remove($comment);
        $this->entityManager->flush();

        return $this->json(['message' => 'Comment deleted'], Response::HTTP_OK);
    }
}
