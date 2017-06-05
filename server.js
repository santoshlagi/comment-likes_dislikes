var http = require('http');
var fs = require('fs');
var formidable=require('formidable');
var mysql = require('mysql');
var express = require('express');
var app = express();
var theConnection = mysql.createConnection({
						host: "localhost",
						user: "root",
						password: "mrnd",
						database: "nodejs"
});
var display=require('./routes/display');
app.use('/',display);
app.post('',function(req,res){
    processAllFieldsOfTheForm(req, res);
});
var fs=require('fs');
function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        var k=Object.keys(fields);
        var u=JSON.stringify(fields["up"]);
        var d=JSON.stringify(fields["down"]);
        var x=JSON.stringify(fields["description"]);
        if(x.length!==2){
        theConnection.query("insert into com SET ?",
	       {comment:x,up:0,down:0},
        function(err, result){
     	if(err){
     		console.log(err);
     	}
     	console.log("Comment insert result: ", result);
       });
     }
    if(k.length==2){
     var s=k[1].slice(0,1);
     var g=Number(k[1].slice(1));
    console.log(g);
        if(s=="p"){
            theConnection.query("update com set up=up+1 where id=?",(g), function(err, result){
     	if(err){
     		console.log(err);
     	}
        });
        }
        else{
            theConnection.query("update com set down=down+1 where id=?",(g), function(err, result){
     	if(err){
     		console.log(err);
     	}
        });
        }
    }
    theConnection.query("select id,comment,up,down from com", function(err, result){
     	if(err){
     		console.log(err);
     	}
        console.log("Comment select result: ", result.length);
        fs.readFile('santosh.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        for(var i=0;i<result.length;i++){
            data+="<div class=\"col-xs-10\">"+result[i]["comment"]+"</div><div class=\"col-xs-2\"><button name=p"+result[i]["id"]+" class=\"btn btn-link btn-primary\"><span class=\"glyphicon glyphicon-thumbs-up\">"+result[i]["up"]+"</span></button><button name=n"+result[i]["id"]+" class=\"btn btn-link d btn-danger\"><span class=\"glyphicon glyphicon-thumbs-down col-xs-offset-2\">"+result[i]["down"]+"</span></button></div>";
        }
        data+="</form></div></body></html>";
        res.write(data);
        res.end();
        });
     });
    });
}
var server = app.listen(3001, function () {
    var port = server.address().port;
    console.log("Example app listening at port %s", port)
});