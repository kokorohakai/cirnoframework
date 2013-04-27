<?php
class CirnoModuleRetrieval{
    /********************
    * Private Variables
    ********************/
    private function compileOutput(){
        $this->components['js'] = array_unique($this->components['js']);
        $this->components['css'] = array_unique($this->components['css']);
        $this->components['footjs'] = array_unique($this->components['footjs']);
        return $this->components;
    }
    private function buildModule( $url ){
        $module = array(
            "obj" => "",
            "path" => "",
            "name" => "",
            "url" => str_replace("..",".",$url),
            "exists" => false
        );

        $module['obj'] = split("/", $url );

        foreach ($module['obj'] as $i){
            $module['name'] = $i;
            $module['path'] .= "/modules/".$i;
        }
        $module['exists'] = file_exists(".".$module['path']."/".$module['name'].".php");
        return $module;
    }

    private function getModule( $module ){
        if ($module['exists']) { 
            require_once("../www".$module['path']."/".$module['name'].".php");
            $mname = $module['name']."Module";
            if (class_exists($mname)) {
                $moduleClass = new $mname( $this, $module );
            }

            $this->modules[$module['url']] = $moduleClass;
            if (isset($moduleClass->depends)) {
                foreach ($moduleClass->depends as $i) {
                    $depend = $this->buildModule($i);
                    if ($depend['exists']){
                        $this->getModule( $depend );
                    }
                }
            }
        }
    }

    private function retrieveModule(){
        if (!isset($this->request['module'])){
            http_response_code(404);
            $output = array("error"=>"No module name supplied");
        }else {
            $module = $this->buildModule($this->request['module']);
            if ($module['exists']){
                $this->getModule( $this->buildModule('core') );
                $this->getModule( $module );
                $output = $this->compileOutput();
            } else {
                http_response_code(404);
                $output = array("error"=>"Invalid module name supplied");
            }
        }
        echo json_encode($output);
        exit(0);
    }
    /********************
    * Private Methods
    ********************/
    /********************
    * Public Variables
    ********************/
    public $app;
    public $components = array(
        "title"=>"",
        "footjs"=>array(),
        "js"=>array(),
        "css"=>array()
    );
    public $module = array();
    /********************
    * Public Methods
    ********************/
    public function __construct( &$app ){
    	$this->app = $app;
    	$this->request = $app->request;
    	$this->verb = $app->verb;
    	$this->module = $app->module;
    	$this->retrieveModule();
    }
}