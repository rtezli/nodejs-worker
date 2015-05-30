var expect = require('chai').expect;
var azure = require('../../src/azure.js');

var log = function(message){
    console.log(message);
};

describe('Azure blob wrapper tests', function(){
//
//    this.timeout(10000);
//    var blob = azure.blob('testcontainer');
//    var exampleBlob = '{"info" : "example content ... "}';
//    describe('When I add a blob', function(){
//        it('It should write an uncomressed blob', function(done){
//            blob.create('config.json', exampleBlob)
//            .then(
//                function(result){
//                    expect(result.isSuccessful).to.equal(true);                      
//                    done();
//                },function(error){
//                    done(error);
//                }
//            ).done(null, done);
//        });
//    });
//
//    describe('Whem I read a blob', function(){
//        it('It should read an uncompressed blob', function(done){
//            blob.read('config.json')
//            .then(
//                function(result){
//                    expect(result).to.equal(exampleBlob);                        
//                    done();
//                },function(error){
//                    done(error);
//                }
//            ).done(null, done);
//        });
//    });
//
//    describe('Whem I delete a blob', function(){
//        it('It should not be there anymore', function(done){
//            blob.delete('config.json')
//            .then(
//                function(result){
//                    expect(result.isSuccessful).equals(true);                        
//                    done();
//                },function(error){
//                    done(error);
//                }
//            ).done(null, done);
//        });
//    });
});