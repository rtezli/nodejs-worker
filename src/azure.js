var fs = require('fs');
var Blob = require('./blob.js');
var Table = require('./table.js');
var Queue = require('./queue.js');

var content = fs.readFileSync('src/config.json', {'encoding' : 'utf8'});
var conf = JSON.parse(content);

module.exports = new AzureWrapper(conf);

function AzureWrapper(config)
{ 
	var _config = conf;
    if(config){
        _config = config;
    }

    this.table = function(tableName){
        
        var _table;
        if(!_table){
            _table = new Table(tableName, _config);        
        }
        return _table;
    };

    this.blob = function(containerName){

        var _blob;
        if(!_blob){
            _blob = new Blob(containerName, _config);
        }
        return _blob;
    };   

    this.queue = function(queueName){    
        
        var _queue;
        if(!_queue){
            _queue = new Queue(queueName, _config);
        }
        return _queue;
    };
}
