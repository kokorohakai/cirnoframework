<?php
class adminModule extends Module{
    public $js = array(
        "core.js"
    );
    public $css = array(
        "core.css"
    );
    public $depends = array(
    );
    public function __construct(){
        parent::__construct();

    }
}