<?php
class homeModule extends Module{
    public $js = array(
        "core.js"
    );
    public $css = array(
        "core.css"
    );
    public $depends = array(
        "admin"
    );
    public function __construct(){
        parent::__construct();

    }
}