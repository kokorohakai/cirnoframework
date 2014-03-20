<?php
class CirnoModuleRetrieval extends CirnoAppBase{
    /********************
    * Private Variables
    ********************/
    private function compileOutput(){
        $this->components['js'] = array_unique($this->components['js']);
        $this->components['css'] = array_unique($this->components['css']);
        $this->components['footjs'] = array_unique($this->components['footjs']);
        return $this->components;
    }

    private function retrieveModule(){
        if (!isset($this->request['module'])){
            http_response_code(404);
            $output = array("error"=>"No module name supplied");
        }else {
            $module = $this->buildModule($this->request['module']);
            if ($module['exists']){
                $this->loadModule( $this->buildModule('core') );
                $this->loadModule( $module );
                $output = $this->compileOutput();
            } else {
                http_response_code(404);
                $output = array("error"=>"Invalid module name supplied");
            }
        }

        if ( !$this->user->hasPermissions( $this->components['permissions'] ) ){
            http_response_code(403);
            $output = array('error'=>"User does not have permission to access this module.");
        }
        echo json_encode($output);
        exit(0);
    }
    /********************
    * Private Methods
    ********************/
    /********************
    * Public Variables
    ********************/
    /********************
    * Public Methods
    ********************/
    public function __construct( &$app ){
    	parent::__construct($app);
        
    	$this->retrieveModule();
    }
}