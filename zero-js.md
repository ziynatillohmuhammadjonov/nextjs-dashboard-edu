Server Actions — Formlar va “Zero-JS” yondashuvi

Bugungi mavzu juda muhim, chunki bu yerda Next.js frontenddan backendga qanday qilib to‘g‘ridan-to‘g‘ri ma’lumot yuborishini ko‘ramiz.

Bugungi amaliy topshiriq:

Server Action orqali formadan ma’lumot olib, PostgreSQL bazasiga yozish.

Dars davomida oddiy:

Form ↓ Server Action ↓ Validation ↓ Database

oqimini quramiz.

1. Lesson Goal 🎯

Dars oxirida siz:

Server Action nima ekanini; "use server" nima qilishini;

<form action={...}> qanday ishlashini;
formani JavaScript'siz yuborishni;
FormData bilan ishlashni;
Server Action ichida DB'ga yozishni;
validation qilishni;
error/success holatlarini boshqarishni;
Server Action va API Route farqini

amaliy tushunasiz.

Va eng muhimi:

Server Action — API Route'ning o‘rnini har doim bosadigan sehrli texnologiya emas.

Qaysi holatda Server Action, qaysi holatda API kerakligini ham tushunamiz.

2. Warm-up — 10 daqiqa 🔥

Oldingi darslardan bir nechta savol.

Savol 1

Next.js App Router'da:

app/ ├── page.tsx ├── loading.tsx └── layout.tsx

page.tsx default holatda qanday component?

A) Client Component B) Server Component

Savol 2

Quyidagilardan qaysi biri serverda bajariladi?

export default async function Page() { const response = await fetch("/api/products");

    return <div>Products</div>;

} Savol 3

SSR bilan SSG farqi nima?

SSR ? SSG ? Bugungi mavzuga o'tish

Tasavvur qiling:

User ↓ Name input ↓ Email input ↓ Submit

Oldin React'da ko‘pincha:

"use client";

const [name, setName] = useState("");

async function handleSubmit() { await fetch("/api/users", { method: "POST", body: ... }); }

qilardik.

Bu yerda:

Browser ↓ JavaScript ↓ fetch() ↓ API ↓ Database

Bugun esa boshqa yo‘l:

Browser ↓

<form>
   ↓
Server Action
   ↓
Database

JavaScript bilan qo‘lda fetch() yozish shart emas.

Mana shu — Zero-JS form approach.

3. 🚩 Server Action nima? Definition

Server Action — serverda bajariladigan async function bo‘lib, uni UI'dan action sifatida chaqirish mumkin.

Masalan:

async function createUser(formData: FormData) { "use server";

    // server code

}

Bu function:

Browser ↓ Form submit ↓ Next.js ↓ createUser()

orqali serverda ishlaydi.

4. Nega Server Action kerak?

Oddiy API approach:

React Form ↓ onSubmit() ↓ fetch() ↓ POST /api/users ↓ route.ts ↓ database

Server Action:

React Form ↓ action={createUser} ↓ Server Action ↓ database

Kod ancha qisqaradi.

5. “Zero-JS” deganda nima nazarda tutiladi?

Bu juda muhim.

Zero-JS degani Next.js umuman JavaScript ishlatmaydi degani emas.

Ma'nosi:

Form submission uchun siz client-side JavaScript yozishingiz shart emas.

Masalan:

<form action={createUser}>
    <input name="name" />
    <input name="email" />

    <button type="submit">
        Create
    </button>

</form>

Bu yerda:

onSubmit={...}

yo‘q.

fetch(...)

yo‘q.

useState(...)

yo‘q.

"use client"

ham shart emas.

6. Birinchi Server Action

Project:

app/ ├── users/ │ ├── page.tsx │ └── actions.ts │ └── page.tsx

actions.ts:

"use server";

export async function createUser(formData: FormData) { const name = formData.get("name"); const email = formData.get("email");

    console.log(name);
    console.log(email);

}

Endi:

page.tsx

import { createUser } from "./actions";

export default function UsersPage() { return ( <form action={createUser}> <input
                name="name"
                placeholder="Name"
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
            />

            <button type="submit">
                Create
            </button>
        </form>
    );

} 7. Bu qanday ishlayapti?

Eng muhim qism.

<form action={createUser}>

Bu:

“Form submit bo‘lganda createUser Server Action'ini chaqir.”

degan ma'noni beradi.

Formadagi:

<input name="name" />

va

<input name="email" />

qiymatlari:

FormData

ichiga tushadi.

8. FormData nima?

Masalan user:

Name: Ali Email: ali@gmail.com

kiritsa.

Server Action:

export async function createUser(formData: FormData) {

ichiga taxminan:

FormData ├── name = "Ali" └── email = "ali@gmail.com"

keladi.

Olish:

const name = formData.get("name"); const email = formData.get("email"); 9. 🚩 name atributi juda muhim

Mana buni:

<input placeholder="Name" />

deb yozsak:

formData.get("name")

ishlamaydi.

Chunki:

name

atributi yo‘q.

To‘g‘ri:

<input
    name="name"
    placeholder="Name"
/>

Endi:

formData.get("name");

ishlaydi.

10. FormData qiymatining type'i

Mana:

const name = formData.get("name");

TypeScript buni:

FormDataEntryValue | null

deb ko‘radi.

Chunki get():

string qaytarishi mumkin; File qaytarishi mumkin; null qaytarishi mumkin.

Oddiy text formalar uchun:

const name = formData.get("name");

if (typeof name !== "string") { throw new Error("Invalid name"); }

qilish mumkin.

11. Database'ga yozamiz 🚀

Endi real project qilamiz.

Masalan PostgreSQL.

Database:

users

Table:

id name email created_at

Architecture:

Browser │ │ submit ▼

<form>
   │
   ▼
Server Action
   │
   ├── Validation
   │
   └── Database
          │
          ▼
      PostgreSQL
12. Prisma bilan qilamizmi?

Oldingi darsda siz bilan muhokama qilganimizdek, Prisma majburiy emas.

Masalan:

Next.js ↓ pg ↓ PostgreSQL

bilan ham ishlash mumkin.

Bugungi dars uchun men pg orqali ko‘rsataman, chunki bu Server Action'ning o‘zini yaxshiroq ko‘rsatadi.

13. Database connection

O‘rnatish:

npm install pg npm install -D @types/pg

File structure:

src/ ├── app/ │ └── users/ │ ├── page.tsx │ └── actions.ts │ └── lib/ └── db.ts 14. lib/db.ts import { Pool } from "pg";

export const db = new Pool({ connectionString: process.env.DATABASE_URL, });

.env.local:

DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb 15. Server Action

actions.ts:

"use server";

import { db } from "@/lib/db";

export async function createUser(formData: FormData) { const name = formData.get("name"); const email = formData.get("email");

    if (
        typeof name !== "string" ||
        typeof email !== "string"
    ) {
        throw new Error("Invalid form data");
    }

    if (!name.trim() || !email.trim()) {
        throw new Error("Name and email are required");
    }

    await db.query(
        `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        `,
        [name.trim(), email.trim()]
    );

} 16. Nega $1, $2?

❌ Bunday yozish xavfli:

await db.query(`    INSERT INTO users (name, email)     VALUES ('${name}', '${email}')`);

Chunki SQL Injection xavfi paydo bo‘ladi.

To‘g‘ri:

await db.query( `     INSERT INTO users (name, email)     VALUES ($1, $2)     `, [name, email] );

Bu parameterized query.

Database driver qiymatlarni query'dan alohida uzatadi.

17. Page import { createUser } from "./actions";

export default function UsersPage() { return ( <main> <h1>Create User</h1>

            <form action={createUser}>
                <div>
                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                    />
                </div>

                <button type="submit">
                    Create User
                </button>
            </form>
        </main>
    );

} 18. Natijada nima bo‘ladi?

User:

Name [ Ali ]

Email [ ali@gmail.com ]

[ Create User ]

tugmasini bosadi.

Browser:

<form>
    ↓
Server Action

Server:

createUser() ↓ formData ↓ validation ↓ INSERT

Database:

users

| id  | name | email         |
| --- | ---- | ------------- |
| 1   | Ali  | ali@gmail.com |

🎉

Biz API route yozmasdan database'ga ma'lumot yozdik.

19. Nega bu “Zero-JS”?

Bizning:

page.tsx

ichida:

"use client";

yo‘q.

useState()

yo‘q.

useEffect()

yo‘q.

fetch()

yo‘q.

onSubmit()

yo‘q.

Faqat:

<form action={createUser}>
20. Server Action qayerda ishlayapti?

Mana bu:

"use server";

export async function createUser() { // ... }

server-only code sifatida ishlaydi.

Shuning uchun:

process.env.DATABASE_URL

kabi server secret'larini shu yerda ishlatish mumkin.

Lekin:

"use client";

component ichiga database connection olib kirish — noto‘g‘ri.

21. Server Action vs API Route

Bu juda muhim interview savol.

Server Action UI ↓ Server Action ↓ DB

Asosan:

form submit mutation create update delete

uchun juda qulay.

API Route Client ↓ HTTP ↓ /api/users ↓ Route Handler ↓ DB

API:

mobile app; external frontend; third-party client; public API; webhook; HTTP API

uchun kerak bo‘lishi mumkin.

22. Real projectda

Masalan bizda:

Next.js ├── Admin Panel ├── Blog ├── Dashboard └── User UI

bo‘lsa.

Admin:

Create Product ↓ Server Action ↓ Database

juda yaxshi variant.

Lekin mobil app:

React Native ↓ HTTP API ↓ Laravel/NestJS ↓ Database

bo‘lishi mumkin.

Shuning uchun:

Server Action = API'ni butunlay yo‘q qiladi

degan fikr noto‘g‘ri.

23. Validation — production'da juda muhim

HTML:

<input required />

yaxshi.

Lekin bu yetarli emas.

Serverda ham:

if (!name.trim()) { throw new Error("Name is required"); }

tekshirish kerak.

Sababi:

Browser validation ↓ ❌ Security boundary emas

Server validation:

Server ↓ Trust boundary 24. Zod bilan yanada yaxshi

Production projectda Zod ishlatish mumkin.

npm install zod

Schema:

import { z } from "zod";

const createUserSchema = z.object({ name: z.string().min(2).max(100), email: z.string().email(), });

Action:

"use server";

import { z } from "zod"; import { db } from "@/lib/db";

const createUserSchema = z.object({ name: z.string().min(2).max(100), email: z.string().email(), });

export async function createUser(formData: FormData) { const result = createUserSchema.safeParse({ name: formData.get("name"), email: formData.get("email"), });

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    await db.query(
        `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        `,
        [
            result.data.name,
            result.data.email,
        ]
    );

    return {
        success: true,
    };

}

Bu ancha production-friendly.

25. Server Action'dan return qilish

Action:

return { success: true, };

yoki:

return { success: false, errors: { email: ["Invalid email"], }, };

qaytarishi mumkin.

Keyin UI bu state'ni ko‘rsatishi mumkin.

Bu bizni keyingi muhim mavzuga olib keladi:

Server Action ↓ Action State ↓ useActionState ↓ Form Errors ↓ Pending State

Buni keyingi bosqichda chuqurroq ko‘ramiz.

26. 🚩 Remember Server Action

Definition

Serverda bajariladigan async function.

Why it matters

Form mutationlarni API route + manual fetchsiz yozishga imkon beradi.

Where used

Create Update Delete Form submission Database mutation

Common mistakes

❌ Database kodini Client Component'ga qo‘yish

❌ "use server"ni unutish

❌ faqat browser validationga ishonish

❌ SQL query'ni string interpolation bilan yaratish

❌ Server Action'ni har qanday API o‘rniga ishlatish

27. Live Coding checkpoint 🛑

Bu joyda darsni to‘xtatib, o‘zingiz yozib ko‘ring.

Vazifa

Quyidagi structure yarating:

src/ ├── app/ │ └── products/ │ ├── page.tsx │ └── actions.ts │ └── lib/ └── db.ts

Form:

Product name Price Description

Submit:

Create Product

Server Action:

createProduct()

Database:

## products

id name price description created_at

Flow:

Form ↓ Server Action ↓ Validation ↓ INSERT ↓ PostgreSQL

Checkpoint: avval faqat form + FormDatani ishlating. Database qismini keyin qo‘shing.

28. Practice 🏋️ 🟢 Easy

User form:

name email

Server Action orqali database'ga yozing.

🟡 Medium

Product form:

name price description

Validation:

name → minimum 3 characters price → > 0 description → minimum 10 characters 🔴 Hard

Admin panel uchun:

Create Category

Form:

name slug description

Server Action:

createCategory()

talablar:

name required slug required slug unique description optional

Agar slug mavjud bo‘lsa:

Slug already exists

qaytarsin.

29. Mini Project 🚀 Product Management

Bugungi darsni kichik real-world projectga aylantiramiz.

/admin/products

        Products

[ Create Product ]

Name [____________]

Price [____________]

Description [____________]

[ Save Product ]

Architecture:

                    Next.js

┌─────────────────────────────────┐ │ │ │ Create Product Form │ │ │ └───────────────┬─────────────────┘ │ ▼ createProduct() Server Action │ ▼ Zod Validation │ ▼ PostgreSQL

Keyingi bosqichlarda bunga:

loading success errors redirect revalidatePath authentication authorization

qo‘shamiz.

Shunda bu haqiqiy Admin Panel arxitekturasiga yaqinlashadi.

30. Homework 📝
1. Theory

Quyidagilarni o‘z so‘zingiz bilan tushuntiring:

Server Action nima? "use server" nima qiladi? FormData nima? Zero-JS form nima? Server Action va API Route farqi nima? 2. Coding

products CRUD'ining faqat:

CREATE

qismini qiling.

3. Security

Quyidagi ikkita queryni solishtiring:

VALUES ('${name}')

va:

VALUES ($1)

Nima uchun ikkinchisi xavfsizroq?

31. Quiz 🧠
1. Server Action qayerda bajariladi?

A) Browser B) Server C) Database D) CSS

2. FormData olish uchun nima ishlatiladi? formData.???
3. Server Actionni belgilash uchun nima yoziladi? ???
4. Qaysi biri Zero-JS formga yaqin?

A)

<form onSubmit={handleSubmit}>

B)

<form action={createUser}>
5. React Native application uchun Server Action'dan ko‘ra qaysi architecture ko‘proq mos keladi?
React Native
      ↓
      ?
32. Interview Questions 💼

Junior/Middle interviewda quyidagilarni so‘rashi mumkin:

Q1

What are Server Actions in Next.js?

Q2

What is the difference between Server Actions and Route Handlers?

Q3

Can Server Actions access a database directly?

Q4

Does Server Action mean there is no JavaScript?

Q5

How do you validate form data in a Server Action?

Q6

How do you handle errors from Server Actions?

Q7

When would you prefer an API over Server Actions?

33. Git commit

Bugungi dars uchun:

git add .

git commit -m "feat: add server action for product creation" 🧩 Bugungi eng muhim mental model

Buni yodlash emas, tushunish kerak:

Eski mental model Form ↓ Client JavaScript ↓ fetch() ↓ API ↓ Server ↓ Database Server Actions Form ↓ Server Action ↓ Validation ↓ Database

Lekin real production architecture'da:

                 Next.js
                   │
        ┌──────────┴──────────┐
        │                     │
     UI Form              External API
        │                     │
        ▼                     ▼

Server Action API Route / Backend │ │ └──────────┬──────────┘ ▼ Service │ ▼ Repository │ ▼ PostgreSQL

Bu ayniqsa siz o‘rganayotgan Laravel + Next.js stack uchun muhim: Server Action frontend mutationlarini juda qulay qiladi, lekin business logic'ni tartibsiz ravishda actions.ts ichiga tiqib tashlash production'da yaxshi arxitektura emas.

Keyingi bosqichda aynan useActionState, validation errors, pending state, revalidatePath() va redirect() bilan Server Action'ni haqiqiy production formga aylantirish mantiqan to‘g‘ri bo‘ladi. Albatta. Aslida Server Action'ni faqat form action={createUser} bilan tugatib qo‘yish yetarli emas. Real loyihada userga:

saqlanayotganini ko‘rsatish; validation xatolarini ko‘rsatish; serverdan kelgan errorni ko‘rsatish; muvaffaqiyatli saqlanganda xabar berish

kerak bo‘ladi.

Shuning uchun endi quyidagi oqimni quramiz:

Form ↓ Server Action ↓ Action State ↓ useActionState() ↓ ┌───────────────┐ │ pending │ │ validation │ │ server error │ │ success │ └───────────────┘ ↓ UI

1. Action State nima?

Avval oddiy Server Actionimiz bor edi:

export async function createUser(formData: FormData) { "use server";

    // validation
    // database insert

}

Endi undan natija qaytaramiz:

return { success: true, message: "User created successfully", };

yoki:

return { success: false, message: "Validation failed", errors: { name: ["Name is required"], email: ["Invalid email"], }, };

Demak Action State — Server Action bajarilgandan keyin UI bilishi kerak bo‘lgan holat.

Masalan:

success message errors 2. useActionState nima?

🚩 Remember

useActionState — React hook bo‘lib, Server Action'dan qaytgan state'ni Client Component ichida boshqarishga yordam beradi.

Mental model:

Server Action ↓ return ↓ useActionState ↓ state ↓ UI

Masalan:

const [state, formAction] = useActionState( createUser, initialState );

Bu yerda ikkita juda muhim qiymat chiqadi:

state formAction 3. initialState

Masalan:

const initialState = { success: false, message: "", errors: {}, };

Bu formaning boshlang‘ich holati.

Keyin:

const [state, formAction] = useActionState( createUser, initialState );

Natijada:

state ├── success ├── message └── errors

formAction └── form action sifatida ishlatiladi 4. Muhim o‘zgarish

Oldin:

<form action={createUser}>

edi.

Endi:

<form action={formAction}>

bo‘ladi.

Ya'ni:

                    ┌──────────────┐
                    │ createUser   │
                    │ Server Action│
                    └──────┬───────┘
                           │
                           ▼
                    useActionState
                           │
                     formAction
                           │
                           ▼
                         <form>

5. To‘liq misol

Biz User formamizni davom ettiramiz.

File structure src/ ├── app/ │ └── users/ │ ├── page.tsx │ └── actions.ts │ └── lib/ └── db.ts 6. Server Action

actions.ts:

"use server";

import { db } from "@/lib/db";

export async function createUser( prevState: any, formData: FormData ) { const name = formData.get("name"); const email = formData.get("email");

    if (typeof name !== "string" || !name.trim()) {
        return {
            success: false,
            message: "Validation failed",
            errors: {
                name: ["Name is required"],
            },
        };
    }

    if (typeof email !== "string" || !email.trim()) {
        return {
            success: false,
            message: "Validation failed",
            errors: {
                email: ["Email is required"],
            },
        };
    }

    await db.query(
        `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        `,
        [name.trim(), email.trim()]
    );

    return {
        success: true,
        message: "User created successfully",
        errors: {},
    };

}

Bu yerda yangi narsa bor:

prevState 7. prevState nima?

Server Action endi:

export async function createUser( prevState, formData )

ko‘rinishida.

Birinchi argument:

prevState

oldingi state.

Ikkinchisi:

formData

formadan kelgan ma'lumot.

Ya'ni:

createUser( previousState, formData ) 8. useActionState

Endi Client Component kerak.

page.tsxni ikki qismga ajratishimiz mumkin:

users/ ├── page.tsx └── create-user-form.tsx

Nega?

Chunki:

useActionState()

Client Hook.

Shuning uchun uni Client Component ichida ishlatamiz.

9. create-user-form.tsx "use client";

import { useActionState } from "react"; import { createUser } from "./actions";

const initialState = { success: false, message: "", errors: {}, };

export default function CreateUserForm() { const [state, formAction] = useActionState( createUser, initialState );

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="name">
                    Name
                </label>

                <input
                    id="name"
                    name="name"
                />

                {state.errors?.name && (
                    <p>
                        {state.errors.name[0]}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                />

                {state.errors?.email && (
                    <p>
                        {state.errors.email[0]}
                    </p>
                )}
            </div>

            {state.message && (
                <p>
                    {state.message}
                </p>
            )}

            <button type="submit">
                Create User
            </button>
        </form>
    );

} 10. page.tsx

Endi:

import CreateUserForm from "./create-user-form";

export default function UsersPage() { return ( <main> <h1>Create User</h1>

            <CreateUserForm />
        </main>
    );

} 11. Endi qanday ishlaydi?

User:

Name [ ]

Email [ ]

[ Create User ]

submit qiladi.

↓

formAction

↓

createUser()

↓

Validation

↓

Agar xato:

return { success: false, errors: { email: ["Email is required"], }, };

↓

useActionState state'ni yangilaydi.

↓

React UI:

Email [ ]

Email is required 12. Demak state — Server Action javobi

Masalan:

const [state, formAction] = useActionState( createUser, initialState );

Server:

return { success: false, message: "Validation failed", errors: { email: ["Invalid email"], }, };

Client:

state.success

↓

false state.message

↓

Validation failed state.errors.email

↓

["Invalid email"] 13. Endi eng muhim qism: Pending State ⏳

Tasavvur qiling:

User:

[ Create User ]

bosdi.

Server:

       INSERT
          ↓
     PostgreSQL
          ↓
      800ms

shu vaqt davomida button hali ham:

[ Create User ]

bo‘lib turibdi.

User yana bosishi mumkin:

Create Create Create

😄

Natijada duplicate requestlar paydo bo‘lishi mumkin.

Shuning uchun:

Submitting...

ko‘rsatishimiz kerak.

14. useFormStatus

Buning uchun:

import { useFormStatus } from "react";

ishlatamiz.

Lekin muhim qoida bor:

useFormStatus() formning o‘zida emas, form ichidagi child componentda ishlatiladi.

Masalan:

function SubmitButton() { const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
        >
            {pending ? "Creating..." : "Create User"}
        </button>
    );

} 15. To‘liq form "use client";

import { useActionState, } from "react";

import { useFormStatus, } from "react-dom";

import { createUser } from "./actions";

const initialState = { success: false, message: "", errors: {}, };

function SubmitButton() { const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
        >
            {pending
                ? "Creating..."
                : "Create User"}
        </button>
    );

}

export default function CreateUserForm() { const [state, formAction] = useActionState( createUser, initialState );

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="name">
                    Name
                </label>

                <input
                    id="name"
                    name="name"
                />

                {state.errors?.name && (
                    <p>
                        {state.errors.name[0]}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                />

                {state.errors?.email && (
                    <p>
                        {state.errors.email[0]}
                    </p>
                )}
            </div>

            {state.message && (
                <p>
                    {state.message}
                </p>
            )}

            <SubmitButton />
        </form>
    );

} 16. pending qayerdan keladi?

Mana:

const { pending } = useFormStatus();

Form submit qilinmagan:

pending = false

Submit qilindi:

pending = true

Server Action tugadi:

pending = false

Shuning uchun:

{pending ? "Creating..." : "Create User"}

ishlaydi.

17. To‘liq lifecycle

Endi butun jarayonni ko‘raylik.

                 USER
                  │
                  ▼
              Submit Form
                  │
                  ▼
          ┌───────────────┐
          │    pending    │
          │     true      │
          └───────┬───────┘
                  │
                  ▼
           Server Action
                  │
                  ▼
             Validation
             /         \
          Error        OK
            │           │
            ▼           ▼
         return       INSERT
         errors          │
            │            ▼
            │        PostgreSQL
            │            │
            └──────┬─────┘
                   ▼
             Action State
                   │
                   ▼
                  UI

Bu — Server Action bilan ishlashning eng muhim mental modeli.

18. Zod bilan production variant

Endi buni real project darajasiga olib chiqamiz.

import { z } from "zod";

const createUserSchema = z.object({ name: z .string() .trim() .min(2, "Name must be at least 2 characters") .max(100),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

});

Action:

"use server";

import { z } from "zod"; import { db } from "@/lib/db";

const createUserSchema = z.object({ name: z .string() .trim() .min(2, "Name must be at least 2 characters") .max(100),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

});

export async function createUser( prevState: any, formData: FormData ) { const result = createUserSchema.safeParse({ name: formData.get("name"), email: formData.get("email"), });

    if (!result.success) {
        return {
            success: false,
            message: "Please fix the errors",
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await db.query(
            `
            INSERT INTO users (name, email)
            VALUES ($1, $2)
            `,
            [
                result.data.name,
                result.data.email,
            ]
        );

        return {
            success: true,
            message: "User created successfully",
            errors: {},
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong",
            errors: {},
        };
    }

}

Bu variant ancha yaxshi.

19. Nega safeParse()?

Agar:

schema.parse()

ishlatsak, validation xatosida exception throw qiladi.

safeParse() esa:

success = true

yoki:

success = false

qaytaradi.

Shuning uchun form validation uchun juda qulay:

const result = schema.safeParse(data); 20. TypeScript bilan yanada yaxshi

any ishlatish:

prevState: any

production'da yaxshi emas.

State type yaratamiz:

type FormState = { success: boolean; message: string; errors: { name?: string[]; email?: string[]; }; };

Initial state:

const initialState: FormState = { success: false, message: "", errors: {}, };

Action:

export async function createUser( prevState: FormState, formData: FormData ): Promise<FormState> { // ... }

Endi TypeScript bizni himoya qiladi.

21. Server Action'da try/catch

Database xatosini ham boshqarishimiz kerak.

try { await db.query(...);

    return {
        success: true,
        message: "User created successfully",
        errors: {},
    };

} catch (error) { console.error(error);

    return {
        success: false,
        message: "Unable to create user",
        errors: {},
    };

}

Userga:

Database connection failed PostgreSQL error 23505 Stack trace...

ko‘rsatish shart emas.

Server logida saqlaymiz, UI'ga esa:

Unable to create user

kabi xavfsiz message beramiz.

22. Duplicate email

Faraz qilaylik:

email UNIQUE

Database:

ali@gmail.com

allaqachon mavjud.

User yana:

ali@gmail.com

yubordi.

Database error beradi.

Production'da uni:

Email already exists

ga aylantirishimiz mumkin.

Bu yerda database constraint ham kerak:

UNIQUE(email)

Faqat frontend validationga ishonmaslik kerak.

23. useActionState + useFormStatus

Ularning vazifasini aralashtirmang.

useActionState

Server Action natijasi bilan ishlaydi:

success errors message data useFormStatus

Formaning hozirgi submission holati bilan ishlaydi:

pending

Mental model:

useActionState ↓ "What happened?"

useFormStatus ↓ "Is it happening now?"

Bu juda yaxshi eslab qolish usuli.

24. Real production flow

Endi bizda:

                    FORM
                     │
                     ▼
              useFormStatus
                     │
                  pending
                     │
                     ▼
              Server Action
                     │
                     ▼
                  Zod
                     │
              ┌──────┴──────┐
              │             │
           invalid        valid
              │             │
              ▼             ▼
           errors        Database
              │             │
              │             ▼
              │           success
              │             │
              └──────┬──────┘
                     ▼
               useActionState
                     │
                     ▼
                    UI

Mana endi bu oddiy demo emas, real form architecturega yaqinlashdi.

25. Keyingi muhim narsa: revalidatePath()

Database'ga yozdik:

INSERT ↓ PostgreSQL

Lekin sahifada oldingi data turishi mumkin.

Masalan:

/products

sahifasida:

iPhone MacBook Keyboard

bor.

Yangi:

Monitor

qo‘shdik.

Database:

iPhone MacBook Keyboard Monitor

lekin UI hali eski ma'lumotni ko‘rsatishi mumkin.

Shunda:

revalidatePath("/products");

ishlatamiz.

Flow:

Server Action ↓ INSERT ↓ revalidatePath("/products") ↓ Next.js cache invalidation ↓ Fresh data

Bu Server Actions mavzusining keyingi juda muhim qismi.

26. redirect()

Masalan user yaratildi:

Create User ↓ success ↓ /users

Server Action ichida:

redirect("/users");

qilish mumkin.

Flow:

Form ↓ Server Action ↓ DB INSERT ↓ redirect("/users") ↓ Users List

Shunda:

Create User

formasi muvaffaqiyatli tugagach:

/users

ga o'tadi.

27. Bugungi mavzuning to‘liq rasmi

Hozirgacha:

                  Next.js
                     │
             ┌───────┴────────┐
             │                │
           Form             Server
             │                │
             ▼                │
      useActionState           │
             │                │
             ▼                │
        formAction ───────────►│
                              │
                              ▼
                        Server Action
                              │
                              ▼
                             Zod
                              │
                              ▼
                          PostgreSQL
                              │
                              ▼
                     Action State
                              │
                              ▼
                             UI

Va submission paytida:

useFormStatus ↓ pending ↓ "Creating..." 🧠 Eng muhim 5 ta tushuncha Texnologiya Vazifasi Server Action Serverda mutation bajaradi FormData Form ma'lumotlarini olib keladi useActionState Action natijasini UI'ga olib keladi useFormStatus Form submit holatini kuzatadi Zod Server-side validation

Buni quyidagicha tasavvur qiling:

                 FORM
                  │
                  ▼
              FormData
                  │
                  ▼
           Server Action
                  │
                  ├── Zod
                  │
                  ├── Database
                  │
                  ▼
            Action State
                  │
                  ▼
                  UI

va parallel ravishda:

Form ↓ useFormStatus ↓ pending ↓ Loading UI 🎯 Mini Practice

Hozir Product uchun quyidagi formani o‘zingiz qurishga harakat qiling:

Product name [________________]

Price [________________]

Description [________________]

[ Create Product ]

Talablar:

name → min 3 characters price → number > 0 description → min 10 characters

Natija:

Xato: Product name [ab]

Name must be at least 3 characters

Price [0]

Price must be greater than 0

[ Creating... ] Muvaffaqiyat: ✓ Product created successfully

Architecture:

ProductForm ↓ useActionState ↓ formAction ↓ createProduct() ↓ Zod ↓ PostgreSQL ↓ return state ↓ UI

Keyingi qadamda aynan shu Product formni revalidatePath() + redirect() bilan bog‘lab, Products List → Create Product → DB → List yangilanishi to‘liq CRUD flow'ining CREATE qismini qurish eng foydali bo‘ladi.
