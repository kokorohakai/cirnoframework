<?php
class coreModule extends Module{
    public $js = array(
        "enyo.js",
        "core.js"
    );
    public $footjs = array(
        "initialize.js"
    );
    public $css = array(
        "enyo.css",
        "core.css"
    );
    public $depends = array(
        "core/login"
    );
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}