<?
class ApiController extends Controller{
    public function render( $data ) {
    	$userModel = new Model("users");

    	if (strlen($data['username'])>2 && strlen($data['password'])>2){
    		$pw = hash("sha256", $data['password'] );
        	
            $user = $userModel->select("name",$data['username']);
            if (!empty($user)){
            	if ($user[0]['password'] == $pw) {
            		$this->app->user->setUser($user[0]);
            		return array("success"=>"Present day... Present time.....");
            	} else {
		        	http_response_code(503);
			    	return array("error"=>"Password incorrect.");            		
            	}
            } else {
	        	http_response_code(503);
                $id = $userModel->insert(array("name"=>$data['username'],"password"=>$pw));

                $userPermissions = new Model("user_permissions");
                $userPermissions->insert(array("users_id"=>$id, "permissions_id"=>1));

                $user = $userModel->get($id);
                $this->app->user->setUser($user[0]);
                
                return array("success"=>"Welcome to the dark parade.");
            }
        } else {
        	http_response_code(503);
	    	return array("error"=>"Need both a username and password to log in.");
        }
    }
}