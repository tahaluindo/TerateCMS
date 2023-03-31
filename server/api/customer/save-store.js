import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (body.mode == "create") {
      const user = await prisma.user.findMany({
        where: {
          userUsername: body.storeUsername,
        },
        select: {
          userID: true,
        },
      });

      // console.log("user", user);

      const store = await prisma.store.create({
        data: {
          storeName: body.storeName,
          storeDescription: body.storeDescription,
          storeUserID: user[0].userID,
          storeCreatedDate: new Date(),
        },
      });

      if (!store)
        return {
          statusCode: 404,
          message: "Store cannot be created",
        };
    } else {
      const store = await prisma.store.update({
        where: {
          storeID: body.storeID,
        },
        data: {
          storeName: body.storeName,
          storeDescription: body.storeDescription,
          storeModifiedDate: new Date(),
        },
      });

      if (!store)
        return {
          statusCode: 404,
          message: "Store not found",
        };
    }

    return {
      statusCode: 200,
      message: "Store successfully saved",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
});
