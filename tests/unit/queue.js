var expect = require('chai').expect;
var azure = require('../../src/azure.js');

var log = function(message){
    console.log(message);
};

describe('Azure queue wrapper test', function(){
//
//    this.timeout(10000);
//    var queue = azure.queue('testqueue');
//    var queueMessage = 'This is a test queue message';
//
//    describe('When I enqueue a message', function(){
//        it('It shoul enqueue a message', function(done){
//            queue.create(queueMessage)
//            .then(
//              function(result){
//                    expect(result.isSuccessful).to.equal(true);
//                    done();
//                },function(error){
//                    done(error);
//                }
//            ).done(null, done);
//        });
//    });
//
//    describe('When I dequeue a message', function(){
//        it('It should be the enqueued message', function(done){
//            queue.read()
//            .then(
//              function(result){
//                    expect(result).to.equal(queueMessage);
//                    done();
//                },function(error){
//                    done(error);
//                }
//            ).done(null, done);
//        });
//    });
});
