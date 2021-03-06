<?php
// src/AppBundle/Entity/Foods.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Foods
 * @ORM\Table(name="foods")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FoodsRepository")
 */
class Foods
{
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->members = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /* ********************************************************************** */

    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=50, unique=true)
     */
    private $name;

    /**
     * Many Food() have Many Membres()
     * @ORM\ManyToMany(targetEntity="Member")
     */
    private $members;

    /* ********************************************************************** */
    
    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     * @param string $name
     * @return Foods
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * Add member
     * @param \AppBundle\Entity\Member $member
     * @return Foods
     */
    public function addMember(\AppBundle\Entity\Member $member)
    {
        $this->members[] = $member;
        return $this;
    }

    /**
     * Remove member
     * @param \AppBundle\Entity\Member $member
     */
    public function removeMember(\AppBundle\Entity\Member $member)
    {
        $this->members->removeElement($member);
    }

    /**
     * Get members
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getMembers()
    {
        return $this->members;
    }
    
}
