const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  const john = await prisma.admin.create({
    data: {
      username: 'john',
      // Hash for password - twixrox
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  })

  return john
}

seed()