## Install react router dom

```
yarn add react-router-dom
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

---

### Create Layout

create `src/layout/MainLayout.tsx`

```
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
```

### Create routes

```
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
{
    path: '/',                     // absolute path
    element: <MainLayout />,
    children: [
        {
            path: '/',             // relative path
            element: <Home />
        },
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

### Create Error Page

Create `ErrorPage` into `src/page/ErrorPage.tsx`

```
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <div className="container flex flex-col justify-center items-center h-screen text-center py-32">
      <h1 className=" text-7xl font-extrabold mb-8">Error {status || 404}</h1>
      <p className="lg:text-3xl">{error?.message}</p>
      <button className="btn bg-red-500 text-white mt-8">
        <Link to="/">HomePage</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
```

### Show Error Page globally

```
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,        // write errorElement
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,        // write errorElement
    children: [{ path: "", element: <Dashboard /> }],
  },
]);
```
