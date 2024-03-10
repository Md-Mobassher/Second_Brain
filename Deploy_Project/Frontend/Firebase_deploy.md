# Firebase Hosting

1. Login to firebase (for first time)

```
firebase login
```

2.  After login give this command to terminal

```
firebase init

Y
```

3.  Select for `hosting` (press spacebar)
4.  Select `Existing`
5.  Give a `Project Name`
6.  Select `Public directory? Build` (for Javascript) or `dist` (for Typescript)
7.  Select `Single page - Y`
8.  Select `Automatic build - No`
9.  Run this command for `npm`

```
npm run build
```

or Run this command for `yarn`

```
yarn build
```

10. Run Deploy command

```
firebase deploy
```

#### If any update just follow last 2 commands
