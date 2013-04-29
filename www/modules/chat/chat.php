<?php
class ChatModule extends Module{
    public $js = array(
        //libraries
        "Chat.js",
        "../css/package.js"
    );
    public $footjs = array(

    );
    public $css = array(

    );
    public $depends = array(
        
    );

    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args()); 
    }
}