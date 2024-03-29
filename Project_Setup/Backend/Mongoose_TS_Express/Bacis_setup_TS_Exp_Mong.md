- [Basic_setup](#Basic_setup)
- [Es-lint](#Es-lint)
- [Prettier](#Prettier)

## #Basic_setup

1.  Initialize `package.json` file

```
	npm init -y
```

2.  Initialize `TypeScript` & configure file

```
	tsc -init
```

      rootDir - src
      outDir - dist

3.  install `Express, Mongoose, Cors, Dotenv`

```
	yarn add express mongoose cors dotenv bcrypt
```

4.  install `TypeScript as Dependency `

```
	yarn add -D typescript
```

```
	yarn add -D ts-node-dev
```

```
	yarn add -D @types/express
```

```
	yarn add -D @types/cors
```

```
	yarn add -D @types/bcrypt
```

5. write script in `package.json`

```
	"start": "node dist/server.js",
	"dev": "ts-node-dev --respawn --transpile-only src/server.ts",
	"build": "tsc",
```

6. create src folder in root directory of the project. then create `server.ts`  file into #src folder (`src/server.ts`) #server_ts

```
	import mongoose from "mongoose";
	import app from "./app";
	import config from "./app/config";

	async function main() {
	  try {
		  await mongoose.connect(config.database_url as string);
		  console.log("Connected to MongoDB");
		 
	      app.listen(config.port, () => {
		      console.log(`Example app listening on port ${config.port}`);
		  });
	  } catch (error) {
		  console.log(error);
	   }
	}

	main();
```

7. create `app.ts` file into #src folder #app_ts

```
	import cors from 'cors';
	import express, { Application, Request, Response } from 'express';
	import globalErrorHandler from './app/middlewares/globalErrorhandler';
	import notFound from './app/middlewares/notFound';
	import router from './app/routes';

	const app: Application = express();

	// parsers
	app.use(express.json());
	app.use(cors());

	// application routes
	app.use('/api/v1', router);

	app.get('/', (req: Request, res: Response) => {
	  res.send("Server is Running");
	});

	app.use(globalErrorHandler);
	app.use(notFound);

	export default app;
```

8.  create `index.ts` file into #config folder #config_index_ts

```
import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path: path.join(process.cwd(), ".env"),
});

export default {
	NODE_ENV: process.env.NODE_ENV,
	port: process.env.PORT,
	database_url: process.env.DATABASE_URL,
	database_url_local: process.env.DATABASE_URL_LOCAL,
	bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
	default_password: process.env.DEFAULT_PASS,
};
```

9. create `.env` file in projects root directory #\_env

```
NODE_ENV = development
 
PORT= 5000
 
DATABASE_URL_LOCAL= "mongodb://localhost:27017"
 
DATABASE_URL= "mongodb+srv://<user>:<password>@cluster0.oo5opfq.mongodb.net/<databaseName>?retryWrites=true&w=majority"
 
BCRYPT_SALT_ROUNDS= 10

DEFAULT_PASSWORD = "Rashed@123"
```

10. create `.gitignore` file in project's root directory #\_gitignore

```
node_modules
dist
.env
```

11. Create `index.ts` file in #routes folder into #app folder #routes_index_ts

```
	import { Router } from 'express';
	import { StudentRoutes } from '../modules/student/student.route';
	import { UserRoutes } from '../modules/user/user.route';

	const router = Router();

	const moduleRoutes = [
	  {
	    path: '/users',
	    route: UserRoutes,
	  },
	  {
	    path: '/students',
	    route: StudentRoutes,
	  },
	];

	moduleRoutes.forEach((route) => router.use(route.path, route.route));

	export default router;
```

12. #catchAsync_ts
13. #sendResponse_ts

## #Es-lint & #Prettier Setup

### #Es-lint setup

1. install this for `es-lint`

```
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. then install

```
npx eslint --init
```

3. add some rules in `eslint.json`

```json
	"rules": {
	    "no-unused-vars": "error",
	    "no-unused-expressions": "error",
	    "prefer-const":"error",
	    "no-undef":"error",
	    "no-console": "warn"
	},
	"globals": {
	    "process":"readonly"
	}
```

3. you can prevent linting by creating a `.eslintignore` file and adding the folders or files you want to ignore: this file

```
node_modules
dist
```

4. then add some script to `package.json`

```json
	"lint": "eslint src --ignore-path .eslintignore --ext .ts",
	"lint-fix":"npx eslint src --fix",
```

then check the script `yarn lint` & `yarn lint-fix`

### #Prettier setup

1. install prettier

```shell
yarn add -D prettier
```

2. create a file called `.prettierrc.json` in the project’s root directory, then paste this code into it
   ```json
   {
     "semi": true,
     "singleQuote": true
   }
   ```
3. add some script to `package.json`

```json
"prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
"prettier-fix": "npx prettier --write src",
```

- then check the script `yarn prettier` & `yarn prettier-fix`

4. add some script into vs code `setting.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

5. The best solution here is to use the es-lint-config-prettier plugin to disable all ES-Lint rules that are irrelevant to code formatting, as Prettier is already good at it: install

```shell
yarn add -D eslint-config-prettier
```

6. With that installed, let’s go to the `.eslintrc` file, and add prettier at the end of your extends list to disable any other previous rules from other plugins:

```json
"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
```

- add this to `tsconfig.json`

```
"include": ["src"], // which files to compile
"exclude": ["node_modules"], // which files to skip
```
