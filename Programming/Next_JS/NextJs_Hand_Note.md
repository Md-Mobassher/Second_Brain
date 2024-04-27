# Next.js Hand Note

### Next.js : The React Framework for the web

### Super Powers

1. Built in Optimizations
2. Pre-rendering (SSG + SSR) : Created blazingly fast applications because of static site generation and server side rendering
3. Next level Data Fetching
4. Poweful Routing and Layouts
5. React Server Component
6. Api Routes

### Why Next.js

**React:** The Library for web and native user interfaces. (Specially use for Dashboard related website. )

**Next.js:** The React Framework for the web to create full stack web application

### What is Rendering?

Rendering a webpage is the process of turning HTML , CSS and JavaScript code into an interactive page that website visitors expect to see.

#### Rendering

1. **Pre-Rendering (Performance optimization)**
   যাবতীয় কাজ হবে সার্ভারে। সার্ভার থেকেই এইচটিএমএল সিএসএস সব ক্রিয়েট হবে ব্রাউজারে এসে ভিজিবল হবে। ব্রাউজারে কোন কাজ হবে না।

   - Static Site Generation (SSG)
   - Server Side Rendering (SSR)

2. **Client Site Rendering**
   সার্ভার থেকে শুধু একটা রুট এইচটিএমএল আসবে, বাকি সব জাভাস্ক্রিপ্ট বান্ডেল আকারে আসবে । এসে এইচটিএমএল ক্রিয়েট করা থেকে শুরু করে সবকিছু ব্রাউজারে কাজ হবে

### Next.js project create

```npm
npx create-next-app@latest
```

```yarn
yarn create next-app your-app-name
```

```
√ What is your project named? ... my-first-next-project
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
? Would you like to use App Router? (recommended) » No / Yes                    √ Would you like to customize the default import alias (@/*)? ... No / Yes
Creating a new Next.js app in D:\Projects-(Level-2)\my-next-firstproject.
? Would you like to customize the default import alias (@/*)? » No / Yes        Using npm.
```

---

### Routing

create `folder` into `app` folder. `folderName` will be the `routeName`. create a file name `page.jsx` into the folder. `page.jsx` must be small letter.

- `src`

  - `app` - **server component**
    - `Home`
      - **page.tsx**
      - **Home.module.css**
    - `about`
      - **page.tsx**
      - **About.module.css**
    - `products`
      - **page.tsx**
      - `product` - **Nested route**
        - **page.tsx**
      - `[productId]` - use `[]` for **Dynamic route**
        - **page.tsx**
      - `[...slug]` - **Catch All route**
        - **page.tsx**
    - `contact`
      - **page.tsx**
      - **Contact.module.css**
  - **layout.tsx**
  - **page.tsx**
  - **not-found.tsx**
  - **loading.tsx**
  - **error.tsx**

  - `components` - **client component**

    - `shared`
      - **Navbar.tsx**
      - **Footer.tsx**
    - `ui`
      - **Counter.tsx** - use `"use client"` top of the component
      - **Button.tsx**

  - `(withLayout)` - use `()` for **group routing**
    - `dashboard`
      - `admin`
        - **page.tsx**
      - `user`
        - **page.tsx**
      - **layout.tsx**

---

### MetaData

### [Static Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata)

`MetaData` works only `server components`

```
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default function Page() {}
```

### [Dynamic Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata)

```
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function Page({ params, searchParams }: Props) {}
```

---

## Image Optimization

1. Import `Image` from `next/image`. Give width and height property

```
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  )
}
```

- use fill attribute to show full window

2. configure `next.config.js` file. Write domain of external image

```
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["daisyui.com"],
  },
};

module.exports = nextConfig;
```

3. `<img />` tag do not support local image. Need to use `<Image />` component from `next/image`

---

## Font Optimization

```
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Data Fetch

**Fetch work only,**

1. Must be Server Component
2. Function must be async function

#### SSG - Static Site Generation

```
const HomePage = async () => {
const res = await fetch("http:localhost:5000/product", {
   cache: "force-cache" // for caching
   },
)
const shoes = await res.json()

return (
	<div>
		{
		  shoes.slice(0,3).map((shoe) => (
		  <div key={shoe.id}>
		    <h1>{shoe.name}</h1>
		  </div>
		  ))
		}
	</div>
  )
}
```

- But here is a small issue, when update any data, it do not show automatically. you need to rebuild and then deploy to see updated content.

- To solve the issue we use ISR. `revalidation : 30` it automatically rebuild after 30 second of changed data. then fetch it.

#### ISR - Incremental Static Regeneration

```
const HomePage = async () => {
const res = await fetch("http:localhost:5000/product", {
     next: {
	   revalidate: 30  //
      }
   }
)
const shoes = await res.json()

return (
	<div>
		{
		  shoes.slice(0,3).map((shoe) => (
		  <div key={shoe.id}>
		    <h1>{shoe.name}</h1>
		  </div>
		  ))
		}
	</div>
  )
}
```

#### SSR - Server Side Rendering

```
const HomePage = async () => {
const res = await fetch("http:localhost:5000/product", {
     cache: "no-store"  //
   }
)
const shoes = await res.json()

return (
	<div>
		{
		  shoes.slice(0,3).map((shoe) => (
		  <div key={shoe.id}>
		    <h1>{shoe.name}</h1>
		  </div>
		  ))
		}
	</div>
  )
}
```

---

## Error Handling

Create a file `error.js` under `app` folder.

```
"use client"

const ErrorPage = ({error, reset}) => {
return (
<div>
	<h1>
</div>
)
}
```

---

## Server Action

Create `src/actions/fileName.ts`

```
import { IBlog } from "@/type";

export const createBlog = async (data: IBlog) => {
  const res = await fetch("http://localhost:5000/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const blogInfo = await res.json();
  console.log(blogInfo);
  return blogInfo;
};
```
