<?php
namespace AppBundle\Twig;

use ToolsBundle\Html\TextHtml;
use ToolsBundle\Html\DatesHtml;

class TwigExtension extends \Twig_Extension implements \Twig_Extension_GlobalsInterface
{
    public $twig;

    public function __construct(\Twig_Environment $twig)
    {
        $this->twig = $twig;
    }
    
    public function getName()
    {
        return 'app.twig.extension';
    }
    
    public function getGlobals()
    {
        return [
            'locale'=>'fr',
        ];
    }

    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('widgetDate',[$this,'widgetDate']),
            new \Twig_SimpleFunction('slug',[$this,'slug']),
            new \Twig_SimpleFunction('shortGenre',[$this,'shortGenre']),
            new \Twig_SimpleFunction('longGenre',[$this,'longGenre']),
            new \Twig_SimpleFunction('price',[$this,'priceUStoFR']),
        ];
    }

    /* ********************************************************************** */

    public function widgetDate($row)
    {
        $html = DatesHtml::getWidgetDate($row,'date');
        return $html;
    }

    public function slug($str)
    {
        $html = TextHtml::rewrite($str);
        return $html;
    }

    public function priceUStoFR($number,$decimals=0,$decPoint='.',$thousandsSep=',')
    {
        $price = \number_format($number, $decimals, $decPoint, $thousandsSep);
        $price = '$'.$price;
        return $price;
    }

    /* ********************************************************************** */
    
    public function shortGenre($int)
    {
        $array = ['Choisissez','Mme','Mlle','Mr'];
        return $array[$int];
    }

    public function longGenre($int)
    {
        $array = ['Choisissez','Madame','Mademoiselle','Monsieur'];
        return $array[$int];
    }

}