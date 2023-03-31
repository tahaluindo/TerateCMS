import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Update user
    const user = await prisma.user.updateMany({
      where: {
        userUsername: body.username,
      },
      data: {
        userFullName: body?.fullname || "",
        userEmail: body?.email || "",
        userPhone: body?.phone || "",
        userStatus: body.status,
        userModifiedDate: new Date(),
      },
    });

    if (user) {
      const getUserID = await prisma.user.findFirst({
        where: {
          userUsername: body.username,
        },
      });

      if (getUserID) {
        // Delete all user role
        const userRole = await prisma.userrole.deleteMany({
          where: {
            userRoleUserID: getUserID.userID,
          },
        });

        if (userRole) {
          const userRoleList = body.role;

          // Add new user role
          userRoleList.forEach(async (role) => {
            const userRole = await prisma.userrole.create({
              data: {
                userRoleUserID: getUserID.userID,
                userRoleRoleID: role.value,
                userRoleCreatedDate: new Date(),
              },
            });
          });

          return {
            statusCode: 200,
            message: "User updated successfully",
          };
        }
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
