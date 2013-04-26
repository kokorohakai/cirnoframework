<?php 
class Module{
    private function buildComponent( $com ){
        $obj = array();
        foreach ( $this->$com as $i ) {
            $temp = $this->metadata['path']."/".$com."/".$i;
            if (file_exists("../www".$temp) ){ 
                //is in the appropriate component folder.
                $obj[] = $temp;
            } else { 
                //must be a relative or static url.
                $obj[] = $i;
            }
        }
        $this->owner->components[ $com ] = array_merge( $this->owner->components[ $com ], $obj );
    }
    public function __construct( &$arguments ){
        if ( !isset($arguments[0]) && !isset($arguments[1]) ){
            echo "This Module has an invalid constructor!";
            var_dump($this);
            exit(0);
        }
        $this->owner = $arguments[0];
        $this->metadata = $arguments[1];

        $js = array();
        $css = array();

        $this->owner->components['title']=$this->title;
        $this->buildComponent( "js" );
        $this->buildComponent( "footjs" );
        $this->buildComponent( "css" );
    }
}

