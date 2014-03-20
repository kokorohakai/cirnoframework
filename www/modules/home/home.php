<?php
class HomeModule extends Module{
    public $js = array(
        "package.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        
    );
    public $depends = array(
        
    );

    public $permissions = array(
        
    );

    public $title = "⑨ Cirno Framework";
    
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}