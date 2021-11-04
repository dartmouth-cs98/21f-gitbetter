/* call firestore instance from the db_connection file*/
const connectToFireStore = require('./db_connection.js');
const firestore = connectToFireStore.firestore;


/* Define Collection from your firestore DB */
// collection is the same as table
const collectionName = 'TestCollection';

/* Define the name of the document */
// document is the same as a row in a table
const docName = 'test'

/* Append the strings together  with '/' */
const documentToAdd = collectionName + '/' + docName


/* Create the name of the fields for the document*/
const fieldNameOne = "testOne";
const fieldNameTwo = "testTwo";

/* Create the document */
const document = firestore.doc(documentToAdd);

/* Enter data into the document fields */
document.set({
	fieldNameOne: 'Hello',
	fieldNameTwo: 'World!',
}).then(() => {
	console.log('Document has been created with fields:', fieldNameOne, fieldNameTwo);
});