import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //   Create Data
  //   const result = await prisma.post.create({
  //     data: {
  //       title: "this is title",
  //       content: "this is content",
  //       author: "Rashed",
  //     },
  //   });
  //   console.log(result);

  //   // Get all Data from DB
  //   const getAllData = await prisma.post.findMany();
  //   console.log(getAllData);

  //   // Return first match data
  //   const getSingleData = await prisma.post.findFirst({
  //     where: {
  //       id: 4,
  //     },
  //   });
  //   console.log(getSingleData);

  //   // Return first match data and if not found throw an error
  //   const getSingleDataOrError = await prisma.post.findFirstOrThrow({
  //     where: {
  //       id: 6,
  //     },
  //   });
  //   console.log(getSingleDataOrError);

  // find by unique identifier
  const findUnique = await prisma.post.findUnique({
    where: {
      id: 7,
    },
  });
  console.log(findUnique);

  // find by unique identifier or throw error
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
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
