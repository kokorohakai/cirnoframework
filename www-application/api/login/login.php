<?
class ApiController extends Controller{
    public function render( $data ) {
    	$userModel = new Model("users");

    	if (isset($data['username']) && isset($data['password'])){
    		$pw = hash("sha256", $data['password'] );
        	
            $data = $userModel->select("name",$data['username']);
            if (!empty($data)){
            	if ($data[0]['password'] == $pw) {
            		//log this shit in!
            		return array("success"=>"Present day... Present time.....");
            	} else {
		        	http_response_code(503);
			    	return array("error"=>"Password incorrect.");            		
            	}
            } else {
	        	http_response_code(503);
		    	return array("error"=>"User does not exist.");
		    	//here, we should "Create" the user. For those drunkin' karaoke bastards.
            }
        } else {
        	http_response_code(503);
	    	return array("error"=>"Need both a username and password to log in.");
        }
    }
}