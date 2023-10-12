# next.js と Express.js Mysql で ORM は Prisma な開発環境です。
自身の勉強用ですよ

## next.js フロントエンドの作成
```command
cd ./client
yarn install
```

### ブラウザに表示
```command
yarn dev
```

### Storybook 
```command
yarn storybook
```

## MariaDB起動
```command
docker-compose up -d
```

## Express.js と prisma APIの作成
```command
cd ./api
yarn install
```

## テーブルを作成
```command
 npx prisma migrate dev --name init
```

## シードデータ登録

### @prisma/client が初期化
```command
 yarn prisma:migrate
```
### DB SEED 登録
```command
 prisma:gen
```

## prisma studioを起動する
```command
npx prisma studio
```

これでとりあえずうまくいくはず．．．

本番環境のＵＰとか誰か教えて．．．
