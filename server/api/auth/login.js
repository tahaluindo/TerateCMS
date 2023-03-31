import sha256 from "crypto-js/sha256";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //   const { username, password } = event.body;

  const body = await readBody(event);

  if (!body.username || !body.password) {
    return {
      statusCode: 400,
      message: "Username and password are required",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      userUsername: body.username,
    },
  });

  if (!user) {
    return {
      statusCode: 404,
      message: "User not found",
    };
  }

  const hashedPassword = sha256(body.password).toString();
  if (user.userPassword !== hashedPassword) {
    return {
      statusCode: 401,
      message: "Wrong password",
    };
  }

  // Get user roles
  const roles = await prisma.userrole.findMany({
    where: {
      userRoleUserID: user.userID,
    },
    select: {
      role: {
        select: {
          roleName: true,
        },
      },
    },
  });

  const roleNames = roles.map((r) => r.role.roleName);

  const accessToken = generateAccessToken({
    username: user.userUsername,
    roles: roleNames,
  });
  const refreshToken = generateRefreshToken({
    username: user.userUsername,
    roles: roleNames,
  });

  return {
    statusCode: 200,
    message: "Login success",
    data: {
      username: user.userUsername,
      roles: roleNames,
      accessToken,
      refreshToken,
    },
  };
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30m" });
}
