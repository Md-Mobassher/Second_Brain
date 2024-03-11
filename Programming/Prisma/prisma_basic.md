# Prisma

## Basic Commands

- I`nstall prisma globally` to your machine

```
npm install prisma -g
```

- Prisma `project create`

```
npx prisma init
```

- `Data model map `to your database schema

```
npx prisma migrate
```

- Install `prisma client`

```
npm install @prisma/client
```

- `Prisma ORM Class` create

```
npx prisma generate
```

- Open `Prisma studio` in your browser

```
npx prisma studio
```

- Prisma `database deploy`

```
npx prisma deploy
```

## Other commands

- Schema introspect from existing database

```
npx prisma introspect
```

- `prisma migrate` to an `existing database`

```
npx prisma migrate dev
```

- Prisma migrate to a stageing database

```
npx prisma migrate stage
```

- Prisma migrate to a production database

```
npx prisma migrate prod
```

---

### Types

- পূর্ণসংখ্যা - `Int`
- ফ্লোটিং পয়েন্ট সংখ্যা - `Float`
- এ সিকুয়েন্স অফ ইউনিকোড ক্যারেক্টারস - `String`
- স্কেলার লিস্ট - `[String]`
- বুলিয়ান - `Boolean`
- ৮ বাইটের পূর্ণসংখ্যা - `BigInt`
- ডেসিমাল নাম্বার - `Decimal`
- টাইমস্ট্যাম্প - `Datetime`
- জেসন ডেটা - `Json`
- বাইট - `Bytes`

### Functions

- ইউনিক আইডি এবং ইনক্রিমেন্ট - `@id @default(autoincrement())`
- ইউনিক আইডি এবং কলিশন রেজিস্টেন্ট আইডি - `@id @default(cuid())`
- বর্তমান টাইমস্ট্যাম্প - `@default(now())`

### Attributes

- ইউনিক আইডি - `@id`
- ইউনিক - `@unique`
- রিলেশন - `@relation`
- আপডেট অন ক্রিয়েট - `@updatedAt`
- ইগনোর ক্রিয়েট - `@ignore`
