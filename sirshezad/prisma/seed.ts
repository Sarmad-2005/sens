import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const SEED_USERS = [
  {
    name: "Admin User",
    email: "admin@ric.edu.pk",
    password: "Admin@123",
    role: Role.ADMIN,
  },
  {
    name: "Teacher User",
    email: "teacher@ric.edu.pk",
    password: "Teacher@123",
    role: Role.TEACHER,
  },
  {
    name: "Accountant User",
    email: "accountant@ric.edu.pk",
    password: "Account@123",
    role: Role.ACCOUNTANT,
  },
]

async function main() {
  console.log("Seeding database...")
  for (const userData of SEED_USERS) {
    const hashed = await bcrypt.hash(userData.password, 12)
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: { role: userData.role },
      create: {
        name: userData.name,
        email: userData.email,
        password: hashed,
        role: userData.role,
      },
    })
    console.log(`  ✓ ${user.role.padEnd(12)} ${user.email}`)
  }
  console.log("\nSeed credentials:")
  console.log("  admin@ric.edu.pk     / Admin@123")
  console.log("  teacher@ric.edu.pk   / Teacher@123")
  console.log("  accountant@ric.edu.pk / Account@123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
