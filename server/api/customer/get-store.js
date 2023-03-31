import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = await getQuery(event);

  // Find userID from query username
  const user = await prisma.user.findMany({
    where: {
      userUsername: query.username,
    },
    select: {
      userID: true,
    },
  });

  if (!user || user.length == 0)
    return {
      statusCode: 404,
      message: "User not found",
    };

  const store = await prisma.store.findMany({
    where: {
      storeUserID: user[0].userID,
    },
    select: {
      storeID: true,
      storeName: true,
      storeDescription: true,
      storeCreatedDate: true,
    },
  });

  return {
    statusCode: 200,
    message: "Store found",
    data: store ? store[0] : {},
  };
});
