import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@taskflow.com",
    },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@taskflow.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "user@taskflow.com",
    },
    update: {},
    create: {
      name: "Demo User",
      email: "user@taskflow.com",
      passwordHash,
      role: "USER",
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
