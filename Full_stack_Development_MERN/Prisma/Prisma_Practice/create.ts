import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // const createUser = await prisma.user.create({
  //   data: {
  //     username: "rita",
  //     email: "rita@gmail.com",
  //     role: UserRole.user,
  //   },
  // });

  // const createProfile = await prisma.profile.create({
  //   data: {
  //     bio: "this is rita's bio...",
  //     userId: 3,
  //   },
  // });

  // const createCategory = await prisma.category.create({
  //   data: {
  //     name: "Programming",
  //   },
  // });
  // console.log(createCategory);

  const createPost = await prisma.post.create({
    data: {
      title: "this is the post title of rashed",
      content: "this is content of the ",
      authorId: 1,
      postCategory: {
        create: {
          category: {
            connect: {
              id: 3,
            },
          },
        },
        // create: [
        //   {
        //     categoryId: 1,
        //   },
        //   {
        //     categoryId: 3,
        //   },
        // ],
      },
    },
    include: {
      postCategory: true,
    },
  });
  console.log(createPost);
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
