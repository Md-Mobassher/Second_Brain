# Next-Auth

1. Install `next-auth`

```npm
npm install next-auth
```

```yarn
yarn add next-auth
```

2. Create `src/app/api/auth/[...nextauth]/route.ts`

```
import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }
```

3. Create `src/utils/authOptions.ts`

```
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
```

4. add `authOptions` into `src/app/api/auth/[...nextauth]/route.ts`

```
import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

---

### Github Authentication

- Go to [documentation](https://next-auth.js.org/providers/github)

```
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};

```

- use this to Github Button

```
<button className="btn btn-circle" onClick={() => signIn("github", {
  callbackUrl: "http://localhost:3000/dashboard",
})}>
 <Image
   src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
   width={35}
   height={35}
   alt="github logo"
 />
</button>
```

- After successfully login `nextauth` automatically set the user info into `cookies`

- Show user info to dashboard

```
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session?.user && (
        <>
          <h1 className="text-4xl text-center mt-10">
            Welcome To {session?.user?.name}
          </h1>
          <h1 className="text-4xl text-center mt-10">
            Email: {session?.user?.email}
          </h1>
          <Image
            src={session?.user?.image}
            width={100}
            height={100}
            alt="user image"
            className="mx-auto mt-10 rounded-full"
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
```

---

### Google Authentication

- - Go to [documentation](https://next-auth.js.org/providers/goo)

```
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
 // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
```
