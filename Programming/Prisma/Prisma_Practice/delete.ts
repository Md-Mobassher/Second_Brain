import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteData = async () => {
  // Delete single data using condition
  const singleDelete = await prisma.post.delete({
    where: {
      id: 1,
    },
  });
  console.log(singleDelete);

  // Delete multiple data using condition
  const deleteMany = await prisma.post.deleteMany({
    where: {
      published: false,
    },
  });
  console.log(deleteMany);

  // delete all data from table
  const deleteManyAllData = await prisma.post.deleteMany({});

  console.log(deleteManyAllData);
};

deleteData();
