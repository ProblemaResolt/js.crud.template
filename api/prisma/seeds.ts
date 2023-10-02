import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const task1 = await prisma.todo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Task 1",
    },
  });
  const task2 = await prisma.todo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: "Task 2",
    },
  });

  console.log({ task1, task2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });