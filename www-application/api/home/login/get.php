<?
class ApiController extends Controller{
    public function render( $data ) {
        if (isset($data['checkpassword'])){
            error_log( hash("sha256", $data['checkpassword'] ) );
        }
        return array("user"=>$this->app->user->getUser());
    }
}