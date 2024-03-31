1. install `Vercel cli` with this command for one time

```
yarn global add vercel@latest
```

2. create `vercel.json` into root of the project and paste it.

```
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],

  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

3. Login to vercel with github or email

```
vercel login
```

4. Build application

```
vercel
```

5. Deploy application to vercel with this command

```
vercel --prod
```

---

# Prisma project deploy

- Add this `Script` into `package.json` file

```
 "scripts": {
    "prod": "node ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "postinstall": "prisma generate"
  },
```
