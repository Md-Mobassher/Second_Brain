- ### Question 1: Retrieve the count of individuals who are active (isActive: true) for each gender.

```mongodb
db.getCollection("massive-data-collection").aggregate([

    { $match: { isActive: true } },
    { $group: { _id: "$gender", count: { $sum: 1 } } }

])
```

- ### Question 2: Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana."

```mongodb

db.getCollection("massive-data-collection").aggregate([

    { $match: { isActive: true, favoriteFruit: "banana" } },
    // { $group: { _id: "$name",  } }
    {$project: {name:1, email:1}}

])

```

- ### Question 3: Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.

```mongodb
db.getCollection("massive-data-collection").aggregate([
    {
        $group: {
            _id: "$favoriteFruit",
            count:{$sum:1},
            avgAge: {$avg:"$age" }
        }
    },
    {$sort: {avgAge:-1}}

])

```

### 4

```mongodb
db.getCollection("massive-data-collection").aggregate([
    {
        $match: {
            friends: { $exists: true, $ne: [] }
        }
    },
    {
        $unwind: "$friends"
    },
    {
        $match: {
            "friends.name": /^W/
        }
    },
    {
        $group: {
            _id: "$friends.name"
        }
    }
])

```

```mongodb

```

```mongodb

```

```mongodb

```
