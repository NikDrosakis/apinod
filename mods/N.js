/*
* maria API N 
produces chunks of counters instead of php Count 
chunk from client 

		//use s.api.mo.count 
unused from maria
	sql.mes="SELECT COUNT(CASE WHEN (fromid="+uid+" AND status_from=1 AND read_from=0) OR (toid="+uid+" AND status_to=1 AND read_to=0) THEN 1 END) AS c_mes_inbox,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=1) OR (toid="+uid+" AND status_to=1) THEN 1 END) AS c_mes_inbox_all,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=1 AND read_from=0) OR (toid="+uid+" AND status_to=1 AND read_to=0) AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) THEN 1 END) AS n_mes_inbox,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=0 AND read_from=0) OR (toid="+uid+" AND status_to=0 AND read_to=0) THEN 1 END) AS c_mes_deleted,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=0) OR (toid="+uid+" AND status_to=0) THEN 1 END) AS c_mes_deleted_all,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=2 AND read_from=0) OR (toid="+uid+" AND status_to=2 AND read_to=0) THEN 1 END) AS c_mes_favorite,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=2) OR (toid="+uid+" AND status_to=2) THEN 1 END) AS c_mes_favorite_all,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=3 AND read_from=0) OR (toid="+uid+" AND status_to=3 AND read_to=0) THEN 1 END) AS c_mes_sent,\
        COUNT(CASE WHEN (fromid="+uid+" AND status_from=3) OR (toid="+uid+" AND status_to=3) THEN 1 END) AS c_mes_sent_all,\
        COUNT(CASE WHEN (toid="+uid+" AND status_to IN(1,2,3)) OR (fromid="+uid+" AND status_from IN(1,2,3)) THEN 1 END) AS c_mes_all,\
        COUNT(CASE WHEN (fromid="+uid+" AND read_from=0 AND status_from IN(1,2,3)) OR (toid="+uid+" AND read_to=0 AND status_to IN(1,2,3)) THEN 1 END) AS c_mes_uall FROM mes_topic";

		        COUNT(CASE WHEN (propeoimes.sender="+uid+" AND propeoimes.unreads=0) OR (propeoimes.receiver="+uid+" AND propeoimes.unreadr=0) THEN 1 END) AS c_propunread\
		LEFT JOIN propeoimes ON propeoi.cid=propeoimes.cid",

ADD TO CAFF

      //ADD THOSE  $sel['accepted_taken'] = $sel['accepted_taken'] + $sel['releasedSP'];
//        $sel['takes_left'] = (int)$sel['take_limit'] - (int)$sel['taken'] - (int)$sel['accepted_taken'];
        //$sel['accounts_left'] = $sel['total_limit'] - ($sel['managedSP'] + $sel['released'] + $sel['renew']);
        //$sel['total_takes_left'] = $sel['takes_left'] > $sel['accounts_left'] ? $sel['accounts_left'] : ($sel['accounts_left'] > $sel['taken'] ? $sel['takes_left'] : 0);
        //$sel['accounts_registration'] = $sel['accounts_left'] - (int)$sel['taken'];
* */
const mariadb = require('mariadb');
const mongo=require('mongodb');
const g=require("../spd");
//const config=require("/var/www/"+process.argv[3]+".json");
const config=require("../config.json");

module.exports = function(s){
var options={};
let chatapps=['1','2','3','4','5'];
var mes={c_support_closed:0,c_support_sent:0,n_support_closed:0,n_support_sent:0,c_mes:0,c_mes_deleted:0,c_mes_inbox:0,c_mes_favorite:0,c_mes_sent:0,n_mes:0,n_mes_deleted:0,n_mes_inbox:0,n_mes_favorite:0,n_mes_sent:0,c_mes_chat1:0,c_mes_chat2:0,c_mes_chat3:0,c_mes_chat4:0,c_mes_chat5:0};
let action = "N";	
var uid=parseInt(s.q.uid);
var grp=parseInt(s.q.grp);
var receivedeoiF=!s.q.hasOwnProperty(receivedeoiF) ? 0 : s.q.receivedeoiF;	
var liste=['cont','eoi','inter','offereoi','propeoi','loaneoi','afer','propowner'];
liste=s.q.method=='set' ? liste : s.q.liste;
var received_eoi_filter_select = ['3','6'].includes(receivedeoiF) ? "AND cv.cert_id!=0" : '';
var interviewedQ = grp==2 ? "inter.status IN (5,6,7,8)" : "inter.status IN (5,6,7) OR (inter.status=8 AND inter.start >=UNIX_TIMESTAMP(CURDATE()))";
var confirmedQ = grp==2 ? "inter.status=8" : "inter.status=8 AND DATE(FROM_UNIXTIME(inter.start)) >= DATE(NOW())";
var who='uid'+grp;
var time = Math.floor(Date.now() / 1000);		
var sql={
cont:"SELECT COUNT(CASE WHEN sender = 2 AND source=2 THEN 1 END) AS cont_requests, \
COUNT(CASE WHEN status"+grp+"='0' THEN 1 END) AS c_cont_deleted, \
COUNT(CASE WHEN status"+grp+"='1' THEN 1 END) AS c_cont_accepted, \
COUNT(CASE WHEN status"+grp+"='2' THEN 1 END) AS c_cont_favorite, \
COUNT(CASE WHEN status"+grp+"='3' THEN 1 END) AS c_cont_network, \
COUNT(CASE WHEN status"+grp+"='4' AND source=2 THEN 1 END) AS c_cont_sent, \
COUNT(CASE WHEN status"+grp+"='5' AND source=2 THEN 1 END) AS c_cont_received, \
COUNT(CASE WHEN status"+grp+"='0' AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) THEN 1 END) AS n_cont_deleted, \
COUNT(CASE WHEN status"+grp+"='1' AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) THEN 1 END) AS n_cont_accepted, \
COUNT(CASE WHEN status"+grp+"='2' AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) THEN 1 END) AS n_cont_favorite, \
COUNT(CASE WHEN status"+grp+"='3' AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) THEN 1 END) AS n_cont_network, \
COUNT(CASE WHEN status"+grp+"='4' AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) AND source=2 THEN 1 END) AS n_cont_sent, \
COUNT(CASE WHEN status"+grp+"='5' AND DATE(FROM_UNIXTIME(created))=DATE(NOW()) AND source=2 THEN 1 END) AS n_cont_received \
FROM cont WHERE uid"+grp+"="+uid,
eoi:"SELECT COUNT(CASE WHEN eoi.sender=2 THEN 1 END) AS total_eoi,\
COUNT(CASE WHEN eoi.status"+grp+" IN(3,4) THEN 1 END) AS c_eoi_acceptedfav,\
COUNT(CASE WHEN eoi.status"+grp+" =4 THEN 1 END) AS c_eoi_favorite,\
COUNT(CASE WHEN eoi.status"+grp+" =3 THEN 1 END) AS c_eoi_accepted,\
COUNT(CASE WHEN eoi.status"+grp+" =2 "+received_eoi_filter_select+" AND (post.status=2 OR (post.status=1 AND post.activated!=0)) AND cv.status=2 THEN 1 END) AS c_eoi_received,\
COUNT(CASE WHEN eoi.status"+grp+" = 1 AND (post.status=2 OR (post.status=1 AND post.activated!=0)) AND cv.status=2 THEN 1 END) AS c_eoi_sent,\
COUNT(CASE WHEN eoi.status"+grp+" = '0' THEN 1 END) AS c_eoi_deleted,\
COUNT(CASE WHEN eoi.status"+grp+" IN('3','4') AND DATE(FROM_UNIXTIME(eoi.accepted))=DATE(NOW()) THEN 1 END) AS n_eoi_acceptedfav,\
COUNT(CASE WHEN eoi.status"+grp+"=4 AND DATE(FROM_UNIXTIME(eoi.accepted))=DATE(NOW()) THEN 1 END) AS n_eoi_favorite,\
COUNT(CASE WHEN eoi.status"+grp+"=3 AND DATE(FROM_UNIXTIME(eoi.accepted))=DATE(NOW()) THEN 1 END) AS n_eoi_accepted,\
COUNT(CASE WHEN eoi.status"+grp+"=2 "+received_eoi_filter_select+" AND DATE(FROM_UNIXTIME(eoi.created))=DATE(NOW()) AND (post.status=2 OR (post.status=1 AND post.activated!=0)) AND cv.status=2 THEN 1 END) AS n_eoi_received,\
COUNT(CASE WHEN eoi.status"+grp+"=1 AND DATE(FROM_UNIXTIME(eoi.created))=DATE(NOW()) AND (post.status=2 OR (post.status=1 AND post.activated!=0)) AND cv.status=2 THEN 1 END) AS n_eoi_sent,\
COUNT(CASE WHEN eoi.status"+grp+" =0 AND DATE(FROM_UNIXTIME(eoi.modified"+grp+"))=DATE(NOW()) THEN 1 END) AS n_eoi_deleted \
FROM eoi JOIN cv ON eoi.cv=cv.id JOIN post ON eoi.post=post.id WHERE eoi.uid"+grp+"="+uid,			
inter:"SELECT COUNT(DISTINCT(CASE WHEN inter.status IN (5,6,7,8,11) THEN 1 END)) AS inter_total,\
COUNT(DISTINCT(CASE WHEN "+interviewedQ+" THEN 1 END)) AS c_inter,\
COUNT(DISTINCT(CASE WHEN "+interviewedQ+" AND DATE(FROM_UNIXTIME(inter.modified)) = DATE(NOW()) THEN 1 END)) AS n_inter,\
COUNT(DISTINCT(CASE WHEN inter.status=2 THEN 1 END)) AS icviewed,\
COUNT(DISTINCT(CASE WHEN inter.status=3 AND cont.status"+grp+" IN(1,2,3) THEN 1 END)) AS ishortlisted,\
COUNT(DISTINCT(CASE WHEN inter.status=3 AND cont.status"+grp+" IN(1,2,3) AND DATE(FROM_UNIXTIME(inter.modified)) = DATE(NOW()) THEN 1 END)) AS nishortlisted,\
COUNT(DISTINCT(CASE WHEN inter.status=4 AND cont.status"+grp+" IN(1,2,3) THEN 1 END)) AS ifinalisted,\
COUNT(DISTINCT(CASE WHEN inter.status=4 AND cont.status"+grp+" IN(1,2,3) AND DATE(FROM_UNIXTIME(inter.modified)) = DATE(NOW()) THEN 1 END)) AS nifinalisted,\
COUNT(DISTINCT(CASE WHEN inter.status=5 THEN 1 END)) AS irequested,\
COUNT(DISTINCT(CASE WHEN inter.status IN(5,6,7) THEN 1 END)) AS ireqres,\
COUNT(DISTINCT(CASE WHEN inter.status=6 THEN 1 END)) AS iaskreschedule,\
COUNT(DISTINCT(CASE WHEN inter.status=7 THEN 1 END)) AS irescheduled,\
COUNT(DISTINCT(CASE WHEN "+confirmedQ+" AND cont.status"+grp+" IN(1,2,3) THEN 1 END)) AS iconfirmed,\
COUNT(DISTINCT(CASE WHEN inter.status IN(9,10) AND inter.modified > "+time+" - 1209600 THEN 1 END)) AS icancelled2,\
COUNT(DISTINCT(CASE WHEN inter.status=11 THEN 1 END)) AS icompleted,\
COUNT(DISTINCT(CASE WHEN inter.status=11 AND DATE(FROM_UNIXTIME(inter.modified)) = DATE(NOW()) THEN 1 END)) AS nicompleted,\
COUNT(DISTINCT(CASE WHEN inter.status=11 AND inter.type=1 AND inter.ended!=0 THEN 1 END)) AS icompleted_online,\
COUNT(CASE WHEN inter.status=11 AND eoi.status2!=0 AND cont.rank2 >=50 AND inter.eoi_id!=0 THEN 1 END) AS ihotlist,\
COUNT(DISTINCT(CASE WHEN inter.status=8 AND inter.end < "+time+" - 86400 AND cont.status"+grp+" IN(1,2,3) THEN 1 END)) AS iupdaterecords,\
COUNT(DISTINCT(CASE WHEN inter.status=8 AND DATE(FROM_UNIXTIME(inter.start)) = DATE(NOW()) THEN 1 END)) AS itoday,\
COUNT(CASE WHEN eoi.status2!=0 AND inter.status=11 AND cont.rank2 >=50 AND inter.eoi_id!=0 AND (DATE(FROM_UNIXTIME(cont.modified2)) = DATE(NOW()) OR DATE(FROM_UNIXTIME(inter.modified)) = DATE(NOW())) THEN 1 END) AS nihotlist \
FROM inter LEFT JOIN cont ON inter.cid=cont.id LEFT JOIN eoi ON cont.id=eoi.cid WHERE cont."+who+"="+uid,
offereoi:"SELECT COUNT(CASE WHEN offereoi.uid="+uid+" THEN 1 END) AS c_myoffers,\
COUNT(CASE WHEN offereoi.uid="+uid+" AND offereoi.status=1 THEN 1 END) AS c_myreceived,\
COUNT(CASE WHEN offereoi.uid="+uid+" AND offereoi.status=2 THEN 1 END) AS c_myaccepted,\
COUNT(CASE WHEN offereoi.uid0="+uid+" THEN 1 END) AS c_offerapps,\
COUNT(CASE WHEN offereoi.uid0="+uid+" AND offereoi.status=1 THEN 1 END) AS c_appsent,\
COUNT(CASE WHEN offereoi.uid0="+uid+" AND offereoi.status=2 THEN 1 END) AS c_appaccepted,\
COUNT(CASE WHEN offereoi.uid="+uid+" AND offereoi.grp=2 THEN 1 END) AS c_offercompany,\
COUNT(CASE WHEN offereoi.uid="+uid+" AND offereoi.grp=1 THEN 1 END) AS c_offerperson,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.inter=1 AND offereoi.intersender="+uid+" THEN 1 END) AS c_interrequestedbyme,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.inter=1 AND offereoi.intersender!="+uid+" THEN 1 END) AS c_interrequested,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.inter=2 THEN 1 END) AS c_interconfirmed,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.inter=4 THEN 1 END) AS c_intercompleted,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.inter=2 AND DATE(FROM_UNIXTIME(offereoi.intersend)) = DATE(NOW()) THEN 1 END) AS c_intertoday,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.inter=3 THEN 1 END) AS c_intercancel,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.place=1 THEN 1 END) AS c_place1,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.place=2 THEN 1 END) AS c_place2,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offereoi.place=3 THEN 1 END) AS c_place3,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offer.prod=1 THEN 1 END) AS c_B2B,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offer.prod=2 THEN 1 END) AS c_B2C,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offer.prod=3 THEN 1 END) AS c_B4S,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offer.prod=4 THEN 1 END) AS c_upskill,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offer.prod=5 THEN 1 END) AS c_hotels,\
COUNT(CASE WHEN (offereoi.uid0="+uid+" OR offereoi.uid="+uid+") AND offer.prod=6 THEN 1 END) AS c_bars \
FROM offereoi LEFT JOIN offer ON offereoi.offerid=offer.id",
propeoi:"SELECT COUNT(CASE WHEN propeoi.uid="+uid+" AND prop.type=1 THEN 1 END) AS c_myprops1,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND propeoi.status=1 AND prop.type in(3,4) THEN 1 END) AS c_agentsent,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.status=1 AND prop.type in(3,4) THEN 1 END) AS c_agentreceived,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.status=2 AND prop.type in(3,4) THEN 1 END) AS c_agentaccepted,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND prop.type in(3,4) THEN 1 END) AS c_agent,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.status=1 AND prop.type=1 THEN 1 END) AS c_propmyreceived1,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.status=2 AND prop.type=1 THEN 1 END) AS c_propmyaccepted1,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND prop.type=1 THEN 1 END) AS c_propapps1,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND propeoi.status=1 AND prop.type=1 THEN 1 END) AS c_propappsent1,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND propeoi.status=2 AND prop.type=1 THEN 1 END) AS c_propappaccepted1,		\
COUNT(CASE WHEN propeoi.uid="+uid+" AND prop.type=2 THEN 1 END) AS c_myprops2,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.status=1 AND prop.type=2 THEN 1 END) AS c_propmyreceived2,        \
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.status=2 AND prop.type=2 THEN 1 END) AS c_propmyaccepted2,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND prop.type=2 THEN 1 END) AS c_propapps2,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND propeoi.status=1 AND prop.type=2 THEN 1 END) AS c_propappsent2,\
COUNT(CASE WHEN propeoi.uid0="+uid+" AND propeoi.status=2 AND prop.type=2 THEN 1 END) AS c_propappaccepted2,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.grp=2 THEN 1 END) AS c_propcompany,\
COUNT(CASE WHEN propeoi.uid="+uid+" AND propeoi.grp=1 THEN 1 END) AS c_propperson,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.inter=1  AND propeoi.intersender="+uid+" THEN 1 END) AS c_propinterrequestedbyme,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.inter=1  AND propeoi.intersender!="+uid+" THEN 1 END) AS c_propinterrequested,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.inter=3 THEN 1 END) AS c_propintercancel,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.inter=4 THEN 1 END) AS c_propintercompleted,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.inter=2 THEN 1 END) AS c_propinterconfirmed,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.place=1 THEN 1 END) AS c_propplace1,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.place=2 THEN 1 END) AS c_propplace2,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND propeoi.place=3 THEN 1 END) AS c_propplace3,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND prop.type=1 THEN 1 END) AS c_proptype1,\
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND prop.type=2 THEN 1 END) AS c_proptype2, \
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND prop.type=3 THEN 1 END) AS c_proptype3, \
COUNT(CASE WHEN (propeoi.uid0="+uid+" OR propeoi.uid="+uid+") AND prop.type=4 THEN 1 END) AS c_proptype4 \
FROM propeoi LEFT JOIN prop ON propeoi.propid=prop.id",
loaneoi:"SELECT COUNT(CASE WHEN loaneoi.uid="+uid+" THEN 1 END) AS c_myloans,\
COUNT(CASE WHEN loaneoi.uid="+uid+" AND loaneoi.status=1 THEN 1 END) AS c_myloanreceived,\
COUNT(CASE WHEN loaneoi.uid="+uid+" AND loaneoi.status=2 THEN 1 END) AS c_myloanaccepted,\
COUNT(CASE WHEN loaneoi.uid0="+uid+" THEN 1 END) AS c_loanapps,\
COUNT(CASE WHEN loaneoi.uid0="+uid+" AND loaneoi.status=1 THEN 1 END) AS c_loanappsent,\
COUNT(CASE WHEN loaneoi.uid0="+uid+" AND loaneoi.status=2 THEN 1 END) AS c_loanappaccepted,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.inter=1 AND loaneoi.intersender="+uid+" THEN 1 END) AS c_interrequestedbymeloan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.inter=1 AND loaneoi.intersender!="+uid+" THEN 1 END) AS c_interrequestedloan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.inter=2 THEN 1 END) AS c_interconfirmedloan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.inter=4 THEN 1 END) AS c_intercompletedloan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.inter=2 AND DATE(FROM_UNIXTIME(loaneoi.intersend)) = DATE(NOW()) THEN 1 END) AS c_intertodayloan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.inter=3 THEN 1 END) AS c_intercancelloan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.place=1 THEN 1 END) AS c_place1loan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.place=2 THEN 1 END) AS c_place2loan,\
COUNT(CASE WHEN (loaneoi.uid0="+uid+" OR loaneoi.uid="+uid+") AND loaneoi.place=3 THEN 1 END) AS c_place3loan \
FROM loaneoi LEFT JOIN loan ON loaneoi.loanid=loan.id",
afer:"SELECT \
COUNT(CASE WHEN afer.uid0="+uid+" AND afer.inter=1 AND afer.intersender!="+uid+" THEN 1 END) AS c_interrequestedafer,\
COUNT(CASE WHEN afer.uid0="+uid+" AND afer.inter=2 THEN 1 END) AS c_interconfirmedafer,\
COUNT(CASE WHEN afer.uid0="+uid+" AND afer.inter=4 THEN 1 END) AS c_intercompletedafer,\
COUNT(CASE WHEN afer.uid0="+uid+" AND afer.inter=2 AND DATE(FROM_UNIXTIME(afer.intersend)) = DATE(NOW()) THEN 1 END) AS c_intertodayafer,\
COUNT(CASE WHEN afer.uid0="+uid+" AND afer.inter=3 THEN 1 END) AS c_intercancelafer \
FROM afer",
propowner:"SELECT COUNT(*) as c_propowner FROM propowner"
};		
if(!grp){ console.log("MISSING N PARAMS!");options[action]= {};}else{
var pool = mariadb.createPool({host: '127.0.0.1',user:config.mariauser,password: config.mariapass,database:config.maria,waitForConnections:true,connectionLimit:5,queueLimit:1,multipleStatements:true,supportBigNumbers: true, bigNumberStrings: true});
//pool.on('acquire', function (connection) {console.log('Connection %d acquired', connection.threadId);});
//pool.on('release', function (connection) {console.log('Connection %d released', connection.threadId);});

var callmaria = async function(liste){	
	  let conn;try {
		if(liste[0]!='mes' || s.q.method=='set'){
		conn = await pool.getConnection();
		var response={};		
		for(var i in liste){
		response[liste[i]] = await conn.query(sql[liste[i]]);
		}
		}
		return response;
	  }catch(err){throw err;}finally{if (conn) conn.end();}	
}
var callmongo= async function(){
	var MongoClient= mongo.MongoClient,
	url=config.mongoconnect;	
	let client;	
	try {
	client = await MongoClient.connect(url);
    var db = client.db();    
	let find=g.mogetparams(s.q,mongo);
	var response ={};
	response["message"] = await db.collection("message").find({$or:[{from:uid},{to:uid}]}).toArray();		
	response["support"] = await db.collection("tkt").find({uid:uid}).toArray();		
	for(var i in chatapps){
	response["chat"+chatapps[i]] = await db.collection("chat"+chatapps[i]).find({$or:[{uid:uid},{uid0:uid}]}).toArray();		
	}	
	//client.close();
    return response;
	} catch (err) {
        (client) && client.close();
      //  console.log(err);
        throw err
    }
}
options[action]= function (callback) {
	callmaria(liste).then(ma=>{		
	callmongo().then(m=>{
		//message		
		var mo=m.message,		
		stat={'0':'c_mes_deleted','1':'c_mes_inbox','2':'c_mes_favorite','3':'c_mes_sent'},
		nstat={'0':'n_mes_deleted','1':'n_mes_inbox','2':'n_mes_favorite','3':'n_mes_sent'};
		if(mo.length>0){for(var i in mo){		
		if(mo[i].from==uid){
		mes[stat[mo[i].statusfrom]]+=1;				
		mes[nstat[mo[i].statusfrom]]+=mo[i].unreadfrom;
		mes['c_mes']+=1;
		mes['n_mes']+=mo[i].unreadfrom;
		}else if(mo[i].to==uid){
		mes[stat[mo[i].statusto]]+=1;
		mes[nstat[mo[i].statusto]]+=mo[i].unreadto;
		mes['c_mes']+=1;
		mes['n_mes']+=mo[i].unreadto;
		}}};	
		//chat			
		for(var i in chatapps){
		var cha=m['chat'+chatapps[i]];	
		if(cha.length>0){for(var j in cha){if(cha[j].uid==uid){mes['c_mes_chat'+chatapps[i]]+=cha[j].unread;}else{mes['c_mes_chat'+i]+=cha[j].unread0;}}};
		}
		//support
		var sup=m.support;
		if(sup.length>0){for(var j in sup){
			if(sup[j].status==1){	
			if(sup[j].read1==0){mes['n_support_sent']+=1;}
			mes['c_support_sent']+=1;
			}else{
			if(sup[j].read1==0){mes['n_support_closed']+=1;}
			mes['c_support_closed']+=1;
		}}}
	//	console.log(mes)
		var joinedobj=Object.assign(ma,{mes:[mes]});
		callback(joinedobj);			
	}).catch(err => callback(err));			
	}).catch(err2 => callback(err2));		
}

}
return options;
}