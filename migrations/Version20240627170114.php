<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240627170114 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA77FBEAF');
        $this->addSql('DROP INDEX IDX_9474526CA77FBEAF ON comment');
        $this->addSql('ALTER TABLE comment CHANGE blog_post_id post_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C4B89032C FOREIGN KEY (post_id) REFERENCES blog_post (id)');
        $this->addSql('CREATE INDEX IDX_9474526C4B89032C ON comment (post_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C4B89032C');
        $this->addSql('DROP INDEX IDX_9474526C4B89032C ON comment');
        $this->addSql('ALTER TABLE comment CHANGE post_id blog_post_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA77FBEAF FOREIGN KEY (blog_post_id) REFERENCES blog_post (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_9474526CA77FBEAF ON comment (blog_post_id)');
    }
}
