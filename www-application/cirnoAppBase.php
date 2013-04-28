<?php
//this is because main application only needs this stuff of application base, and not the rest of the crazy.
class CirnoPartialAppBase {
    public $defaultModule = array(
        "obj"=>array("home"),
        "url"=>"home",
        "path"=>"/modules/home",
        "name"=>"home",
        "className" => "HomeModule",
        "exists"=>true
    );

    public function buildModule( $url ){
        $module = array(
            "obj" => "",
            "path" => "",
            "name" => "",
            "url" => str_replace("..",".",$url),
            "className" => "",
            "exists" => false
        );

        $module['obj'] = split("/", $url );

        foreach ($module['obj'] as $i){
            $module['name'] = $i;
            $module['className'] .= ucfirst($i);
            $module['path'] .= "/modules/".$i;
        }
        $module['className'] .= "Module";
        $module['exists'] = file_exists(".".$module['path']."/".$module['name'].".php");
        return $module;
    }    
}

//This is the rest of everything that the Applications use. 
//Usually only one of these will be initiated.
class CirnoAppBase extends CirnoPartialAppBase{
    public $modules = array();
    public $app;
    public $components = array(
        "title"=>"",
        "footjs"=>array(),
        "js"=>array(),
        "css"=>array(),
        "permissions"=>array()
    );
    public $module = array();

    public function loadModule( $module ){
        if ($module['exists']) {
            require_once("../www".$module['path']."/".$module['name'].".php");
            if (class_exists($module['className'])) {
                $moduleClass = new $module['className']( $this, $module );
                $this->modules[$module['url']] = $moduleClass;

                //load dependancies
                if (isset($moduleClass->depends)) {
                    foreach ($moduleClass->depends as $i) {
                        $depend = $this->buildModule($i);
                        if ($depend['exists']){
                            $this->loadModule( $depend );
                        } else {
                            error_log("ERROR: Module ".$depend['name']." of ".$module['name']." does not exist!");
                        }
                    }
                }
            } else {
                error_log("ERROR: Malformed class defined '".$module['className']."' @ ".$module['path']);
            }
        }
    }

    public function __construct( &$app ){
        $this->app = $app;
        $this->request = $app->request;
        $this->verb = $app->verb;
        $this->module = $app->module;

        $this->user = new user();
    }
}