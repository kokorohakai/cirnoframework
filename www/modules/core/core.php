<?php
class coreModule extends Module{
    public $js = array(
        "core.js"
    );
    public $css = array(
        "core.css"
    );
    public $depends = array(
        "core/login"
    );
    public function __construct(){
        parent::__construct();

    }
}