# next.js と Express.js Mysql で ORM は Prisma な開発環境です。

# next.js フロントエンドの作成
```command
'cd ./client'
'yarn install'
```

## ブラウザに表示
```command
'yarn dev'
```

# MariaDB起動
```command
'docker-compose up -d'
```

# Express.js と prisma APIの作成
```command
'cd ./api'
'yarn install'
```

## テーブルを作成
```command
 'npx prisma migrate dev --name init'
```

## シードデータ登録
```command
 'npm init -y'
```

### @prisma/client が初期化
```command
 'npx prisma generate'
```
### DB SEED
```command
 'npx prisma db seed'

 'yarn watch'
```

## prisma studioを起動する
```command
'npx prisma studio'
```

これでとりあえずうまくいくはず．．．
本番環境のＵＰとか誰か教えて．．．
今後の予定は認証機能とかその辺りをやっていきたいと思っています。