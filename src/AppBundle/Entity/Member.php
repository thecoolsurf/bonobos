<?php
// src/AppBundle/Entity/Member.php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Member
 * @ORM\Table(name="fos_user")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MemberRepository")
 *  */
class Member extends BaseUser
{

    const arrayGenre = array(
        array(
            0=>'Choisissez',
            1=>'Male',
            2=>'Female',
        ),
        array(
            'Choisissez'=>0,
            'Male'=>1,
            'Female'=>2,
        ),
    );

    public function __construct()
    {
        parent::__construct();
        $this->foods = new ArrayCollection();
    }

    public function shortGenre()
    {
        $short = self::arrayGenre[0];
        return $short[$this->getGenre()];
    }
    
    public function showGenre($genre)
    {
        $short = self::arrayGenre[0];
        return $short[$genre];
    }

    /* ********************************************************************** */
    
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var int
     * @ORM\Column(name="genre", type="smallint", options={"unsigned":true, "default":1})
     */
    private $genre;

    /**
     * @var string
     * @ORM\Column(name="lastname", type="string", length=50)
     */
    private $lastname;

    /**
     * @var date
     * @ORM\Column(name="born", type="date")
     */
    private $born;

    /**
     * @var date
     * @ORM\Column(name="create_at", type="date")
     */
    private $create_at;

    /**
     * @var date
     * @ORM\Column(name="expire_at", type="date")
     */
    private $expire_at;

    /**
     * Many Member() have One Families()
     * @ORM\ManyToOne(targetEntity="Families", cascade={"persist"})
     * @ORM\JoinColumn(name="family_id", referencedColumnName="id")
     */
    private $family;

    /**
     * Many Member() have One Races()
     * @ORM\ManyToOne(targetEntity="Races", cascade={"persist"})
     * @ORM\JoinColumn(name="race_id", referencedColumnName="id")
     */
    private $race;
    
    /* ********************************************************************** */
    
    /**
     * Set genre
     * @param integer $genre
     * @return Member
     */
    public function setGenre($genre)
    {
        $this->genre = $genre;
        return $this;
    }

    /**
     * Get genre
     * @return integer
     */
    public function getGenre()
    {
        return $this->genre;
    }

    /**
     * Set lastname
     * @param string $lastname
     * @return Member
     */
    public function setLastname($lastname)
    {
        $this->lastname = \strtoupper($lastname);
        return $this;
    }

    /**
     * Get lastname
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set born
     * @param string $born
     * @return Member
     */
    public function setBorn($born)
    {
        $this->born = $born;
        return $this;
    }

    /**
     * Get born
     * @return string
     */
    public function getBorn()
    {
        return $this->born;
    }

    /**
     * Set createAt
     * @param string $createAt
     * @return Member
     */
    public function setCreateAt($createAt)
    {
        $this->create_at = \DateTime::createFromFormat('Y-m-d',$createAt);
        return $this;
    }

    /**
     * Get createAt
     * @return string
     */
    public function getCreateAt()
    {
        return $this->create_at;
    }

    /**
     * Set expireAt
     * @param string $expireAt
     * @return Member
     */
    public function setExpireAt($expireAt)
    {
        $this->expire_at = \DateTime::createFromFormat('Y-m-d',$expireAt);
        return $this;
    }

    /**
     * Get expireAt
     * @return string
     */
    public function getExpireAt()
    {
        return $this->expire_at;
    }

    /**
     * Set family
     * @param \AppBundle\Entity\Families $family
     * @return Member
     */
    public function setFamily(\AppBundle\Entity\Families $family = null)
    {
        $this->family = $family;
        return $this;
    }

    /**
     * Get family
     * @return \AppBundle\Entity\Families
     */
    public function getFamily()
    {
        return $this->family;
    }

    /**
     * Set race
     * @param \AppBundle\Entity\Races $race
     * @return Member
     */
    public function setRace(\AppBundle\Entity\Races $race = null)
    {
        $this->race = $race;
        return $this;
    }

    /**
     * Get race
     * @return \AppBundle\Entity\Races
     */
    public function getRace()
    {
        return $this->race;
    }

}
