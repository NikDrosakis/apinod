const g={
    i:function(val){return parseInt(val)},
    eval : function (action){	return eval(action);},	
    date(n,t){var e,r,o=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],u=/\\?(.?)/gi,i=function(n,t){return r[n]?r[n]():t},c=function(n,t){for(n=String(n);n.length<t;)n="0"+n;return n};return r={d:function(){return c(r.j(),2)},D:function(){return r.l().slice(0,3)},j:function(){return e.getDate()},l:function(){return o[r.w()]+"day"},N:function(){return r.w()||7},S:function(){var n=r.j(),t=n%10;return t<=3&&1==parseInt(n%100/10,10)&&(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return e.getDay()},z:function(){var n=new Date(r.Y(),r.n()-1,r.j()),t=new Date(r.Y(),0,1);return Math.round((n-t)/864e5)},W:function(){var n=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),t=new Date(n.getFullYear(),0,4);return c(1+Math.round((n-t)/864e5/7),2)},F:function(){return o[6+r.n()]},m:function(){return c(r.n(),2)},M:function(){return r.F().slice(0,3)},n:function(){return e.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){var n=r.Y();return n%4==0&n%100!=0|n%400==0},o:function(){var n=r.n(),t=r.W();return r.Y()+(12===n&&t<9?1:1===n&&t>9?-1:0)},Y:function(){return e.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return e.getHours()>11?"pm":"am"},A:function(){return r.a().toUpperCase()},B:function(){var n=3600*e.getUTCHours(),t=60*e.getUTCMinutes(),r=e.getUTCSeconds();return c(Math.floor((n+t+r+3600)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return e.getHours()},h:function(){return c(r.g(),2)},H:function(){return c(r.G(),2)},i:function(){return c(e.getMinutes(),2)},s:function(){return c(e.getSeconds(),2)},u:function(){return c(1e3*e.getMilliseconds(),6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)"},I:function(){return new Date(r.Y(),0)-Date.UTC(r.Y(),0)!=new Date(r.Y(),6)-Date.UTC(r.Y(),6)?1:0},O:function(){var n=e.getTimezoneOffset(),t=Math.abs(n);return(n>0?"-":"+")+c(100*Math.floor(t/60)+t%60,4)},P:function(){var n=r.O();return n.substr(0,3)+":"+n.substr(3,2)},T:function(){return"UTC"},Z:function(){return 60*-e.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(u,i)},r:function(){return"D, d M Y H:i:s O".replace(u,i)},U:function(){return e/1e3|0}},this.date=function(n,t){return e=void 0===t?new Date:t instanceof Date?new Date(t):new Date(1e3*t),n.replace(u,i)},this.date(n,t)},
    time(){return Math.floor(Date.now()/1e3)},
    date:function(n,t){var e,r,o=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],u=/\\?(.?)/gi,i=function(n,t){return r[n]?r[n]():t},c=function(n,t){for(n=String(n);n.length<t;)n="0"+n;return n};return r={d:function(){return c(r.j(),2)},D:function(){return r.l().slice(0,3)},j:function(){return e.getDate()},l:function(){return o[r.w()]+"day"},N:function(){return r.w()||7},S:function(){var n=r.j(),t=n%10;return t<=3&&1==parseInt(n%100/10,10)&&(t=0),["st","nd","rd"][t-1]||"th"},w:function(){return e.getDay()},z:function(){var n=new Date(r.Y(),r.n()-1,r.j()),t=new Date(r.Y(),0,1);return Math.round((n-t)/864e5)},W:function(){var n=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),t=new Date(n.getFullYear(),0,4);return c(1+Math.round((n-t)/864e5/7),2)},F:function(){return o[6+r.n()]},m:function(){return c(r.n(),2)},M:function(){return r.F().slice(0,3)},n:function(){return e.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){var n=r.Y();return n%4==0&n%100!=0|n%400==0},o:function(){var n=r.n(),t=r.W();return r.Y()+(12===n&&t<9?1:1===n&&t>9?-1:0)},Y:function(){return e.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return e.getHours()>11?"pm":"am"},A:function(){return r.a().toUpperCase()},B:function(){var n=3600*e.getUTCHours(),t=60*e.getUTCMinutes(),r=e.getUTCSeconds();return c(Math.floor((n+t+r+3600)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return e.getHours()},h:function(){return c(r.g(),2)},H:function(){return c(r.G(),2)},i:function(){return c(e.getMinutes(),2)},s:function(){return c(e.getSeconds(),2)},u:function(){return c(1e3*e.getMilliseconds(),6)},e:function(){throw"Not supported (see source code of date() for timezone on how to add support)"},I:function(){return new Date(r.Y(),0)-Date.UTC(r.Y(),0)!=new Date(r.Y(),6)-Date.UTC(r.Y(),6)?1:0},O:function(){var n=e.getTimezoneOffset(),t=Math.abs(n);return(n>0?"-":"+")+c(100*Math.floor(t/60)+t%60,4)},P:function(){var n=r.O();return n.substr(0,3)+":"+n.substr(3,2)},T:function(){return"T"},Z:function(){return 60*-e.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(u,i)},r:function(){return"D, d M Y H:i:s O".replace(u,i)},U:function(){return e/1e3|0}},this.date=function(n,t){return e=void 0===t?new Date:t instanceof Date?new Date(t):new Date(1e3*t),n.replace(u,i)},this.date(n,t)},
    isJson:(str)=> {
        try {var x=JSON.parse(str);return x;} catch (e) {return false;}
    },
    o:(v)=>{ try {JSON.parse(str);} catch (e) {return false;}return true;},
    i:(v)=>{return isNaN(parseInt(v)) ? v :parseInt(v);},
    inList:(needle, haystack, argStrict)=>{ //in_array
        var key = '',
            strict = !! argStrict;
        //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
        //in just one for, in order to improve the performance
        //deciding wich type of comparation will do before walk array
        if (strict) {
            for (key in haystack) {
                if (haystack[key] === needle) {
                    return true;
                }
            }
        } else {
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
        }
    
        return false;
    },	
    mogetparams:function(q,mongo){
        var params={};			
        for (var i in q) {					
        if(i=="_id"){
            params[i] =  new mongo.ObjectID(q[i]);            
        }else if(i=="find"){
            
            params[i] = JSON.parse(q[i])
        }else if(i=="$regex"){ 
    
            params[i] = g.regex(q[i]);
        }else if(i=="$or"){ 
        //s.api.mo.get('message',{$or:[{fromid:my.uid},{toid:my.uid}],page:1,limit:20})			                
            if(q[i].length>1){					
                var qi=[];
                for(var k in q[i]){
                    var y={};var vals2=q[i][k];																			
                    for(var l in vals2){							
                        y[l]=g.regex(g.i(vals2[l]))		
                    }			
                        qi.push(y)																		
                }						
                params[i]=qi;						
                //params[i]=qi;						
            }else{
            params[i]=isNaN(parseInt(q[i])) ? g.parseor(q[i]) : parseInt(q[i])				
            }				
        }else{							
        //most cases 	
            if(typeof q[i]=='object'){
                for(var n in q[i]){
                }
                params[i]=q[i];
            }else{
            params[i]=isNaN(q[i]) ? g.parseqi(q[i]) : parseInt(q[i]);							
        }				
        //special case parsed with g.parseqi(q[i])	
            //s.api.mo.get('message',{status:0,closed:{'$gt':1590019200,'$lt':1637884800}})				
        }						
        }			
        return params;
    },			
    parseor:function(qi){				
        var qi=qi,keys=Object.keys(qi);
        var vals=Object.values(qi);			
        if(Array.isArray(vals) && vals.length>1){ //parse $or					
            qi=vals.map(x=>{var y={};y[Object.keys(x)]=g.i(Object.values(x));return y})				
        }else{
            for(var n in vals){qi[keys[n]]= g.i(vals[n]);}							
        }						
        return qi;								
    },
    parseqi:function(qi){				
        var qi=qi,keys=Object.keys(qi);
        var vals=Object.values(qi);			
        for(var n in vals){qi[keys[n]]= g.i(vals[n]);}
        return qi;								
    },
    regex:(val)=>{return typeof val=="string" && val.charAt(val.length-1)==='*' ? new RegExp(val.substring(0, val.length - 1), 'i')  : val;},		
    isInt: function (n) {
        return n % 1 === 0;
    },		
    };
    module.exports = g;