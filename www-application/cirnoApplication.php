<?php
require_once("cirnoAPI.php");
require_once("cirnoModuleRender.php");
require_once("cirnoModuleRetrieval.php");
require_once("module.php");

class CirnoApplication{
    /********************
    * Private Variables
    ********************/
    private $api;
    private $moduleRetrieval;
    private $moduleRender;
    /********************
    * Private Methods
    ********************/
    //general module detected methods.
    private function buildModule( $url ){
        $module = array(
            "obj" => "",
            "path" => "",
            "name" => "",
            "url" => $url,
            "exists" => false
        );

        $module['obj'] = split("/", $url );

        foreach ($module['obj'] as $i){
            $module['name'] = $i;
            $module['path'] .= "/modules/".$i;
        }
        $module['exists'] = file_exists("../www".$module['path']."/".$module['name'].".php");
        return $module;
    }

    private function prepareApplication( $inRequest, $inVerb ){
        $module = $this->defaultModule;
        $request = array();
        $verb = 'GET';
        
        if (isset($inRequest)){
            $request = $inRequest;

            if (isset($request['url'])){
                $module = $this->buildModule($request['url']);
                unset($request['url']);
            }
        }
        if (isset($inVerb)){
            $verb = $inVerb;
        }

        $this->module = $module;
        $this->request = $request;
        $this->verb = $verb;
    }
    /********************
    * Public Variables
    ********************/
    public $module;
    public $request;
    public $verb;
    /********************
    * Public Methods
    ********************/
    public function __construct( $inRequest, $inVerb ){
        $this->prepareApplication( $inRequest, $inVerb );

        switch ($this->module['obj'][0]){
            case 'api':
                $this->api = new CirnoAPI( $this );
            break;
            case 'module':
                $this->moduleRetrieval = new CirnoModuleRetrieval( $this );
            break;
            default:
                $this->moduleRender = new CirnoModuleRender( $this );
            break;
        }
    }
}
