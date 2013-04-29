<?php 
session_start();
/*
    The intent of this file is to get system related data to the client via javascript.
    Only things that are safe to be viewable by the public should be exported from here.
*/
?>
Cirno.Sys.module = "<?php echo $_GET['m']; ?>";
Cirno.Sys.user = User(<?php echo json_encode($_SESSION['user']); ?>);
