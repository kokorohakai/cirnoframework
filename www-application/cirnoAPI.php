<?php
class CirnoAPI extends CirnoAppBase{
    /********************
    * Private Variables
    ********************/
    private function render( $output ){
        //could possible send a reponse here as well.
        echo json_encode( $output, JSON_FORCE_OBJECT );
        //kill it so php will die after rendering, and nothing else that is needless.
        exit(0);
    }
    private function retrieveAPI(){
        $ouput = array();
        
        $path = $this->module['url'];
        $file = "../www-application/".$path."/".strtolower($this->verb).".php";
        $module = $this->buildModule(str_replace("api/", "", $path));

        if (file_exists($file) && $module['exists']){
            $this->loadModule($module);

            //$this->components['permissions'];  //this is now populated, check against user.
            if ($this->user->hasPermissions( $this->components['permissions'] )) {
                require_once($file);
                if (class_exists("ApiController")){
                    $AC = new ApiController($this);
                    if (method_exists($AC,"render")){
                        $output = $AC->render($this->request);
                    } else {
                        http_response_code(404);
                        $output['error']="File for controller: ".$path." ".$this->verb." exists, but class ApiController does not have a render method!";
                    }
                } else {
                    http_response_code(404);
                    $output['error']="File for controller: ".$path." ".$this->verb." exists, but does not contain class ApiController!";
                }
            } else {
                http_response_code(403);
                $output['error']="User does not have permission to access this file.";                
            }
        } else {
            if (!file_exists($file)) {
                http_response_code(404);
                $output['error']="Could not find controller for: ".$path." ".$this->verb;
            } else {
                http_response_code(404);
                $output['error']="No Module for API found.";
            }
        }

        //var_dump($this->request);
        $this->render($output);
    }
    /********************
    * Private Methods
    ********************/
    /********************
    * Public Variables
    ********************/
    /********************
    * Public Methods
    ********************/
    public function __construct( &$app ){
        parent::__construct($app);

        $this->retrieveAPI();
    }
}