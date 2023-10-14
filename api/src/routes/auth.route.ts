import { Router } from "express";
import passport from "passport";
import type { User } from ".prisma/client";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

import prisma from "../config/prisma";
import { appConfig } from "../config/app";
import { encryptPassword } from "../utils/password";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "email/password are required",
    });
  }

  return Promise.resolve()
    .then(async () => {
      const hashedPassword = await encryptPassword(password);
      const emailUsed = await prisma.user.findUnique({ where: { email } });

      if (emailUsed) {
        throw new Error("User already exists with email");
      }

      const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });

      return user;
    })
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(400).send({
        status: false,
        message: err.message,
      });
    });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  return new Promise((resolve, reject) => {
    if (!email || !password) {
      reject(new Error("email, password are required."));
    }
    passport.authenticate("login", { session: false }, (err:any, user:any, info:any) => {
      if (err) reject(err);
      if (info?.message) reject(new Error(info.message));
      resolve(user);
    })(req, res, next);
  })
    .then((user) => {
      const { id } = user as User;
      const token = jwt.sign(
        {
          id,
        },
        appConfig.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({ status: true, token });
    })
    .catch((err) => {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: false,
      message: "Email is required!",
    });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found!",
    });
  }

  // 認証コードを生成
  const authCode = generateAuthCode();

  const defaults = {
    service: "SMTP",
    host: "smtp.example.com",
    port: 465,
    secure: true,
    auth: {
      user: "username",
      password: "password",
    },
  };
  
  const transporter = nodemailer.createTransport({
  ...defaults,
});
  

  const mailOptions = {
    from: "from@example.com",
    to: email,
    subject: "パスワード再設定",
    text: `
      パスワードを再設定するリンクを送信しました。

      <a href="https://example.com/reset-password?authCode=${authCode}">パスワードを再設定する</a>
    `,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({
    status: true,
    message: "認証コードを送信しました。",
  });
});

router.post("/reset-password", async (req, res) => {
  const { email, authCode, password } = req.body;

  if (!email || !authCode || !password) {
    return res.status(400).json({
      status: false,
      message: "Email, authCode, password are required!",
    });
  }

  if (!await verifyAuthCode(email, authCode)) {
    return res.status(401).json({
      status: false,
      message: "Invalid authCode!",
    });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found!",
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await encryptPassword(password),
    },
  });

  return res.status(200).json({
    status: true,
    message: "パスワードを変更しました。",
  });
});

export default router;


function generateAuthCode() {
  const randomBytes = crypto.randomBytes(16);
  const authCode = randomBytes.toString("hex");

  // 認証コードの有効期限を設定
  const now = new Date();
  const expiredAt = new Date(now.getTime() + 60 * 60 * 1000); // 1時間後に有効期限切れ

  return { authCode, expiredAt };
}

async function verifyAuthCode(email: string, authCode: string) {
  // Get the user from the database
  const user = await prisma.user.findUnique({ where: { email } });

  // If the user does not exist, return an error
  if (!user) {
    throw new Error("User not found");
  }

  // Get the auth code and expired at date from the database
  const authCodeFromDB = user.authCode;
  const authCodeExpiredAtFromDB = user.authCodeExpiredAt;

  // If authCodeExpiredAtFromDB is null, return an error
  if (authCodeExpiredAtFromDB === null) {
    throw new Error("Auth code expired");
  }

  // Check the auth code expiration date
  const now = new Date();

  if (now > authCodeExpiredAtFromDB) {
    return false;
  }

  // Check if the auth code matches the provided auth code
  if (authCodeFromDB === authCode) {
    return true;
  } else {
    return false;
  }
}