var MongoClient = require('mongodb').MongoClient, assert = require('assert');

//Connection Url
var url = 'mongodb://localhost:27017/quick-start';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	insertDocuments(db, function() {
		indexCollection(db, function() {
			findDocuments(db, function() {
				findCertainDocuments(db, function() {
					updateDocument(db, function() {
						removeDocument(db, function() {
							findDocuments(db, function() {
								removeAllDocuments(db, function() {
									db.close();
								});
							})
						});
					});
				});
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

var updateDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.updateOne(
		{ a : 2 }, 
		{ $set: { b : 1 } }, 
		function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log('Updated the document with the field a equal to 2');
			callback(result);
		}
	);
}

var removeAllDocuments = function(db, callback) {
	var collection = db.collection('documents');
	collection.remove({});
	console.log('All documents have been removed');
	callback(true);
}

var removeDocument = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	//Delete document where a is 3
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Removed the document with the field a equal to 3');
		callback(result);
	})
}

var indexCollection = function(db, callback) {
	db.collection('documents').createIndex(
		{ 'a' : 1 },
		null,
		function(err, results) {
			console.log('indexCollection results:');
			console.log(results);
			callback();
		})
}