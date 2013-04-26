<?php
class loginModule extends Module{
    public $js = array(
        "login.js"
    );
    public $css = array(
        "login.css"
    );
    public $depends = array(        
    );
    public function __construct( $app ){
        parent::__construct();

    }
}