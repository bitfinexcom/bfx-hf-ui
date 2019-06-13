# HF UI

## Create mongodb instance on port `27017`

```bash
docker run -p 27017:27017 mongo:latest mongod
```

## Start server and UI

```bash
npm run build
npm run start
npm run dev
```

## Electron 

Will run electron app in production mode
```
 npm run electron 
```
Will run electron app in dev mode
```
 npm run electron-dev
 ```
 Will package project for distribution
 ```
 npm run dist 
 ```

open `localhost:3000`
