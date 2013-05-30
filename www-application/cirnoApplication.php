<?php
require_once("cirnoAppBase.php");
require_once("controller.php");
require_once("module.php");
require_once("model.php");
require_once("user.php");
//the app
require_once("cirnoAPI.php");
require_once("cirnoModuleRender.php");
require_once("cirnoModuleRetrieval.php");

class CirnoApplication extends CirnoPartialAppBase{
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
    private function prepareApplication( $inRequest, $inVerb ){
        $module = $this->defaultModule;
        $request = array();
        $verb = 'GET';
        
        if (isset($inRequest)){
            $request = $inRequest;

            if (isset($request['url'])){
                $module = $this->buildModule(str_replace("..",".",$request['url']));
                unset($request['url']);
            }
        }
        if (isset($inVerb)){
            $verb = str_replace("..",".",stripslashes($inVerb));
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
