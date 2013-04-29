<?
class ApiController extends Controller{
    public function render( $data ) {
        $this->app->user->logout();
        return array("success"=>"Bai bai, birdie! Bai, bai!!!");
    }
}