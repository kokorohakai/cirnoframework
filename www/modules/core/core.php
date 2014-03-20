<?php
class CoreModule extends Module{
    public $js = array(
        //libraries
        "sha3.js",
        "socket.io.min.js",
        //enyo libraries
        "enyo.js",
        "layout/fittable/package.js",
        "onyx/package.js",
        //core app
        "/modules/core/css/core.css.js",
        "widgets/package.js",
        "core.js"
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