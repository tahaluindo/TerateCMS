import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Check if the role already exists
    const allRole = await prisma.role.findMany();

    const roleExist = allRole.find((role) => {
      return role?.roleName.toLowerCase() === body?.name.toLowerCase();
    });

    if (roleExist) {
      return {
        statusCode: 400,
        message: "Role already exists",
      };
    }

    if (body.module == "user") {
      // add new role
      const role = await prisma.role.create({
        data: {
          roleName: body.name,
          roleDescription: body.description || "",
          roleStatus: "ACTIVE",
          roleCreatedDate: new Date(),
        },
      });

      if (role) {
        return {
          statusCode: 200,
          message: "Role successfully added!",
        };
      } else {
        return {
          statusCode: 500,
          message: "Something went wrong! Please contact your administrator.",
        };
      }
    } else if (body.module == "role") {
      // add new role
      const role = await prisma.role.create({
        data: {
          roleName: body.name,
          roleDescription: body.description || "",
          roleStatus: "ACTIVE",
          roleCreatedDate: new Date(),
        },
      });

      if (role) {
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
              userRoleRoleID: role.roleID,
              userRoleCreatedDate: new Date(),
            },
          });
        });

        return {
          statusCode: 200,
          message: "Role successfully added!",
        };
      } else {
        return {
          statusCode: 500,
          message: "Something went wrong! Please contact your administrator.",
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
});
