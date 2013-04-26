<?php
class CirnoAPI{
    /********************
    * Private Variables
    ********************/
    private function retrieveAPI(){

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
    	$this->retrieveAPI();
    }
}