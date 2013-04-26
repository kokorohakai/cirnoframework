<?php
class loginModule extends Module{
    public $js = array(
        "login.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        "login.css"
    );
    public $depends = array(        
    );
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}