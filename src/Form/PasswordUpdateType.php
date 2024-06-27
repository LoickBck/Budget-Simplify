<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

class PasswordUpdateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('currentPassword', PasswordType::class, [
                'label' => 'Mot de passe actuel',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez entrer votre mot de passe actuel',
                    ]),
                ],
            ])
            ->add('newPassword', PasswordType::class, [
                'label' => 'Nouveau mot de passe',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez entrer un nouveau mot de passe',
                    ]),
                    new Assert\Length([
                        'min' => 6,
                        'minMessage' => 'Votre mot de passe doit comporter au moins {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('confirmPassword', PasswordType::class, [
                'label' => 'Confirmez le nouveau mot de passe',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez confirmer votre nouveau mot de passe',
                    ]),
                    new Assert\EqualTo([
                        'propertyPath' => 'newPassword',
                        'message' => 'Les mots de passe ne correspondent pas',
                    ]),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
        ]);
    }
}
