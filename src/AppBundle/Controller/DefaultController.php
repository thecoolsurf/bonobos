<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    
    /**
     * @Method({"GET"})
     * @Route("/", name="home")
     */
    public function homeAction()
    {
        return $this->render('publics/home.html.twig', [
            'url'=>'home',
        ]);
    }
    
    /**
     * @Method({"GET"})
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {
        return $this->render('publics/about.html.twig', [
            'url'=>'about',
        ]);
    }

}
