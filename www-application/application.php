<?php
require_once("module.php");

class App{
    /********************
    * Private Variables
    ********************/
    private $modules = array();

    /********************
    * Private Methods
    ********************/
    //general module detected methods.
    private function loadCoreModule(){
        require_once("../www/modules/core/core.php");
        $core = new coreModule("DATA!");
        $this->modules["/core"] = $core;
    }
    private function loadModule( $module ){
        if ($module['exists']) {
            require_once("../www".$module['path']."/".$module['name'].".php");
            $mname = $module['name']."Module";
            $moduleClass = new $mname;
            $this->modules[$module['url']] = $moduleClass;
            if (isset($moduleClass->depends)) {
                foreach ($moduleClass->depends as $i) {
                    $depend = $this->buildModule($i);
                    $this->loadModule( $depend );
                }
            }
        }
    }
    private function loadModules(){
        $this->loadCoreModule();
        if ( $this->module['exists'] ){
            $this->loadModule( $this->module );
        } else {
            $this->loadModule( $this->defaultModule );
        }

        var_dump($this->modules);
        //if all is good in the above print out, then we are good to begin rendering.

    }

    //API Methods
    private function loadAPI(){
        echo "The API will load here.";
    }

    //MODULE retrieval Methods
    private function getModule(){
        echo "You like, serving module?";
    }

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

    private function prepareModule( $inRequest, $inVerb ){
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
    public $module = array();
    public $defaultModule = array(
        "obj"=>array("home"),
        "url"=>"home",
        "path"=>"/modules/home",
        "name"=>"home",
        "exists"=>true
    );
    public $request;
    public $verb;
    //public $var = 'val';
    /********************
    * Public Methods
    ********************/
    public function __construct( $inRequest, $inVerb ){
        $this->prepareModule( $inRequest, $inVerb );
        switch ($this->module[0]){
            case 'api':
                $this->loadAPI();
            break;
            case 'module':
                $this->getModule();
            break;
            default:
                $this->loadModules();
            break;
        }
    }
}
