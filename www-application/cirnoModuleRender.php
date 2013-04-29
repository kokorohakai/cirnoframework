<?php
class cirnoModuleRender extends CirnoAppBase{
    /********************
    * Private Variables
    ********************/
    /********************
    * Private Methods
    ********************/
    private function render404( ){
        echo '<SCRIPT>window.location="/home";</SCRIPT>';
        exit(0);
    }

    private function render( $url ){
        $this->components['js'] = array_unique($this->components['js']);
        $this->components['css'] = array_unique($this->components['css']);
        $this->components['footjs'] = array_unique($this->components['footjs']);

        $_SESSION['module'] = $this->components;
        $_SESSION['module']['path']=$url;

        //write the session for node.js to access.
        $sessionData = json_encode($_SESSION);
        $fname = "/var/php_session/sess_".session_id()."_js";
        $fh = fopen($fname,'w');
        fwrite($fh,$sessionData,strlen($sessionData));

        $sessionData;
        $nl = "\n";
        $body =  
            "<!DOCTYPE html>".$nl.
            '<HTML LANG="en">'.$nl.
                "<HEAD>".$nl.
                    '<META name="viewport" content="user-scalable=0"/>'.
                    '<META charset="utf-8"/>'.$nl.
                    "<TITLE>".$this->components['title']."</TITLE>".$nl.
                    '<SCRIPT src="/modules/core/js/system.js"></SCRIPT>'.$nl.
                    '<SCRIPT src="/modules/core/system.php?m='.$url.'"></SCRIPT>'.$nl;
        foreach ($this->components['css'] as $i){
            $body.= '<LINK rel="stylesheet" href="'.$i.'"/>'.$nl;
        }
        foreach ($this->components['js'] as $i){
            $body.= '<SCRIPT src="'.$i.'"></SCRIPT>'.$nl;
        }
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
            $this->render404();
            //This was causing bad files to ef up the session and confuse node.js.
            /*$url = $this->defaultModule["url"];
            $this->loadModule( $this->defaultModule );*/
        }
        if ( $this->user->hasPermissions( $this->components['permissions'] ) ){
            $this->render($url);
        } else {
            http_response_code(403);
            echo "User does not have permission to access this page.";
        }
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