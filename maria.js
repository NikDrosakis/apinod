/*
* mysql API
* update TO GQL ????
* FIELDS{}
* JOINS {} => need internal mysql schema
* WHERE {}

show eg TABLES, COLUMNS FROM mytable

methods 
-show : SHOW 
-get	: SELECT 
-getOne :
-set	: update
-ins : insert into 
- count :  count.js for Count class

s.api.ma.getOne("ur.firstname,ur.lastname,post.summary 
"from ur" 
join post on post.uid=ur.uid
 ie ur=post 
reduce to s.api.ma.getOne("ur.firstname,ur.lastname,post.summary")

* */
const mariadb = require('mariadb'); //version 2.5.2
const g=require("./spd");
//const config=require("/var/www/"+process.argv[3]+".json");
const config=require("./config.json");

module.exports = function(params){	
	let action = params.col;			
    var options={};
	//var sql=(["getOne","get"].includes(params.col) ? "select " : params.col+" ")+params.q;
	var sql="SELECT * FROM "+ params.col+" WHERE "+params.key+"=?";
	//var prm=params.hasOwnProperty('prm') ? params.prm : [];
	
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'nikosd',
	password: "UpvMy",
	database: config.maria,
	waitForConnections: true,		
	connectionLimit: 1,
	queueLimit: 0,
	multipleStatements: true
});
//pool.on('acquire', function (connection) {
//console.log('Connection %d acquired', connection.threadId);
//});
//pool.on('release', function (connection) {
//console.log('Connection %d released', connection.threadId);
///});
//	console.log("Total connections: ", pool.totalConnections());
//console.log("Active connections: ", pool.activeConnections());
//console.log("Idle connections: ", pool.idleConnections());
const call = async function() {
	  let conn;
	  try {
		conn = await pool.getConnection();
	//	if(action=="insert into"){
		//add obj key:value of inserts as SPD ins()
	//	const reponse = await conn.query("INSERT INTO myTable (?, ?)", [1, "mariadb"]);	
	//	}else{		
		const response = await conn.query(sql,params.id)		
			conn.release()
	//	}	
		return response;
	  } catch (err) {
		throw err;
	  } finally {
		if(conn){conn.release();}
	//	conn.destroy();
	//	conn.end();

	  }
}
options[action]= function (callback) {		
		call().then(result => callback(result)).catch(err => callback(err));
}



return options;
};

