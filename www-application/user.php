<?php
class user {
    /*******************
    * Private Variables
    *******************/

    /******************
    * Public Variables
    ******************/    

    /******************
    * Private Methods
    ******************/
    public function setupSession(){
        session_start();
        if (!isset($_SESSION['user'])){
            $_SESSION['user'] = array(
                "name" => "", //plain english name.
                "username" => "",
                "loggedIn" => false,
                "permissions" => array()
            );
        }
    }
    public function getUser(){
        $return = $_SESSION['user'];
        unset($return['permissions']);
        return $return;
    }
    /******************
    * Public Methods
    ******************/
    public function logout(){
        unset($_SESSION['user']);
    }

    public function hasPermissions( $permissions ){
        $retval = false;
        foreach ($permissions as $perm){
            foreach($this->permissions as $uperm){
                if ($uperm==$perm) $retval = true;
            }
        }
        if (empty($permissions)){
            $retval = true;
        }
        return $retval;
    }

    public function __construct(){
        $this->setupSession();
    }
}