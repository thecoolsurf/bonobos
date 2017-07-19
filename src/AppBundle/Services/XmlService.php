<?php
namespace AppBundle\Services;

use Symfony\Component\HttpFoundation\Request;
use ToolsBundle\Datas\XmlDatas;
use ToolsBundle\Html\TextHtml;

class XmlService extends XmlDatas
{
    
    public function adminMenus()
    {
        $menus = [
            ['preference','metas','texte','medias','menus','images','minifier'],
            ['membres','messages','newsletter','lieux','soirees','repas','reservations','voyages'],
        ];
        return $menus;
    }
    
    public function adminXmlSelector()
    {
        $selector = [
            'medias'=>[
                1=>'liens',2=>'partenaires',3=>'photos',4=>'presse',5=>'temoignages',6=>'videos'
            ],
            'metas'=>[
                $this->getSimpleXml('system','menus'),
            ],
            'preference'=>[
                1=>'departement',2=>'europe',3=>'legals',4=>'notices',5=>'paiements',6=>'preference',7=>'region',8=>'reseaux'
            ],
            'texte'=>[
                $this->getSimpleXml('system','menus'),
            ],
        ];
        return $selector;
    }

    /**
     * 
     * @return array
     */
    public function getSoireesThemes()
    {
        $xml = $this->getSimpleXml('system','menus');
        $menus[0]   =	'Choisissez';
        $menus[1]   =	TextHtml::enCAP($xml->menus[2]->urls[2]);	// 1 | diners-dansants
        $menus[2]   =	TextHtml::enCAP($xml->menus[2]->urls[4]);	// 2 | spectacles
        $menus[3]   =	TextHtml::enCAP($xml->menus[2]->urls[5]);	// 3 | sorties
        $menus[4]   =	TextHtml::enCAP($xml->menus[3]->urls[0]);	// 4 | saint-valentin
        $menus[5]   =	TextHtml::enCAP($xml->menus[3]->urls[1]);	// 5 | halloween
        $menus[6]   =	TextHtml::enCAP($xml->menus[3]->urls[2]);	// 6 | noel
        $menus[7]   =	TextHtml::enCAP($xml->menus[3]->urls[3]);	// 7 | reveillon
        $menus[8]   =	TextHtml::enCAP($xml->menus[2]->urls[1]);	// 8 | brunchs
        $menus[9]   =	TextHtml::enCAP($xml->menus[2]->urls[3]);	// 9 | speed-dating
        $menus[10]  =	TextHtml::enCAP($xml->menus[2]->urls[0]);	// 10 | after-work
        $menus[11]  =	TextHtml::enCAP($xml->menus[4]->urls[0]);	// 11 | voyages
        return $menus;
    }
    
    /**
     * 
     * @param Request $request
     * @return array
     */
    public function xmlSystem(Request $request)
    {
        $file = $request->get('th');
        $xml = $this->getSimpleXml('system',$file);
        $datas = [];
        foreach($xml->children() as $data):
            switch($file):
                case 'departement':
                    $datas[] = array(
                        'code'=>$data->code,
                        'name'=>$data->name,
                        'prefecture'=>$data->prefecture,
                    );
                break;
                case 'europe':
                    $datas[] = array(
                        'code'=>$data->code,
                        'name'=>$data->name,
                    );
                break;
                case 'legals':
                    $datas[] = array(
                        'sarl'=>$data->sarl,
                        'siret'=>$data->siret,
                        'siren'=>$data->siren,
                        'tva'=>$data->tva,
                        'ape'=>$data->ape,
                        'cnil'=>$data->cnil,
                        'rcs'=>$data->rcs,
                        'host'=>$data->host,
                    );
                break;
                case 'notices':
                    $datas[] = array(
                        'name'=>$data->name,
                        'value'=>$data->value,
                    );
                break;
                case 'paiements':
                    $datas[] = array(
                        'paiement'=>$data->paiement,
                    );
                break;
                case 'preference':
                    $datas[] = array(
                        'baseline'=>$data->baseline,
                        'societe'=>$data->societe,
                        'adress'=>$data->adress,
                        'cpostal'=>$data->cpostal,
                        'ville'=>$data->ville,
                        'email'=>$data->email,
                        'phone'=>$data->phone,
                        'mobile'=>$data->mobile,
                    );
                break;
                case 'region':
                    $datas[] = array(
                        'code'=>$data->code,
                        'name'=>$data->name,
                    );
                break;
                case 'reseau':
                    $datas[] = array(
                        'name'=>$data->name,
                        'url'=>$data->url,
                        'user'=>$data->user,
                        'appid'=>$data->appid,
                    );
                break;
            endswitch;
        endforeach;
        return $datas;
    }
    
    /**
     * 
     * @param Request $request
     * @return array
     */
    public function xmlMedias(Request $request)
    {
        $file = $request->get('th');
        $xml = $this->getSimpleXml('medias',$file);
        $datas = [];
        $sorts = [];
        foreach($xml->children() as $data):
            switch($file):
                case 'liens':
                    $sorts[] = $data->theme;
                    $datas[] = array(
                        'theme'=>$data->theme,
                        'urls'=>$data->urls,
                    );
                break;
                case 'partenaires':
                    $sorts[] = $data->titre;
                    $datas[] = array(
                        'titre'=>$data->titre,
                        'legende'=>$data->legende,
                        'lien'=>$data->lien,
                        'email'=>$data->email,
                        'photo'=>$data->photo,
                    );
                break;
                case 'presse':
                    $sorts[] = $data->titre;
                    $datas[] = array(
                        'titre'=>$data->titre,
                        'legende'=>$data->legende,
                        'lien'=>$data->lien,
                        'photo'=>$data->photo,
                    );
                break;
                case 'temoignages':
                    $sorts[] = $data->membre;
                    $datas[] = array(
                        'membre'=>$data->membre,
                        'titre'=>$data->titre,
                        'legende'=>$data->legende,
                    );
                break;
            endswitch;
        endforeach;
        \array_multisort($sorts,SORT_DESC,SORT_STRING,$datas);
        return $datas;
    }
    
    /**
     * 
     * @param Request $request
     * @param int $pg
     * @return array
     */
    public function xmlPhotos(Request $request, $pg)
    {
        $xml = $this->getSimpleXml('medias','photos');
        $uri = $request->get('_route');
        $max = (\preg_match('/galerie-photos/',$uri)==0)?4:24;
        $i=0;
        foreach($xml->photos as $photos):
            if(preg_match('/\//',$photos->date)==1):
                $date = explode('/',$photos->date);
                $sort[$i] = \strtotime($date[2].'-'.$date[1].'-'.$date[0]);
            else:
                $sort[$i] = $photos->date;
            endif;
            $datas[] = array(
                'date'=>$photos->date,
                'titre'=>$photos->titre,
                'legende'=>$photos->legende,
                'photo'=>$photos->photo,
            );
            $i++;
        endforeach;
        \array_multisort($sort,SORT_DESC,SORT_STRING,$datas);
        $chunk	=   \array_chunk($datas,$max,TRUE);
        $tt	=   \count($chunk);
        $datas	=   $chunk[$pg];
        return [$datas,$tt,$pg];
    }
    
    /**
     * 
     * @param int $pg
     * @return array
     */
    public function xmlVideos($pg)
    {
        $xml = $this->getSimpleXml('medias','videos');
        $max = 4;
        $i=0;
        foreach($xml->videos as $videos):
            if(preg_match('/\//',$videos->date)==1):
                $date = explode('/',$videos->date);
                $sort[$i] = \strtotime($date[2].'-'.$date[1].'-'.$date[0]);
            else:
                $sort[$i] = $videos->date;
            endif;
            $datas[] = array(
                'date'=>$videos->date,
                'titre'=>$videos->titre,
                'legende'=>$videos->legende,
                'movie'=>$videos->movie,
                'youtube'=>$videos->youtube,
            );
            $i++;
        endforeach;
        \array_multisort($sort,SORT_DESC,SORT_STRING,$datas);
        $chunk	=   \array_chunk($datas,$max,TRUE);
        $tt	=   \count($chunk);
        $datas	=   $chunk[$pg];
        return [$datas,$tt,$pg];
    }
    
    /**
     * 
     * @return array
     */
    public function publicMenus()
    {
        $menus = $this->getSimpleXml('system','menus');
        $alldates = array(\date('Y')-1,\date('Y'));
        $withdate = array();
        // soirees celibataires
        foreach($menus->menus[2]->urls as $urls):
            \array_push($withdate,TextHtml::rewrite($urls));
        endforeach;
        // soirees a theme
        foreach($menus->menus[3]->urls as $urls):
            \array_push($withdate,TextHtml::rewrite($urls));
        endforeach;
        // voyages celib
        foreach($menus->menus[4]->urls as $urls):
            \array_push($withdate,TextHtml::rewrite($urls));
        endforeach;
        return [$menus,$alldates,$withdate];
    }
    
}