<?php
class HomeModule extends Module{
    public $js = array(
        "/modules/core/js/layout/fittable/package.js",
        "/modules/core/js/onyx/package.js",
        "/modules/core/js/onyxWidgets/package.js",
        "home.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        "home.css"
    );
    public $depends = array(
        
    );

    public $permissions = array(
    );

    public $title = "⑨ Karaoke Machine: The Strongest Karaoke Machine.";
    
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}