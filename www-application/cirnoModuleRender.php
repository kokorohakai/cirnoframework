<?php
class cirnoModuleRender{
    /********************
    * Private Variables
    ********************/
    private $modules = array();
    /********************
    * Private Methods
    ********************/
    private function loadCoreModule(){
        require_once("../www/modules/core/core.php");
        $core = new coreModule( $this->app );
        $this->modules["core"] = $core;
    }
    private function loadModule( $module ){
        if ($module['exists']) {
            require_once("../www".$module['path']."/".$module['name'].".php");
            $mname = $module['name']."Module";
            if (class_exists($mname)) {
                $moduleClass = new $mname( $this->app );
            } else {
                echo "ERROR: Malformed class defined '".$module['name']."' @ ".$module['path'];
                exit(0);
            }
            $this->modules[$module['url']] = $moduleClass;
            if (isset($moduleClass->depends)) {
                foreach ($moduleClass->depends as $i) {
                    $depend = $this->buildModule($i);
                    if ($depend['exists']){
                        $this->loadModule( $depend );
                    } else {
                        echo "ERROR: Module ".$depend['name']." of ".$module['name']." does not exist!";
                        exit(0);
                    }
                }
            }
        }
    }
    private function loadModules($url){
        $this->loadModule( $this->buildModule("core") );
        if ( $this->module['exists'] ){
            $this->loadModule( $this->module );
        } else {
            $this->loadModule( $this->defaultModule );
        }

        echo "<pre>";
        var_dump($this->modules);
        echo "</pre>";
        //if all is good in the above print out, then we are good to begin rendering.

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
    /********************
    * Public Methods
    ********************/
    public function __construct( $app ){
    	$this->app = $app;
    	$this->request = $app->request;
    	$this->verb = $app->verb;
    	$this->module = $app->module;
    	$this->loadModules();
    }
}