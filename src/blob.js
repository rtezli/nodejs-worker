var azure = require('azure-storage');
var Promise = require('promise');

function Blob(containerName, config){

    var _containerName = containerName; 
    var _accountName = config.accounts[0].accountName;
    var _accountKey = config.accounts[0].accountKey;
    var _blob = azure.createBlobService(_accountName,_accountKey);

    _blob.createContainerIfNotExists(_containerName,
        function(error,result,response){
            if(error)
                console.log('Error creating blob access : ' + error);
    });         

    this.list = function(prefix){
        return new Promise(function(fullfill, reject){
            try{
                if(prefix){
                    _blob.listBlobsSegmented(_containerName, null, function(error, result){
                        if(!error){
                          return fullfill(result);
                        }           
                        else{
                            //console.log(error);
                            return reject(error);
                        }
                    });
                }
                else{
                    _blob.listBlobsSegmentedWithPrefix(_containerName, prefix, function(error, result){
                        if(!error){
                          return fullfill(result);
                        }           
                        else{
                            //console.log(error);
                            return reject(error);
                        }
                    }); 
                }
            }
            catch(err){
                reject(err);   
            }
        });
    };

     this.read = function(name){
        return new Promise(function(fullfill, reject){
            try{
                _blob.getBlobToText(_containerName, name, function(error, result){
                    if(!error){
                        //console.log('OK');
                        return fullfill(result);
                    }           
                    else{
                        //console.log(error);
                        return reject(error);
                    }
                });
            }
            catch(err){
                reject(err);   
            }
        });     
    };

    this.create = function(name, content){
        return new Promise(function(fullfill, reject){
            try{
                _blob.createBlockBlobFromText(_containerName, name, new Buffer(content), null, function(error, result, response){
                    if(!error){
                        //console.log('OK' + JSON.stringify(response));
                        return fullfill(response);
                    }           
                    else{
                        //console.log(error);
                        return reject(error);
                    }
                });
            }
            catch(err){
                reject(err);   
            }
        }); 
    };

    this.delete = function(name){
        return new Promise(function(fullfill, reject){
            try{
                _blob.deleteBlob(_containerName, name, function(error, result){
                    if(!error){
                        //console.log('OK');
                        return fullfill(result);
                    }           
                    else{
                        //console.log(error);
                        return reject(error);
                    }
                });
            }
            catch(err){
                reject(err);   
            }
        }); 
    };  
}

module.exports = Blob;   