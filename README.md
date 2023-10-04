# next.js と Express.js Mysql で ORM は Prisma な開発環境です。

# next.js フロントエンドの作成
'cd ./client'
'yarn install'

## ブラウザに表示
'yarn dev'

# MariaDB起動
'docker-compose up -d'

# Express.js と prisma APIの作成
'cd ./api'
'yarn install'

## テーブルを作成
 'npx prisma migrate dev --name init'

## シードデータ登録
 'npm init -y'

### @prisma/client が初期化
 'npx prisma generate'

### DB SEED
 'npx prisma db seed'

 'yarn watch'

## prisma studioを起動する
'npx prisma studio'

これでとりあえずうまくいくはず．．．
本番環境のＵＰとか誰か教えて．．．
今後の予定は認証機能とかその辺りをやっていきたいと思っています。