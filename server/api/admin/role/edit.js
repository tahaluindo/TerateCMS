import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    // Edit role
    const role = await prisma.role.update({
      where: {
        roleID: body.id,
      },
      data: {
        roleName: body.name,
        roleDescription: body.description,
        roleModifiedDate: new Date(),
      },
    });

    if (role) {
      // Delete all user role
      const deleteUserRole = await prisma.userrole.deleteMany({
        where: {
          userRoleRoleID: body.id,
        },
      });

      if (deleteUserRole) {
        // Add User to the role
        body.users.forEach(async (el) => {
          // Select user where username
          const user = await prisma.user.findFirst({
            where: {
              userUsername: el.value,
            },
          });

          if (!user) return;

          // Add UserRole
          const userRole = await prisma.userrole.create({
            data: {
              userRoleUserID: user.userID,
              userRoleRoleID: body.id,
              userRoleCreatedDate: new Date(),
            },
          });
        });
      }

      return {
        statusCode: 200,
        message: "Role successfully edited!",
      };
    } else {
      return {
        statusCode: 500,
        message: "Something went wrong! Please contact your administrator.",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
