var azure = require('azure-storage');
var moment = require('moment');
var prom = require('promise');

function Table(tableName, config){

    var _tableName = tableName;
    var _accountName = config.accounts[0].accountName;
    var _accountKey = config.accounts[0].accountKey;
    var _table = azure.createTableService(_accountName,_accountKey);
    _table.createTableIfNotExists(_tableName, function(error, result){
        if(!error){

        }
        else{
            console.log('Error creating table access : ' + error);
        }
    });

    this.list = function(){
        return new Promise(function(fullfill, reject){
            var query = new azure.TableQuery();
            _table.queryEntities(_tableName, query, null, function(error,result){
                if(!error){
                    return fullfill(result);
                }           
                else{
                    return reject(error);
                }
            });
        });
    };
    
    this.list = function(partitionKey){
        return new Promise(function(fullfill, reject){
            var query = new azure.TableQuery()
                .where('PartitionKey eq ?', partitionKey);
            _table.queryEntities(table, query, null, function(error,result){
                if(!error){
                    return fullfill(result);
                }           
                else{
                    return reject(error);
                }
            });      
        });
    };

    this.create = function(partitionKey, rowKey, entity){
        return new Promise(function(fullfill, reject){
            if(!rowKey){
                rowKey = guid.create();
            }

            if(!partitionKey){
                partitionKey = moment().format('YYYY-MM-DD'); 
            }

            var task = {
               PartitionKey : {'_' : partitionKey},
               RowKey : {'_' : rowKey}
            };

            for(var obj in entity){
                task[obj] = { '_' : entity[obj]};
            }

            _table.insertEntity(_tableName, task, function(error, result, response){
                if(!error){

                    return fullfill(response);
                }           
                else{
                    return reject(error);
                }
            });
        });
    };
    
    this.read = function(partitionKey, rowKey){
        return new Promise(function(fullfill, reject){
            _table.retrieveEntity(_tableName, partitionKey, rowKey, function(error, result){
                if(!error){
                    delete result.PartitionKey;
                    delete result.RowKey;
                    delete result.Timestamp;
                    delete result.metadata;
                    var res;
                    for(var obj in result){
                        var value = result[obj]._;
                        result[obj] = value;
                    }
                    return fullfill(result);
                }           
                else{
                    return reject(error);
                }
            });      
        });
    };

    this.delete = function(partitionKey, rowKey){       
        return new Promise(function(fullfill, reject){
            var task = {
                PartitionKey : {'_' : partitionKey},
                RowKey : {'_' : rowKey}
            };

            _table.deleteEntity(_tableName, task, function(error, result){
                if(!error){
                    return fullfill(result);
                }           
                else{
                    return reject(error);
                }
            });
        });
    };
}

module.exports = Table;