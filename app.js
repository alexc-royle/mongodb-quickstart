var MongoClient = require('mongodb').MongoClient, assert = require('assert');

//Connection Url
var url = 'mongodb://localhost:27017/quick-start';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	insertDocuments(db, function() {
		findDocuments(db, function() {
			findCertainDocuments(db, function() {
				db.close();
			});
		});
	});
	
});

var insertDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}, {a: 4}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(4, result.result.n);
		assert.equal(4, result.ops.length);
		console.log('Inserted 4 documents into the collection');
		callback(result);
	});
}

var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Found the following records:');
		console.log(docs);
		callback(docs);
	})
}

var findCertainDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find some documents
	collection.find({'a': 3}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log('Found the following records:');
		console.log(docs);
		callback(docs);
	})
}