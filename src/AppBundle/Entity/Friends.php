<?php
// src/AppBundle/Entity/Friends.php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Friends
 * @ORM\Table(name="friends",uniqueConstraints={@ORM\UniqueConstraint(name="unique_memb__friend", columns={"memb_id", "friend_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FriendsRepository")
 */
class Friends
{
    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Many Friends() have One Member()
     * @ORM\ManyToOne(targetEntity="Member", cascade={"persist"})
     * @ORM\JoinColumn(name="memb_id", referencedColumnName="id")
     */
    private $id_memb;

    /**
     * Many Friends() have One Member()
     * @ORM\ManyToOne(targetEntity="Member", cascade={"persist"})
     * @ORM\JoinColumn(name="friend_id", referencedColumnName="id")
     */
    private $id_friend;

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
     * @return Friends
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
     * Set idFriend
     * @param \AppBundle\Entity\Member $idFriend
     * @return Friends
     */
    public function setIdFriend(\AppBundle\Entity\Member $idFriend = null)
    {
        $this->id_friend = $idFriend;
        return $this;
    }

    /**
     * Get idFriend
     * @return \AppBundle\Entity\Member
     */
    public function getIdFriend()
    {
        return $this->id_friend;
    }
    
}
