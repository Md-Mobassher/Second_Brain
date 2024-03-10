# Prisma

```
yarn init -y
```

```
yarn add prisma typescript ts-node @types/node -D
```

```
npx tsc --init
```

```
npx prisma
```

```
npx prisma init
```

- `.env` file edit USER and PASSWORD and Database Name

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

- Create model in `prisma/schema.prisma`

```
model Post {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    title     String   @db.VarChar(255)
    content   String?
    published Boolean  @default(false)
    author    User     @relation(fields: [authorId], references: [id])
    authorId  Int
  }
```

#### Prisma migrate

- To map your data model to the database schema, you need to use the `prisma migrate` CLI commands:

```
npx prisma migrate dev --name init
```

#### Install Prisma Client

```
yarn add @prisma/client
```

#### Prisma Studio

```
npx prisma studio
```

---

### Querying the database

- Create a new file named `src/index.ts` and add the following code to it:

```
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
------------------------------
   // ... you will write your Prisma Client queries here

  const createSingleData = await prisma.post.create({
    data: {
      title: "this is title",
      content: "this is content",
      author: "Rashed",
    },
  });

  console.log(createSingleData);
 -------------------------------
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

---

## Create Data

#### Create()

- Create Single Data

```
const createSingleData = await prisma.post.create({
    data: {
      title: "this is title",
      content: "this is content",
      author: "Rashed",
    },
  });

console.log(createSingleData);
```

#### CreateMany()

- Create Multiple Data

```
const createMultipleData = await prisma.post.createMany({
    data: [
      {
        title: "this is title",
        content: "this is content",
        author: "Rashed",
      },
      {
        title: "this is title",
        content: "this is content",
        author: "Rashed",
      },
      {
        title: "this is title",
        content: "this is content",
        author: "Rashed",
      },
    ],
  });

  console.log(createMultipleData);
```

---

## Find Data

#### findMany()

- Get all Data from DB

```
const getAllData = await prisma.post.findMany();

console.log(getAllData);
```

- Relational filters

```
const publishedPostUsers = await prisma.user.findMany({
    include: {
        post: {
            where: {
                published: true
            }
        }
    }
})
console.dir(publishedPostUsers, { depth: Infinity })
```

#### findFirst()

- Return first match data

```
const getSingleData = await prisma.post.findFirst({
    where: {
      id: 4,
    },
  });

console.log(getSingleData);
```

#### findFirstOrThrow()

- Return first match data or throw an error

```
const getSingleData = await prisma.post.findFirstOrThrow({
    where: {
      author: "Rashed",
    },
  });
 
console.log(getSingleData);
```

#### findUnique()

- Find by unique identifier `(PK)` like `id`

```
const findUnique = await prisma.post.findUnique({
    where: {
      id: 7,
    },
  });

console.log(findUnique);
```

- Fluent `api`

```
const result = await prisma.user.findUnique({
    where: {
        id: 1
    }
}).profile();
```

#### findUniqueOrThrow()

- Find by unique identifier `(PK)` like `id` or throw an error

```
const findUniqueOrError = await prisma.post.findUniqueOrThrow({
    where: {
      id: 7,
    },
  });
console.log(findUniqueOrError);
```

#### select() (Return specific field)

```
const findUniqueOrError = await prisma.post.findUniqueOrThrow({
    where: {
      id: 7,
    },
    select: {
      title: true,
      content: true,
      author: true,
    },
  });
 
console.log(findUniqueOrError);
```

---

## Update Data

#### update()

- Update single data

```
  const singleUpdate = await prisma.post.update({
    where: {
      id: 7,
    },
    data: {
      title: "Title 7 ",
      content: "Content 7",
      author: "Mobassher",
    },
  });

  console.log(singleUpdate);
```

#### updateMany()

- Update Multiple data

```
const updateMany = await prisma.post.updateMany({
      where: {
          title: "this is title"
      },
      data: {
          published: true
      }
  })
  console.log(updateMany)
```

#### upsert()

- if exists update data if not exist create data

```
  const upsertData = await prisma.post.upsert({
    where: {
      id: 10,
    },
    update: {
      author: "Mobassher",
    },
    create: {
      title: "Title 2",
      content: "content 2",
      author: "Mobassher",
    },
  });

  console.log(upsertData);
```

---

## Delete Data

#### delete()

- Delete single data using condition

```
const singleDelete = await prisma.post.delete({
    where: {
      id: 1,
    },
  });
console.log(singleDelete);
```

#### deleteMany()

- Delete multiple data using condition

```
  const deleteMany = await prisma.post.deleteMany({
    where: {
      published: false,
    },
  });
  console.log(deleteMany);
```

- delete all data from table

```
const deleteManyAllData = await prisma.post.deleteMany({});
console.log(deleteManyAllData);
```

---

## Pagination & Sorting

- Two types of pagination
  1.  Offset pagination: Uses skip and take to skip a certain number of results and select a limited range.
  2.  Cursor based pagination: Uses cursor and take a return a limited set of results before or after a given cursor.

#### offset pagination

```
  const offsetData = await prisma.post.findMany({
    skip: 5,
    take: 2,
  });

  console.log("Offest paginated data: ", offsetData);
```

#### Cursor pagination

```
  const cursorData = await prisma.post.findMany({
    skip: 5,
    take: 2,
    cursor: {
      id: 15,
    },
  });
console.log("cursor based paginated data: ", cursorData);
```

### Sorting

```
  const sortedData = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    skip: 2,
    take: 2,
    where: {
      title: "Title 1",
    },
  });

  console.log("sorted data: ", sortedData);
```

---

## Relations

- One to one

```
model Post {
  id           Int            @id @default(autoincrement())
  title        String
  content      String
  published    Boolean        @default(false)
  authorId     Int
  author       User           @relation(fields: [authorId], references: [id])
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  postCategory PostCategory[]

  @@map("posts")
}

model User {
  id       Int      @id @default(autoincrement())
  username String   @unique
  email    String
  role     UserRole @default(user)
  profile  Profile? // one to one relation
  post     Post[] // one to many relation

  @@map("users")
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  userId Int     @unique
  user   User    @relation(fields: [userId], references: [id])

  @@map("profiles")
}

model Category {
  id           Int            @id @default(autoincrement())
  name         String
  postCategory PostCategory[]

  @@map("categories")
}

model PostCategory {
  postId Int
  post   Post @relation(fields: [postId], references: [id])
  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id])

  @@id([postId, categoryId])
  @@map("post_category")
}

enum UserRole {
  user
  admin
}
```

---

## Filtering Data

#### AND

```
 const andFiltering = await prisma.post.findMany({
    where: {
      AND: [
        {
          title: {
            contains: "title",
          },
        },
        {
          published: true,
        },
      ],
    },
  });
```

#### OR

```
 const orFiltering = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: "title",
          },
        },
        {
          published: true,
        },
      ],
    },
  });
```

#### NOT

```
 const notFiltering = await prisma.post.findMany({
    where: {
      NOT: [
        {
          title: {
            contains: "this",
          },
        },
      ],
    },
  });
```
