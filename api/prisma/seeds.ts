import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash('your_password_here', 10); // パスワードをハッシュ化

    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'User 1',
        password: hashedPassword, // ハッシュ化したパスワードを保存
        role: 'USER',
      },
    });
    
    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com', // 異なるメールアドレスを使用
        name: 'User 2',
        password: hashedPassword, // ハッシュ化したパスワードを保存
        role: 'ADMIN',
      },
    });

    // Post モデルにデータを作成
    const post1 = await prisma.post.create({
      data: {
        title: 'First Post',
        content: 'This is the content of the first post.',
        published: true,
        authorId: user1.id, // user1 の ID を指定
      },
    });

    // Post モデルにデータを作成
    const post2 = await prisma.post.create({
      data: {
        title: 'second Post',
        content: 'This is the content of the first post.',
        published: true,
        authorId: user2.id, // user2 の ID を指定
      },
    });

    console.log('シードデータの作成が完了しました。');
  } catch (error) {
    console.error('シードデータの作成中にエラーが発生しました:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
