var express = require("express");
var app = express();
const config=require("./config.json");
app.listen(config.httpport, () => {
 console.log("Server running on port "+config.httpport);
});
const cors = require('cors');
// Count the machine's CPUs
const fs = require("fs"),g= require("./spd"),util= require("util"),{promisify} = require("util"),{ exec } = require("child_process"),https = require('https'),path = require('path'),compression = require('compression'),bodyParser = require("body-parser"),
cookieParser = require('cookie-parser');
app.use(express.static("public"));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '300mb', extended: true}));

app.use(cors({credentials: true, origin: config.whitelist}));
//console.log(process.env.npm_package_version)
//A GET METHODS	
app.get('/:type/:col/:key/:id', async (req,res,next) =>{ 	//auth(req,res);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,POST, OPTIONS');
  res.header('Transfer-Encoding', 'chunked');
    res.header('Access-Control-Allow-Origin',req.get('origin')); 
    res.header("Access-Control-Allow-Credentials", true);
    var bin="nikos13".toString()
    var authorization= new Buffer.from(bin).toString('base64');
    res.header("Authorization","Basic "+authorization);    
	var type = req.params.type || '';    
    var col = req.params.col || '';
	console.log("GET -"+req.url);
    switch(type){
        case "ma":
         //   req.params.q=req.query.q;
        //    req.params.prm=JSON.parse(req.query.prm);		
            var ma = require('./maria')(req.params);
            ma[col](function(data){	
                data=data==""?"NO":(col=="getOne" ? data[0]:data);
                    //console.warn(data)
                res.status(200).json(data);res.end();
                })
        break;
        }	
    });
    //B  POST METHODS
app.use(bodyParser.json({limit: '300mb'}));
app.post('/:type', async (req, res) => {
	var type = req.params.type || '';
		console.log("crossdomain");
		console.log(req.cookies);
		console.log("POST -"+req.url);
		res.status(200).send(req.cookies);
			res.end();			
})
app.post('/:type/:col', async (req, res) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Content-Type','application/x-www-form-urlencoded');
	res.header('Transfer-Encoding', 'chunked');
	res.header('Access-Control-Allow-Methods', 'GET,POST, OPTIONS');	
	res.header('Access-Control-Allow-Origin',req.get('origin') ); 
	res.header("Access-Control-Allow-Credentials", true);
	var bin=(req.cookies['sid']+req.cookies['sp']).toString()
    var authorization= new Buffer.from(bin).toString('base64');
    res.header("Authorization","Basic "+authorization);
    var type = req.params.type || '';
    var col = req.params.col || '';	
	console.log("POST -"+req.url);
// MONGO POST API ins insMany del set upsert delMany upMany fup 
  switch(type){  
  //MARIA POST API
    case 'ma':	
			if(col=="N" || col=="my"){		//chunks are get from mye/Ne
			req.params.q=JSON.parse(req.body.q) //chunk,uid,membership (my)						
			req.params.q.choice=col;			
			var uid=parseInt(req.params.q.uid);				
				var grp=parseInt(req.params.q.grp);				
			if(uid!=null && grp!=0){
			var ma = require('./mods/'+col)(req.params);			
			ma[col](function(mad){	
			if(Object.keys(mad).length===0){ 
			res.status(200).json("NO");res.end();
			}else{
			var mad2={};			
			if(col=='my'){			
			for(var i in mad){					
					if(["user","agentdata","caff","packdetails","aff","mship","affee","pack"].includes(i)){						
						mad2[i]=mad[i][0];						
			if(i=="caff"){
				//		console.log(mad[i]);
						mad2.caff.managedSP=parseInt(mad2.caff.managedSP);
						mad2.caff.released=parseInt(mad2.caff.released);
						mad2.caff.releasedSP=parseInt(mad2.caff.releasedSP);
						mad2.caff.acceptedSP=parseInt(mad2.caff.acceptedSP);
						mad2.caff.renew=!mad2.caff.renew ? 0 : parseInt(mad2.caff.renew);
						mad2.caff.taken=parseInt(mad2.caff.taken);
						mad2.caff.active=parseInt(mad2.caff.active);
						mad2.caff.inactive=parseInt(mad2.caff.inactive);
						mad2.caff.rejected=parseInt(mad2.caff.rejected);						
						mad2.caff.accepted_taken=parseInt(mad2.caff.accepted_taken)+mad2.caff.releasedSP;
						mad2.caff.takes_left=mad2.caff.take_limit - mad2.caff.taken - mad2.caff.accepted_taken;
						mad2.caff.accounts_left=parseInt(mad2.caff.total_limit) - (mad2.caff.managedSP + mad2.caff.released + mad2.caff.renew);
						mad2.caff.total_takes_left=mad2.caff.takes_left > mad2.caff.accounts_left ? mad2.caff.accounts_left :(mad2.caff.accounts_left > mad2.caff.taken ? mad2.caff.takes_left:0);
						mad2.caff.accounts_registration=mad2.caff.accounts_left - mad2.caff.taken;
					}
					}else{
					mad2[i]=mad[i];
					}
					}
			}else if(col=="N"){
				
				for(var i in mad){					
					mad2[i]=mad[i][0];
					for(var j in mad2[i]){
					mad2[j]=parseInt(mad2[i][j]);
					}delete(mad2[i]);
				}			
			mad2.uid=uid;
			//	fs.writeFileSync(path.resolve(__dirname, 'test/'+col+uid+'.json'), JSON.stringify(mad2, null, 4));
			}
		//saves to redis Object.keys(obj).length		

			if(Object.keys(mad2).length>0){
	
            }else{ res.status(200).json("NO");res.end(); }
			}
			})
			}
		}else{		
		req.params.q=req.body.q;
		req.params.prm=req.body.prm;				
		var mon = require('./maria')(req.params);
        mon[col](function(data){
			var r=data.affectedRows==1 ?"OK":"NO";
			res.status(200).json(r);res.end();
			})
		}
	break;	
// REDIS POST API set string & Object METHODS: set rpush del
    }
});
