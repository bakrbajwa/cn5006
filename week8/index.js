mongoose = require('mongoose');
//app = express();
const MONGO_URI = 'mongodb+srv://sahejadali9822_db_user:BXMf5UQBDIMGFolV@cluster0.bjexndi.mongodb.net/week8';
mongoose.connect(MONGO_URI, {useUnifiedTopology: true,useNewUrlParser: true})
; const db = mongoose.connection;
db.on('error', function(err)
{console.log("Error occured during connection"+err)
}
);
db.once('connected', function() {
console.log(`Connected to ${MONGO_URI}`);
});
// creating the scheme
const PersonScheme = new mongoose.Schema({ name: {
type: String, required: true
},
age: Number, Gender:String, Salary:Number
});
// creating model named as modelname with collection named as personCollection
const person_doc = mongoose.model('modelname', PersonScheme,'personCollection');
// creating a single document
const doc1 = new person_doc({ name: 'Ali',age:22,Gender:"Male",Salary:100000 }
);
// adding one document in the collection
doc1
 .save()
 .then((doc1) => {
 console.log("New Article Has been Added Into Your DataBase.",doc1);
 })
 .catch((err) => {
 console.error(err);
 });

// Task2.Adding multiple documents
 manypersons=[{ name: 'Simon',age:42,Gender:"Male",Salary:3456 }
 ,{ name: 'Neesha',age:23,Gender:"Female",Salary:1000 }
 ,{ name: 'Mary',age:27,Gender:"Female",Salary:5402 },
 { name: 'Mike',age:40,Gender:"Male",Salary:4519 }
 ]


 person_doc.insertMany(manypersons).then(function(){
 console.log("Data inserted") // Success
 }).catch(function(error){
 console.log(error) // Failure
 }); 

 //Task3. fetching the data use of find:
 // finding the all documents in the collection
 person_doc.find({})      // find all users

 .sort({Salary: 1})   // sort ascending by firstName
 .select('name Salary age') // Name and Salary only
 .limit(10)  // limit to 10 items
 .exec()   // execute the query
 .then(docs=> {
    console.log("showing multiple documents")
    docs.forEach(function(Doc){
        console.log(Doc.age,Doc.name);
 })
 })
 .catch(err=>{
    console.error(err)
 })


 //Task 4 find command with filtering criteria. Run the find command s for which gender =Female and age is greater than some given number.
var givenage=20
person_doc.find ({Gender:"Female", age:{$gte:givenage}})
// find all users



.sort({Salary:1}) // sort ascending by firstName
.select('name Salary age')  // Name and salary only
.limit(10)  //limit to 10 times
.exec()
.then(docs=>{

console.log("showingagegreaterthan15 ",givenage)
docs.forEach(function(Doc) {
console.log(Doc.age,Doc.name);
})
})
.catch(err => {
console.error(err)})

//Tasks 5 : write a query to return the total number of documents in the collection.
// counting all the documents
person_doc.countDocuments().exec()
.then(count=>{
console.log("Total documents Count :", count)
}) .catch(err => {
console.error(err)
})

//Task 6 Delete the documents for a given criteria
person_doc.deleteMany({ age: { $gte: 25 } })
.exec()
.then(docs=>{
console.log('deleted documents are:',docs);
}).catch(function(error){
console.log(error);
});

//Task 7 update all document of which the gender is female and set their salary to 5555 and  Add following code in index.js save and run it
person_doc.updateMany({ Gender: "Female" },{Salay:5555})
.exec()
.then(docs=>{
console.log("update")
console.log(docs); // Success
}).catch(function(error){
console.log(error); // Failure
});