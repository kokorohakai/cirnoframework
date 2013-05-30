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
    /******************
    * Public Methods
    ******************/
    public function setupSession(){
        ini_set("session.cookie_lifetime","28800");
        ini_set('session.gc_maxlifetime', '28800');
        session_start();
        if (!isset($_SESSION['user'])){
            $_SESSION['user'] = array(
                "first_name" => "",
                "last_name" => "",
                "username" => "",
                "user_id" => "",
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
    public function setUser( $data ){
        $permsModel = new Model("user_permissions","id",array(
            "permissions_id"=>array("permissions"=>"id")
        ));
        $permissions = array();
        foreach( $permsModel->select("users_id",$data['id'] ) as $perm ){
            $permissions[] = $perm['name'];
        }
        
        $_SESSION['user'] = array(
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "username" => $data["name"],
            "user_id" => $data["id"],
            "loggedIn" => true,
            "permissions" => $permissions
        );
        return true;
    }
    public function logout(){
        unset($_SESSION['user']);
    }

    public function hasPermissions( $permissions ){
        $retval = false;
        foreach ($permissions as $perm){
            foreach($_SESSION['user']['permissions'] as $uperm){
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