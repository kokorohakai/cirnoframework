<?php
class homeModule extends Module{
    public $js = array(
        "home.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        "home.css"
    );
    public $depends = array(
        
    );

    public $title = "⑨ Karaoke Machine: The Strongest Karaoke Machine.";
    
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args());

    }
}