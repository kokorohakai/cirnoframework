<?php
class HomeInstructionsModule extends Module{
    public $js = array(
        "instructions.js"
    );
    public $footjs = array(
        
    );
    public $css = array(
        
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