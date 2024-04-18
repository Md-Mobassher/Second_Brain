1. create a vite project

```
yarn create vite
```

2. give a project name like - `redux_project`
3. Select a framework - `React`
4. Select a variant - `TypeScript`
5. Now run:

```
 cd redux_project
 yarn
 yarn dev
```

### Tailwind css installation

```
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

- edit `tailwind.config.ts`

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Add this to `index.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    outline: none;
}

html {
    scroll-behavior: smooth;
}
```

### Edit tsconfig.json file

Add the following code to the `tsconfig.json` file to resolve paths:

```
{
	"compilerOptions": {
		// ...
		"baseUrl": ".",
		"paths": {
			"@/*": [
				 "./src/*"
			 ]
		}
		// ...
	}
}
```

### Update vite.config.ts

Add the following code to the `vite.config.ts` so your app can resolve paths without error

```
# (so you can import "path" without error)
npm i -D @types/node
```

```
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

```

### Run the CLI

Run the `shadcn-ui` init command to setup your project:

```
npx shadcn-ui@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes (no)
```

### That's it

You can now start adding components to your project.

```
npx shadcn-ui@latest add button
```

Copy

The command above will add the `Button` component to your project. You can then import it like this:

```
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

```

### Folder structure

- src
  - assets
    - icons
    - imgaes
  - components
    - layouts (header, footer)
    - form
    - ui (button)
  - config
  - hooks
  - lib
  - pages
  - redux
    - api
    - features
    - hooks.ts
    - store.ts
  - routes
    - routes.tsx
  - styles
  - utils
- .env.local
-

### install react router dom, react hook form, ant design

```
yarn add react-router-dom react-hook-form antd
```

### React router dom setup

1. create `routes.tsx` in `src/routes/routes.tsx`

```
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([{
    path: '/',
    element: <App />
}])

export default router
```

2. Provide `<RouterProvider router={router} />` in `main.tsx`

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
```

### Create routes

```
const router = createBrowserRouter([
{
    path: '/',                     // absolute path
    element: <App />,
    children: [
        {
            path: 'about',         // relative path
            element: <About />
        },
    ]
},
{
    path: '/admin',
    element: <App />,
    children: [
        {
            index:true,          // it shows in /admin route
            element: <AdminDashboard />
        },
        {
            path:'dashboard',    // it shows in /admin/dashboard route
            element: <AdminDashboard />
        },
        {
            path: 'crate-admin',
            element: <CreateAdmin />
        },
    ],
},
{
    path: '/login',
    element: <Login />
}
])

export default router
```

###
