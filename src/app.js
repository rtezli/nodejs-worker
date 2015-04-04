/*jshint -W054*/
var moment = require('moment');
var rx = require('rx');
var guid = require('guid');
var azure = require('./azure.js');

var delay = 0;
var interval = 10;
var jobQueue = azure.queue('testqueue');
var sourceBlob = azure.blob('sourcecontainer');
var logTable = azure.table('logtable');

var log = function(severity, message){ 
	logTable.create(
		moment().format('YYYY-MM-DD-hh'), 
		guid.Create(), 
		{ 
			"severity" : severity, 
			"message" : message
		}
	); 
};

var executeCommand = function(command){
	sourceBlob.read(command)
	.then(                
		function(source){
			var exec = new Function("azure", source);
			try{
				var result = exec(azure);
				console.log(result);
			}
			catch(err){
				console.log('ERROR', err);
			}
        },
        function(error){
 			log('ERROR', err);
      	}
    );
};

var executeChain = function(command){
	sourceBlob.read(command)
	.then(                
		function(chain){
			var input;
			for(var source in chain){
				var exec = new Function("azure", "input", source);
				try{
					innput = exec(azure, input);
					console.log('INFO', 'Executed commmand successfully : ' + command);
				}
				catch(err){
					console.log('ERROR', err);
				}
			}
        },
        function(error){
 			log('ERROR', err);
      	}
    );
};

rx.Observable.timer(
	delay*1000,
	interval*1000)
.timestamp().subscribe(
		function(timestamp){
			jobQueue.read()
			.then(
				function(result){					
					if(result === undefined){
						console.log('Queue is empty');
						return;
					}
					console.log('INFO', 'Executing commmand : ' + result);
					executeCommand(result);
		        },
		        function(error){
		 			console.log('ERROR', err);
		      	}
	   		);
		}
);