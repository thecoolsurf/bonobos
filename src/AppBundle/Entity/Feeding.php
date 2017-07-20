<?php
// src/AppBundle/Entity/Feeding.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Feeding
 * @ORM\Table(name="feeding",uniqueConstraints={@ORM\UniqueConstraint(name="unique_member_foods", columns={"memb_id", "food_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FeedingRepository")
 */
class Feeding
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Many Feeding() have One Member()
     * @ORM\ManyToOne(targetEntity="Member", cascade={"persist"})
     * @ORM\JoinColumn(name="memb_id", referencedColumnName="id")
     */
    private $id_memb;

    /**
     * Many Feeding() have One Foods()
     * @ORM\ManyToOne(targetEntity="Foods", cascade={"persist"})
     * @ORM\JoinColumn(name="food_id", referencedColumnName="id")
     */
    private $id_food;
    
    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set idMemb
     * @param \AppBundle\Entity\Member $idMemb
     * @return Feeding
     */
    public function setIdMemb(\AppBundle\Entity\Member $idMemb = null)
    {
        $this->id_memb = $idMemb;
        return $this;
    }

    /**
     * Get idMemb
     * @return \AppBundle\Entity\Member
     */
    public function getIdMemb()
    {
        return $this->id_memb;
    }

    /**
     * Set idFood
     * @param \AppBundle\Entity\Foods $idFood
     * @return Feeding
     */
    public function setIdFood(\AppBundle\Entity\Foods $idFood = null)
    {
        $this->id_food = $idFood;
        return $this;
    }

    /**
     * Get idFood
     * @return \AppBundle\Entity\Foods
     */
    public function getIdFood()
    {
        return $this->id_food;
    }
    
}
