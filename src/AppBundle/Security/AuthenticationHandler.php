<?php
namespace AppBundle\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use ToolsBundle\Html\TextHtml;


class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{

    public function widgetAdmin($user)
    {
        $label = 'MESSAGE';
        $message  = '<span class="title">';
        $message .= TextHtml::bonjour().' et bienvenue:'."<br>\n";
        $message .= $user->shortGenre().' '.$user->getUsername().' '.$user->getFirstname()."<br>\n";
        $message .= '</span>';
        $message .= '<span class="title">';
        $message .= '<span class="inline-bloc">'.'Acces administration'.'</span>';
        $message .= '<a class="btnFocus" href="admin/membres">acces</a>';
        $message .= '</span>';
        return [$label,$message];
    }
    
    public function widgetPublic($user)
    {
        $label = 'MESSAGE';
        $message  = '<span class="title">';
        $message .= TextHtml::bonjour().' et bienvenue:'."<br>\n";
        $message .= $user->shortGenre().' '.$user->getUsername().' '.$user->getFirstname()."<br>\n";
        $message .= '</span>';
        $message .= '<span class="title">';
        $message .= '<span class="inline-bloc">'.'Compte membres'.'</span>';
        $message .= '<a class="btnFocus" href="mon-compte">compte</a>';
        $message .= '</span>';
        $message .= '<span class="title">';
        $message .= '<span class="inline-bloc">'.'Sorties membres'.'</span>';
        $message .= '<a class="btnFocus" href="sorties-'.date('Y').'">sorties</a>';
        $message .= '</span>';
        return [$label,$message];
    }
    
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $user   =   $token->getUser();
        $role   =   $user->getRoles()[0];
        if($request->isXmlHttpRequest() && $role==='ROLE_ADMIN'):
            $label = $this->widgetAdmin($user)[0];
            $message = $this->widgetAdmin($user)[1];
        elseif($request->isXmlHttpRequest() && $role==='ROLE_ADMIN'):
            $label = $this->widgetAdmin($user)[0];
            $message = $this->widgetAdmin($user)[1];
        else:
            $label = 'ATTENTION';
            $message = 'Vous n\'avez pas les autorisations necessaires.';
        endif;
        return new Response(TextHtml::msgAjax($label,$message));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if($request->isXmlHttpRequest()):
            $label = 'ATTENTION';
            $message  = 'Informations invalides pour:'."<br>\n";
            $message .= $request->get('_username')."<br><br>\n";
            $message .= '('.$exception->getMessage().')';
        endif;
        return new Response(TextHtml::msgAjax($label,$message));
    }

}