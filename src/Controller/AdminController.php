<?php

namespace App\Controller;

use App\Entity\BlogPost;
use App\Entity\Comment;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class AdminController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'admin', methods: ['GET'])]
    public function dashboard(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('admin/index.html.twig');
    }
    
    
    #[Route('/users', name: 'admin_users_index', methods: ['GET'])]
        public function indexUsers(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        
        $users = $this->entityManager->getRepository(User::class)->findAll();
        return $this->render('admin/manage_users.html.twig', [
            'users' => $users,
        ]);
    }
    
        #[Route('/users/{id}', name: 'admin_user_show', methods: ['GET'])]
        public function showUser(User $user): Response
        {
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
    
            return $this->render('admin/user_show.html.twig', [
                'user' => $user,
            ]);
        }
    
        #[Route('/users/{id}/edit', name: 'admin_user_edit', methods: ['GET', 'POST'])]
public function editUser(Request $request, User $user): Response
{
    $this->denyAccessUnlessGranted('ROLE_ADMIN');

    if ($request->isMethod('POST')) {
        $data = json_decode($request->getContent(), true);

        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setIntroduction($data['introduction']);
        $user->setDescription($data['description']);
        $user->setRoles($data['roles']);

        $this->entityManager->flush();

        return $this->redirectToRoute('admin_users_index');
    }

    return $this->render('admin/user_edit.html.twig', [
        'user' => $user,
    ]);
}

    
        #[Route('/users/{id}', name: 'admin_user_delete', methods: ['DELETE'])]
        public function deleteUser(User $user): Response
        {
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
    
            $this->entityManager->remove($user);
            $this->entityManager->flush();
    
            return $this->redirectToRoute('admin_users_index');
        }
    
        #[Route('/blogs', name: 'admin_blogs_index', methods: ['GET'])]
        public function indexBlogs(): Response
        {
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
    
            $blogs = $this->entityManager->getRepository(BlogPost::class)->findAll();
            return $this->render('admin/manage_blogs.html.twig', [
                'blogs' => $blogs,
            ]);
        }
    
        #[Route('/blogs/{id}', name: 'admin_blog_delete', methods: ['DELETE'])]
        public function deleteBlog(BlogPost $blog): Response
        {
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
    
            $this->entityManager->remove($blog);
            $this->entityManager->flush();
    
            return $this->redirectToRoute('admin_blogs_index');
        }
    
        #[Route('/comments', name: 'admin_comments_index', methods: ['GET'])]
        public function indexComments(): Response
        {
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
    
            $comments = $this->entityManager->getRepository(Comment::class)->findAll();
            return $this->render('admin/manage_comments.html.twig', [
                'comments' => $comments,
            ]);
        }
    
        #[Route('/comments/{id}', name: 'admin_comment_delete', methods: ['DELETE'])]
        public function deleteComment(Comment $comment): Response
        {
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
    
            $this->entityManager->remove($comment);
            $this->entityManager->flush();
    
            return $this->redirectToRoute('admin_comments_index');
        }
    }
    