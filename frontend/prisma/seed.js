const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      // Hash for password - zxczxc
      passwordHash:
        '$2b$10$AFYbgL6M6904ieADxhqG2.gK8fNIa.8oXI2Rqfs0XggQRI9X5Jfra',
    },
  })

  return admin
}

seed()