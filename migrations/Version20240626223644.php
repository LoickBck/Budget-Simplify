<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240626223644 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, blog_post_id INT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_9474526CF675F31B (author_id), INDEX IDX_9474526CA77FBEAF (blog_post_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA77FBEAF FOREIGN KEY (blog_post_id) REFERENCES blog_post (id)');
        $this->addSql('ALTER TABLE blog_post DROP FOREIGN KEY FK_BA5AE01DA76ED395');
        $this->addSql('DROP INDEX IDX_BA5AE01DA76ED395 ON blog_post');
        $this->addSql('ALTER TABLE blog_post CHANGE user_id author_id INT NOT NULL, CHANGE image_path source VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE blog_post ADD CONSTRAINT FK_BA5AE01DF675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_BA5AE01DF675F31B ON blog_post (author_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CF675F31B');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA77FBEAF');
        $this->addSql('DROP TABLE comment');
        $this->addSql('ALTER TABLE blog_post DROP FOREIGN KEY FK_BA5AE01DF675F31B');
        $this->addSql('DROP INDEX IDX_BA5AE01DF675F31B ON blog_post');
        $this->addSql('ALTER TABLE blog_post CHANGE author_id user_id INT NOT NULL, CHANGE source image_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE blog_post ADD CONSTRAINT FK_BA5AE01DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_BA5AE01DA76ED395 ON blog_post (user_id)');
    }
}
