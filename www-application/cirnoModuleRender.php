<?php
class cirnoModuleRender extends CirnoAppBase{
    /********************
    * Private Variables
    ********************/
    /********************
    * Private Methods
    ********************/
    private function render( $url ){
        $this->components['js'] = array_unique($this->components['js']);
        $this->components['css'] = array_unique($this->components['css']);
        $this->components['footjs'] = array_unique($this->components['footjs']);
        $nl = "\n";
        $body =  
            "<!DOCTYPE html>".$nl.
            '<HTML LANG="en">'.$nl.
                "<HEAD>".$nl.
                    '<META name="viewport" content="user-scalable=0"/>'.
                    '<META charset="utf-8"/>'.$nl.
                    "<TITLE>".$this->components['title']."</TITLE>".$nl;
        foreach ($this->components['css'] as $i){
            $body.='<LINK rel="stylesheet" href="'.$i.'"/>'.$nl;
        }
        foreach ($this->components['js'] as $i){
            $body.='<SCRIPT src="'.$i.'"></SCRIPT>'.$nl;
        }
        $body.=     '<SCRIPT>'.$nl.
                        'window.module = "'.$url.'"'.$nl.
                        'window.user = '.json_encode($_SESSION['user']).$nl.
                    '</SCRIPT>';
        $body .=
                "</HEAD>".$nl.
                "<BODY>".$nl.
                '<DIV id="cirno"></DIV>'.$nl;
        foreach ($this->components['footjs'] as $i){
            $body.='<SCRIPT src="'.$i.'"></SCRIPT>'.$nl;
        }
        $body .=
                "</BODY>".$nl;
            "</HTML>".$nl;
        echo $body;
    }

    private function loadModules($url){
        $this->loadModule( $this->buildModule("core") );
        if ( $this->module['exists'] ){
            $this->loadModule( $this->module );
        } else {
            $url = $this->defaultModule["url"];
            $this->loadModule( $this->defaultModule );
        }

        $this->render($url);
    }

    /********************
    * Public Variables
    ********************/
    /********************
    * Public Methods
    ********************/
    public function __construct( &$app ){
        parent::__construct($app);
        
    	$this->loadModules($this->module['url']);
    }
}