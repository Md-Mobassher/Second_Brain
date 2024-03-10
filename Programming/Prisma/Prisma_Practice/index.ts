import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Create Data
  const result = await prisma.post.create({
    data: {
      title: "this is title",
      content: "this is content",
      author: "Rashed",
    },
  });
  console.log(result);
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
