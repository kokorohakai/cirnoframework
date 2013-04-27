<?php
require_once("cirnoController.php");

class CirnoAPI{
    /********************
    * Private Variables
    ********************/
    private function render( $output ){
        //could possible send a reponse here as well.
        echo json_encode( $output );
        //kill it so php will die after rendering, and nothing else that is needless.
        exit(0);
    }
    private function retrieveAPI(){
        $ouput = array();
        
        $path = $this->module['url'];
        $file = "../www-application/".$path."/".strtolower($this->verb).".php";

        if (file_exists($file)){
            require_once($file);
            if (class_exists("ApiController")){
                $AC = new ApiController();
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
            http_response_code(404);
            $output['error']="Could not find controller for: ".$path." ".$this->verb;
        }

        //var_dump($this->request);
        $this->render($output);
    }
    /********************
    * Private Methods
    ********************/
    private $password = "";
    private $database = "";
    private $address = "";
    private $port = "";
    /********************
    * Public Variables
    ********************/
    /********************
    * Public Methods
    ********************/
    public function __construct( &$app ){
    	$this->app = $app;
    	$this->request = $app->request;
    	$this->verb = $app->verb;
    	$this->module = $app->module;
    	$this->retrieveAPI();
    }
}