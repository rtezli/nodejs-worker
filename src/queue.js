var azure = require('azure-storage');
var prom = require('promise');

function Queue(queueName, config){

    var _queueName = queueName;
    var _accountName = config.accounts[0].accountName;
    var _accountKey = config.accounts[0].accountKey;
    var _queue = azure.createQueueService(_accountName,_accountKey);
    
    _queue.createQueueIfNotExists(queueName, function(error, result){
        if(error)
            console.log('Error creating queue access : ' + error);
    });
    
    this.create = function(message){
        return new Promise(function(fullfill, reject){
            _queue.createMessage(_queueName, message, function(error, result, response){
                if(!error){
                    return fullfill(response);
                }           
                else{
                    //console.log(error);
                    return reject(error);
                }
            });
        });
    };          

    this.read = function(){
        return new Promise(function(fullfill, reject){
            _queue.getMessages(_queueName, function(error, messages){
                if(!error){

                    if(messages === undefined || messages.length < 1)
                        return fullfill();

                    var message = messages[0];
                    _queue.deleteMessage(_queueName, message.messageid, message.popreceipt, function(error, result){
                        if(!error){
                            return fullfill(message.messagetext);
                        }           
                        else{
                            //console.log(error);
                            return reject(error);
                        }
                    });
                }           
                else{
                    return reject(error);
                }
            }); 
        });
    };
}

module.exports = Queue;