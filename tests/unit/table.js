var expect = require('chai').expect;
var azure = require('../../src/azure.js');
var guid = require('guid');

var log = function(message){
    console.log(message);
};

describe('Azure table wrapper tests', function(){
//
//    this.timeout(10000);
//    var runRowKey = guid.create().value;
//    var runPartitionKey = guid.create().value;
//    var table = azure.table('testtable');
//    var entity = {"Foo" : "foo", "Bar" : "bar"};
//
//    describe('When I add an table entity', function(){
//        it('It should write a table entity', function(done){
//            table.create(runPartitionKey, runRowKey, entity)
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
//    describe('When I read a table entity', function(){
//        it('It should be equal to the entity written', function(done){
//            table.read(runPartitionKey, runRowKey)
//            .then(
//                function(result){
//                    expect(result).to.deep.equal(entity);
//                    done();
//                },function(error){
//                    done(error);
//                }
//            ).done(null, done);
//        });
//    });
//
//    describe('When I delete a table entity', function(){
//        it('It should not be available anymore', function(done){
//            table.delete(runPartitionKey, runRowKey)
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
});