<?php
class AdminModule extends Module{
    public $js = array(
        "admin.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        "admin.css"
    );
    public $depends = array(
    );
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());
    }
    public $permissions = array(
        "admin"
    );
}