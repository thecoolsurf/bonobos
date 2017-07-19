<?php
// src/AppBundle/Repository/MemberRepository.php

namespace AppBundle\Repository;

class MemberRepository extends \Doctrine\ORM\EntityRepository
{

    /**
     * MEMBERS
     * @param int $id
     * @return array $rows
     */
    public function getMembersByNames($id)
    {
        $em = $this->getEntityManager();
        $rows = $em->getConnection()->executeQuery('
            SELECT
            f0.id, f0.genre, f0.username,
            DATE_FORMAT(f0.create_at,\'%d/%m/%Y\') AS create_at,
            DATE_FORMAT(f0.born,\'%d/%m/%Y\') AS born,
            r1.name AS race,
            f2.name AS family
            FROM fos_user f0 
            INNER JOIN races r1 ON f0.race_id = r1.id
            INNER JOIN families f2 ON f0.family_id = f2.id
            WHERE NOT f0.id='.$id.'
            ORDER BY f0.create_at ASC
        ');
        return $rows->fetchAll();
    }
    
    /**
     * FRIENDS
     * @param int $id
     * @return array $rows
     */
    public function getFriendsByIds($id)
    {
        $em = $this->getEntityManager();
        $rows = $em->getConnection()->executeQuery('
            SELECT
            f0.genre, f0.username,
            DATE_FORMAT(f0.create_at,\'%d/%m/%Y\') AS create_at,
            DATE_FORMAT(f0.born,\'%d/%m/%Y\') AS born,
            f3.id, f3.memb_id, f3.friend_id
            FROM fos_user f0 
            INNER JOIN friends f3 ON f0.id = f3.friend_id
            WHERE f3.memb_id='.$id.'
            AND NOT f3.friend_id='.$id.'
            ORDER BY f3.friend_id ASC
        ');
        return $rows->fetchAll();
    }
    
}
