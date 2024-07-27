import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = async () => {
  // Update single data
  //   const singleUpdate = await prisma.post.update({
  //     where: {
  //       id: 7,
  //     },
  //     data: {
  //       title: "Title 7 ",
  //       content: "Content 7",
  //       author: "Mobassher",
  //     },
  //   });
  //   console.log(singleUpdate);
  // update multiple data
  //   const updateMany = await prisma.post.updateMany({
  //     where: {
  //       title: "this is title",
  //     },
  //     data: {
  //       published: true,
  //     },
  //   });
  //   console.log(updateMany);

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
};

updates();
