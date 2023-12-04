# Mongoose Master doc

MongoDB is a no-sql database, which support both SQL, No-Sql. MongoDB is scalable, high performance, open source database.

We can install mongoDB to create database into our localhost,
To do that we have to install

- Install `MongoDB`
- install `MongoDB shell `

MongoDB Shell is the quickest way to connect to (and work with) MongoDB. Easily query data, configure settings, and execute other actions with this modern, extensible command-line interface — replete with syntax highlighting, intelligent autocomplete, contextual help, and error messages.

we have some option to write queries into

1. Mongosh shell in mongoDB compass
2. using our cmd (create a env variable into path C:\Program Files\MongoDB\Server\6.0\bin )
3. or using any GUI

we can also use GUI `Graphical User interface` like `No Sql Booster`

- install `noSqlBooster`

NoSQLBooster is a cross-platform GUI tool for MongoDB Server 3.6-7.0, which provides a build-in MongoDB script debugger, comprehensive server monitoring tools, chaining fluent query, SQL query, query code generator, task scheduling, ES2020 support, and advanced IntelliSense experience.

## Now we are able to write quires through the GUI.

### Let's learn about operators of mongodb with [Mongoose(mongodb shell) operator documentation ](https://www.mongodb.com/docs/manual/reference/method/db.collection.insert/)

There are `4 types of operators` in mongodb

1. Query and projection operator
2. Update operator
3. Aggregation pipeline
4. Bitwise Update operator

### Some basic queries: from Query and projection operator `$insert,  $insertOne, $insertMany, $find, $findOne`

```mongodb
 db.collection.insertOne({name:"Mobassher"}) // single obj
 db.collection.insertMany([{name:"Mobassher"}]) // array of ojb
 db.practice_q.find({}) // find all data
 db.practice_q.find({name:"Mobassher", age:18}) // find name= Mobassher and if age = 18
 db.practice_q.find({age:18},{age:1}) // field filtering find if age = 18 and shows only the age `key/field/property` from data


db.practice_q.find({age:18}).project({name:1, age:1}) // field filtering with project and shows only the name & age key from data
```

### 1.1 comparison Query operators `$gt, $gte, $lt, $lte`

```mongodb
 db.inventory.find( { age: { $gt: 20 } } ) // greeter than 20
 db.inventory.find( { age: { $gte: 20 } } ) // greeter than and equal 20
 db.inventory.find( { age: { $lt: 18 } } ) // less than 18
 db.inventory.find( { age: { $lte: 18 } } ) // less than 18
 db.practice_q.find({gender:"Female", age:{$gt:20,$lt:35}},{age:1}).sort({age:1}) //multiple condition
```

- `$in & $nin` // checks if it is in or not in
  To specify an $in expression, use the following prototype:
  syntax: { field: { $in: [<value1>, <value2>, ... <valueN> ] } }

```mongodb
 db.inventory.find( { age: { $in: [18,20] } } ) // checks age field is either 18 or 20.
 db.inventory.find( { age: { $in: [18,26] } } ,{age:1}) // checks age field is either 18 or 20.

 db.practice_q.find({
  gender: "Female",
  age: { $in: [18, 24, 26, 32, 30] },
  interests: { $in: ["Cooking"] }}) // Implicit and
```

### 1.2 Logical query operators `$and, $or`

- explicit `and` operator
- syntax { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }

```mongodb
db.practice_q.find({
 $and: [
            { age: { $gt: 15 } },
            { age: { $lt: 36 } },
            {gender:"Female"}
       ] }).project({age:1}).sort({ age: 1 })
```

- `or` operator
  // implicit or

```mongodb
db.practice_q.find({
    "skills.name":{$in:["JAVASCRIPT","PYTHON"]}})
    .project({skills:1}).sort({ age: 1 })

// explicit or operator

db.practice_q.find({
    $or:[
            {"skills.name":"JAVASCRIPT"},
            {"skills.name":"PYTHON"}
        ]
}).project({skills:1}).sort({ age: 1 })
```

### 1.3 Element query operators `$exists, $type`

- `$exists` check if value is exists

```mongodb

db.practice_q.find({company:{$exists:true,}})
    .project({company:1}).sort({ age: 1 })
```

- `type` checks type of the field

```mongodb

db.practice_q.find({friends:{ $type:"array"}})
    .project({friends:1}).sort({ age: 1 })

```

### 1.4 Array operator `$size, $all, $elemMatch`

// `size` checks the array size

```mongodb
db.practice_q.find({friends:{ $size:5}})
    .project({friends:1}).sort({ age: 1 })
```

// `array` index position with dot notation

```mongodb
db.practice_q.find({"interests.2":"Cooking"})
    .project({interests:1}).sort({ age: 1 })
```

- `$all` operator don't looks array positions just return matched result

```mongodb
db.practice_q.find({interests:{ $all:["Cooking"]}})
    .project({interests:1}).sort({ age: 1 })
```

- `$elemMatch` operator checks all fields of obj

```mongodb
db.practice_q.find(
    {
        skills: {
            $elemMatch: {
                name: "JAVASCRIPT",
                level: "Intermidiate"
            }
        }
    }).project({ skills: 1,  }).sort({ age: 1 })

```

## 2. Update operator `$set, $addToSet, $push, $pop, $pull, $pullAll, $inc`

- `$set` operator update a field

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $set: {
            "name.firstName": "Mobassher", "name.lastName": "AL AZAD",
            "address.city": "Dhaka",
             gender:"Male",
            "friends.0": "Aronno", // update only array 0 index
            "skills.0.name": "Next level dev", // array of obj
            languages: ["Bangla", "English"] // update full array
        }
    }
)

// .$ update the first element of an array

db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065"), "skills.level": "Expert" },
    {
        $set: {
            "skills.$.isLearning": false // update the first element
        }
    }
)

```

- The `$addToSet` operator adds a value to an array unless the value is already present,
  // in which case $addToSet does nothing to that array.

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $addToSet: { languages:"Hindi"} // set a new value to an array if value dose'nt exists
    }
)
```

- `$each` modifier to add multiple elements to the tags array:

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $addToSet: { languages: { $each: ["Hindi", "China", "Urdu"]  } } // add multiple value to language array
    }
)
```

- The `$unset` operator deletes a particular field.

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {$unset:  {addrerr:""}}
)

```

- The `$push` operator appends a specified value to an array.

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {
        $push: { languages: { $each: ["China", "Urdu"] } } // add multiple value to language array
    }
)
```

- The `$pop` operator removes the first or last element of an array.
  // Pass $pop a value of -1 to remove the first element of an array and
  // 1 to remove the last element in an array.

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {$pop:  {languages:1}}
)
```

- The `$pull` operator delete from an existing array all instances of a value or values that match a specified condition.

```mongodb
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {$pull:  {languages:"hjk"}} // remove hjk from array language
)

db.practice_q.updateOne(
    { email: "mdangl1@odnoklassniki.ru" },
    {
        $pull: {
            skills: {
                name: "C#" // delete a object from an array
            }
        }
    }
)


// `$pillAll`delete all matching value
db.practice_q.updateOne(
    { _id: ObjectId("6406ad63fc13ae5a40000065") },
    {$pullAll:  {languages:["China","Urdu"]}}
)
```

- `$inc` operator

```mongodb
db.practice_q.updateMany(
    { gender: "Male", age: { $gt: 20 } },
    {
        $inc: { age: 2 }
    }
)
```

- `$deleteOne` delete one documents

```mongodb
db.practice_q.deleteOne(
    {_id : ObjectId("6406ad63fc13ae5a40000067")}
)


```

```mongodb

```

```mongodb

```
