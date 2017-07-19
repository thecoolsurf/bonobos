<?php
// src/AppBundle/Repository/RacesRepository.php

namespace AppBundle\Repository;

class RacesRepository extends \Doctrine\ORM\EntityRepository
{
    
    public function getAllRaces()
    {
        $rows = $this->createQueryBuilder('r')
            ->select('r.id,r.name')
            ->getQuery()
            ->getResult();
        return $rows;
    }
    
}
