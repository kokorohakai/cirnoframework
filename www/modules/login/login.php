<?php
class LoginModule extends Module{
    public $js = array(
        "/modules/core/js/layout/fittable/package.js",
        "/modules/core/js/onyx/package.js",
        "/modules/core/js/onyxWidgets/package.js",
        "login.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        "login.css"
    );
    public $depends = array(
        
    );

    public $permissions = array(
        
    );

    public $title = "⑨ Karaoke Machine: The Strongest Karaoke Machine Login.";
    
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}