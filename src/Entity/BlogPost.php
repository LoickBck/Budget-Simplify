<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Comment;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\BlogPostRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BlogPostRepository::class)]
class BlogPost
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["blog_post"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["blog_post"])]
    private $title;

    #[ORM\Column(type: 'text')]
    #[Groups(["blog_post"])]
    private $content;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["blog_post"])]
    private $author;

    #[ORM\Column(type: 'datetime')]
    #[Groups(["blog_post"])]
    private $createdAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["blog_post"])]
    private $source;

    #[ORM\OneToMany(mappedBy: 'blogPost', targetEntity: Comment::class, cascade: ['persist', 'remove'])]
    #[Groups(["blog_post"])]
    private $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;
        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource(?string $source): self
    {
        $this->source = $source;
        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setBlogPost($this);
        }
        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            if ($comment->getBlogPost() === $this) {
                $comment->setBlogPost(null);
            }
        }
        return $this;
    }
}
