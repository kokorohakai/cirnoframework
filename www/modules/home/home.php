<?php
class homeModule extends Module{
    public $js = array(
        "home.js"
    );
    public $css = array(
        "home.css"
    );
    public $depends = array(
        
    );
    public function __construct( $app ){
        parent::__construct();

    }
}