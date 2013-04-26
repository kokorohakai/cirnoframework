<?php
class CirnoModuleRetrieval{
    /********************
    * Private Variables
    ********************/
    private function retrieveModule(){

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
    public function __construct( $app ){
    	$this->app = $app;
    	$this->request = $app->request;
    	$this->verb = $app->verb;
    	$this->module = $app->module;
    	$this->retrieveModule();
    }
}