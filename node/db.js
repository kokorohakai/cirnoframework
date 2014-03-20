var dbConfig = {
    host: 'localhost',
    user: 'cirno',
    password: 'cirn0!isstr0ng3st*',
    database: 'cirno'
};
var mysql = require('mysql');
var connection = null;

function setupDatabase(){
    connection = mysql.createConnection(dbConfig);
    connection.on('error', function(err){
        if (!err.fatal) return; //don't do anything if it's not fatal.
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            console.log(err);
            process.exit(0);
        } else {
            setupDatabase();
        }
    });
}
setupDatabase();

this.models = {};

this.createModel = function( name, table, key, joins ){
    this.models[name] = new Model( table, key, joins );
}

/********************************************************************************
* Model class: 
*   Please do not move this, or it will not find connection and fail.
********************************************************************************/
function Model( table, key, joins ) { 
    /**************
    * Private Vars
    **************/
    var self = this;
    var sqlParams = {};
    var pkey = "id";
    /**************
    * Public Vars
    **************/
    //this.example = 'data';
    /*****************
    * Private Methods
    *****************/
    function getValueStr( values ){
        valueStr = "";
        for ( var i in values ){
            var value = values[i].toString().replaceAll("'","''");
            valueStr+="`"+i+"`='"+value+"', ";
        }
        var len = valueStr.length;
        if ( len > 2 ){
            valueStr = valueStr.substr( 0, len-2 )
        }
        return valueStr;
    }
    function constructor( table, key, joins ) {
        if (!key) key = "id";
        var joinStr = "";
        for( var field in joins ){
            var join = joins[field];
            for ( var target in join ) {
                var target_field = join[target];
                joinStr += "LEFT JOIN `" + target + "` ON `" + field + "` = `" + target + "`.`" + target_field + "` ";
            }
        }

        sqlParams["table"]   = table;
        sqlParams["joins"]   = joinStr;
        sqlParams["where"]   = "WHERE `"+table+"`.`"+key+"` = ";
        //unlike the PHP version, here I try to simplify the concatination by 
        //pre building most of the query needed for each method.
        sqlParams["get"]     = "SELECT * FROM `"+sqlParams['table']+"` "+sqlParams['joins']+sqlParams['where'];
        sqlParams["select"]  = "SELECT * FROM `"+sqlParams['table']+"` "+sqlParams['joins'];
        sqlParams["count"]   = "SELECT COUNT(*) AS count FROM `"+sqlParams['table']+"` "+sqlParams['joins'];
        sqlParams["delete"]  = "DELETE FROM `"+sqlParams['table']+"` WHERE `"+pkey+"`=";
        sqlParams["insert"]  = "INSERT INTO `"+sqlParams['table']+"` SET ";
        sqlParams["update"]  = "UPDATE `"+sqlParams['table']+"` SET ";
        pkey = key;
    }
    /*****************
    * Public Methods
    *****************/
    this.get = function( cb, id ){
        var id = id.toString().replaceAll("'","''");
        var sql = sqlParams["get"] + "'" + id + "'";
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.select = function( cb, values, sortBy, sortOrd, limit, startat, count ){
        if (!startat) startat = 0;
        if (!limit) limit = 100;
        if (!sortOrd) sortOrd = 'DESC';
        if (!sortBy) sortBy = '1';
        if (!values) values = false;
        if (!count) count = false;
        key = (!key) ? false : key.toString();
        if (isNaN(parseInt(sortBy))){
            sortBy = "`"+sqlParams['table']+"`.`"+sortBy+"`";
        }
        var preSql = (count) ? sqlParams['count'] : sqlParams['select'];
        var postSql = "ORDER BY "+sortBy+" "+sortOrd+" LIMIT "+startat+","+limit;
        var sql = "";
        if (typeof(values) == "object" && !(values instanceof Array)){
            var where = "";
            for ( var i in values ) {
                value = values[i].toString().replaceAll("'","''");
                where += (where.length > 0) ? " AND " : "";
                where += "`" + sqlParams['table'] + "`.`" + i + "` = '" + value + "'";
            }
            sql = preSql + " WHERE " + where + " " + postSql;            
        } else {
            sql = preSql + " " + postSql;
        }
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.search = function( cb, values, sortBy, sortOrd, limit, startat, count ){
        if (!startat) startat = 0;
        if (!limit) limit = 100;
        if (!sortOrd) sortOrd = 'DESC';
        if (!sortBy) sortBy = '1';
        if (!values) values = false;
        if (!count) count = false
        key = (!key) ? false : key.toString();
        if (isNaN(parseInt(sortBy))){
            sortBy = "`"+sqlParams['table']+"`.`"+sortBy+"`";
        }
        var preSql = (count) ? sqlParams['count'] : sqlParams['select'];
        var postSql = "ORDER BY "+sortBy+" "+sortOrd+" LIMIT "+startat+","+limit;
        var sql = "";
        if (typeof(values) == "object" && !(values instanceof Array)){
            var where = "";
            for ( var i in values ) {
                value = values[i].toString().replaceAll("'","''");
                where += (where.length > 0) ? " AND " : "";
                where += "`" + sqlParams['table'] + "`.`" + i + "` LIKE '" + value + "'";
            }
            sql = preSql + " WHERE " + where + " " + postSql;            
        } else {
            sql = preSql + " " + postSql;
        }
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.delete = function( cb, id ){
        id = id.toString().replaceAll("'","''");
        sql = sqlParams["delete"] + "'"+id+"'";
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.deleteKey = function( cb, key, id ){
        id = id.toString().replaceAll("'","''");
        sql = "DELETE FROM "+sqlParams["table"] + " WHERE `"+key+"` = '"+id+"'";
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.update = function( cb, id, values){
        valueStr = getValueStr(values);
        if ( id ) {
            id = id.toString().replaceAll("'","''");
            sql = sqlParams['update']+valueStr+" WHERE `"+pkey+"`='"+id+"'";
        } else {
            sql = sqlParams['update']+valueStr;
        }
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.insert = function( cb, values ){
        valueStr = getValueStr(values);

        sql = sqlParams['insert']+valueStr;
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    this.updateOrInsert = function( cb, values ){
        valueStr = getValueStr(values);

        sql = sqlParams['insert']+valueStr+" ON DUPLICATE KEY UPDATE `"+pkey+"`='"+values[pkey].toString().replaceAll("'","''")+"'";
        connection.query( { sql: sql, nestTables: '_' }, cb );
    }
    //note the return from this is really nice. Contains lots of info, such as "insertId", which is the id of the data just inserted.
    constructor( table, key, joins);
}

