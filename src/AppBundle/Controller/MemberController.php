<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AppBundle\Entity\Friends;

class MemberController extends Controller
{

    /**
     * @Method({"GET"})
     * @Route("/members", name="members")
     */
    public function membersAction(Request $request)
    {
        $id   = $this->getUser()->getId();
        $uri  = $request->get('_route');
        $em   = $this->getDoctrine()->getRepository('AppBundle:Member');
        $rows = $em->getMembersByNames($id);
        return $this->render('publics/members.html.twig', [
            'url'=>$uri,
            'rows'=>$rows,
        ]);
    }
    
    /**
     * @Method({"GET"})
     * @Route("/friends", name="friends")
     */
    public function friendsAction(Request $request)
    {
        $id   = $this->getUser()->getId();
        $uri  = $request->get('_route');
        $em   = $this->getDoctrine()->getRepository('AppBundle:Member');
        $rows = $em->getFriendsByIds($id);
        return $this->render('publics/friends.html.twig', [
            'url'=>$uri,
            'rows'=>$rows,
        ]);
    }
    
    /* ********************************************************************** */
    
    /**
     * @Method({"POST"})
     * @Route("/ajax/friend-insert", name="friend-insert")
     */
    public function friendsInsertAction(Request $request)
    {
        $orm = $this->getDoctrine();
        // member
        $memb_id = $this->getUser()->getId();
        $member = $orm->getRepository('AppBundle:Member')->findOneBy(['id'=>$memb_id]);
        // friend
        $friend_id = $request->get('id');
        $friend = $orm->getRepository('AppBundle:Member')->findOneBy(['id'=>$friend_id]);
        // insert
        $new = new Friends();
        $new->setIdMemb($member);
        $new->setIdFriend($friend);
        $em = $orm->getManager();
        $em->persist($new);
        $em->flush();
        $message = 'Your member has been added: '.$friend->getUsername();
        return new Response($message);
    }
    
    /**
     * @Method({"POST"})
     * @Route("/ajax/friend-delete", name="friend-delete")
     */
    public function friendsDeleteAction(Request $request)
    {
        $id = $request->get('id');
        $friend = $this->getDoctrine()->getRepository('AppBundle:Friends')
            ->findOneBy(['id'=>$id]);
        $em = $this->getDoctrine()->getManager();
        $em->remove($friend);
        $em->flush();
        $message = 'Your member has been deleted: '.$id;
        return new Response($message);
    }
    
}
