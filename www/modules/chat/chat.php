<?php
class ChatModule extends Module{
    public $js = array(
        //libraries
        "chat.js",
        "../css/package.js"
    );
    public $footjs = array(

    );
    public $css = array(

    );
    public $depends = array(
        
    );
    
    public $permissions = array(
        "user"
    );
    public function __construct( &$renderer, &$meta ){
        parent::__construct(func_get_args()); 
    }
}