<?php
class cirnoModuleRender{
    /********************
    * Private Variables
    ********************/
    private $modules = array();
    /********************
    * Private Methods
    ********************/
    private function render( $url ){
        $this->components['js'] = array_unique($this->components['js']);
        $this->components['css'] = array_unique($this->components['css']);
        $this->components['footjs'] = array_unique($this->components['footjs']);
        $nl = "\n";
        $body =  
            "<!DOCTYPE html>".$nl.
            '<HTML LANG="en">'.$nl.
                "<HEAD>".$nl.
                    '<META charset="utf-8"/>'.$nl.
                    "<TITLE>".$this->components['title']."</TITLE>".$nl;
        foreach ($this->components['css'] as $i){
            $body.='<LINK rel="stylesheet" href="'.$i.'"/>'.$nl;
        }
        foreach ($this->components['js'] as $i){
            $body.='<SCRIPT src="'.$i.'"></SCRIPT>'.$nl;
        }
        $body.=     '<SCRIPT>'.$nl.
                        'CirnoApp.module = "'.$url.'"'.$nl.
                    '</SCRIPT>';
        $body .=
                "</HEAD>".$nl.
                "<BODY>".$nl.
                '<DIV id="cirno">If you are seeing this, something went horribly wrong on the front end application.</DIV>'.$nl;
        foreach ($this->components['footjs'] as $i){
            $body.='<SCRIPT src="'.$i.'"></SCRIPT>'.$nl;
        }
        $body .=
                "</BODY>".$nl;
            "</HTML>".$nl;
        echo $body;
    }

    private function loadModule( $module ){
        if ($module['exists']) {
            require_once("../www".$module['path']."/".$module['name'].".php");
            $mname = $module['name']."Module";
            if (class_exists($mname)) {
                $moduleClass = new $mname( $this, $module );
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
            $url = $this->defaultModule["url"];
            $this->loadModule( $this->defaultModule );
        }

        error_log($url);
        $this->render($url);
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
        $module['exists'] = file_exists("../www".$module['path']."/".$module['name'].".php");
        return $module;
    }

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
    public function __construct( &$app ){
        $this->app = $app;
    	$this->request = $app->request;
    	$this->verb = $app->verb;
    	$this->module = $app->module;
    	$this->loadModules($this->module['url']);
    }
}