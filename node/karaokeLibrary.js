//publics
this.ready = false;
//Privates
var files = [];
var id3 = require('id3');

function setupMonitor(){
	var libraryModel = cirno.db.models["karaokeLibrary"];
	libraryModel.deleteKey(function(){},"unverified","1");
	this.ready = true;
	console.log("Library now ready for use.");
	cirno.fs.watch("../karaokeSongs",{},function(event, filename){
		console.log("someone added a file!", filename);
	})
}

this.start = function(){
	//sample data
	/*var file = "../karaokeSongs/00 Atmosphere.mp3";
	var fd = cirno.fs.openSync( file, 'r' );
	var buf = new Buffer(256);
	cirno.fs.readSync( fd, buf, null, buf.length, null );
	var test = new id3( buf );
	console.log("An id3 sample: ", test.getTags());
	cirno.fs.closeSync(fd);*/

	var libraryModel = cirno.db.models["karaokeLibrary"];
	libraryModel.update(function(){},false,{unverified:"1"});

	function scanFolder(n){
		//checkFile()
		var ext = "";
		var song_name = files[n];
		var band_name = "";
		var data = {};
		var valid = false;

		if ( files[n].lastIndexOf(".") > -1 ){
			var t = files[n].split(".");
			ext = t[t.length-1].toLowerCase();
		}
		if ( ext == "mp3" ) {
			/****************************************************************************
			*	A little note about id3 tags, and the Wha-wha-what!?!? about them.
			*	Each version has a different supported size, below is the table:
			*	id3v1 - 128 bytes
			*	1d3v2 - Max 256MB O__________o
			*	but it appears that any useful information for library building should 
			*	be stored in the first 256 bytes.
			*****************************************************************************/
			var file = "../karaokeSongs/"+files[n];
			var fd = cirno.fs.openSync( file, 'r' );
			var buf = new Buffer(256);
			cirno.fs.readSync( fd, buf, null, buf.length, null );
			//var buf = cirno.fs.readFileSync(file);
			var id3h = new id3( buf );
			data = id3h.getTags();
			if ( data && data.TIT2 && data.TPE1 ){
				song_name = data.TIT2.data;
				band_name = data.TPE1.data;
			} 
			cirno.fs.closeSync(fd);
			valid = true;
		}
		if ( ext == "avi" ){
			valid = true;
		}
		//update db.
		if (valid) {
			libraryModel.updateOrInsert(function(){
				if ( n + 1 < files.length ) { 
					setTimeout(function(){
						scanFolder(n+1);
					},1);//now be nice and let other people use the 'thread'.
				} else {
					setupMonitor();
				}
			},{
				file_name: 	files[n],
				song_name: 	song_name,
				band_name: 	band_name,
				data: 		JSON.stringify(data),
				unverified: '0'
			});
		}
	}
	cirno.fs.readdir("../karaokeSongs",function( err, inFiles ){
		console.log("Found ",inFiles.length," files in Karaoke Songs folder. Now updating library.");
		files = inFiles;
		scanFolder(0);
	})
}
