<?php
// src/AppBundle/Form/MemberType.php

namespace AppBundle\Form;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Validator\Constraints\NotBlank;
use AppBundle\Entity\Member;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class MemberType extends AbstractType
{
    
    private $memb;
    
    public function __construct(){
        $this->memb = new Member();
    }

    /**
     * 
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('genre',ChoiceType::class, [
                'choices'=>$this->memb::arrayGenre[1],
            ])
            ->add('lastname',TextType::class, [
                'constraints'=>[new NotBlank(['message'=>'Complete this field: LASTNAME'])]
            ])
            ->add('born',BirthdayType::class, [
                'widget'=>'choice',
                'format'=>'dd-MM-yyyy',
                'years'=>range(date('Y')-80,date('Y')-18),
                'placeholder'=>['day'=>'DD','month'=>'MM','year'=>'AAAA']
            ])
            ->add('race',EntityType::class, [
                'class'=>'AppBundle:Races',
                'query_builder'=>function(\Doctrine\ORM\EntityRepository $er){
                     return $er->createQueryBuilder('r')->orderBy('r.name','ASC');
                },
                'choice_label'=>'name',
            ])
            ->add('family',EntityType::class, [
                'class'=>'AppBundle:Families',
                'query_builder'=>function(\Doctrine\ORM\EntityRepository $er){
                     return $er->createQueryBuilder('f')->orderBy('f.name','ASC');
                },
                'choice_label'=>'name',
            ])
            ->add('foods',EntityType::class, [
                'class'=>'AppBundle:Foods',
                'query_builder'=>function(\Doctrine\ORM\EntityRepository $er){
                     return $er->createQueryBuilder('f')->orderBy('f.name','ASC');
                },
                'multiple'=>true,
                'expanded'=>true,
                'choice_label'=>'name',
            ])
            ->add('create_at',HiddenType::class,[
                'data'=>\date('Y-m-d',\time()),
            ])
            ->add('expire_at',HiddenType::class,[
                'data'=>\date('Y-m-d',\time()),
            ])
        ;
    }

    public function getParent()
    {
        return 'FOS\UserBundle\Form\Type\RegistrationFormType';
    }

    public function getName()
    {
        return 'app_user_registration';
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class'=>'AppBundle\Entity\Member',
        ]);
    }
    
}