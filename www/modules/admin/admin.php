<?php
class adminModule extends Module{
    public $js = array(
        "core.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        "core.css"
    );
    public $depends = array(
    );
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}