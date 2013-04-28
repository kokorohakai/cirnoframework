<?php
class CoreModule extends Module{
    public $js = array(
        "enyo.js",
        "utils.js",
        "socket.io.min.js",
        "messaging.js",
        "loginmanager.js",
        "core.js",
        "sha3.js",
        "widgets/package.js",
        "/modules/core/css/core.css.js"
    );
    public $footjs = array(
        "initialize.js"
    );
    public $css = array(
        "enyo.css"
    );
    public $depends = array(
        
    );

    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args()); 
    }
}