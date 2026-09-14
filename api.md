Next.js API Routes — Route Handlers Server-side logika yozish: “Backend-siz backend”

Bugungi darsda biz Next.js ichida backend API yozamiz. Ya’ni alohida Laravel, Express yoki NestJS server yaratmasdan, Next.js loyihamizning o‘zida HTTP API endpointlar yaratamiz.

Amaliy topshiriqda JSON ma’lumotlar bilan ishlaydigan mini Blog API yaratamiz:

GET /api/posts GET /api/posts/1 POST /api/posts PATCH /api/posts/1 DELETE /api/posts/1

Bu mavzu keyinchalik Laravel API + Next.js, authentication, database va full-stack loyihaga o'tishda juda muhim.

1. Lesson Goal 🎯

Dars oxirida o‘quvchi:

Route Handler nima ekanini; app/api/.../route.ts strukturasini; GET, POST, PATCH, DELETE requestlarni; Request va Response bilan ishlashni; NextResponsedan foydalanishni; JSON body o‘qishni; dynamic route orqali /api/posts/[id] yaratishni; HTTP status code'larni; validationning boshlang‘ich prinsiplarini

biladi.

Va eng muhimi:

Next.js frontend frameworkgina emas — server-side kod ham yozish mumkin bo‘lgan full-stack framework.

2. Warm-up — 10 min

Avval oldingi mavzularni eslaymiz.

Savol 1

Next.js App Router'da sahifa qayerda yaratiladi?

app/ └── about/ └── page.tsx

URL:

/about

To‘g‘rimi? ✅

Savol 2

Agar:

app/ └── products/ └── page.tsx

bo‘lsa:

/products

sahifa bo‘ladi.

Endi savol:

Agar:

app/ └── api/ └── products/ └── route.ts

bo‘lsa-chi?

Bu:

/api/products

API endpoint bo‘ladi.

Mana bugungi mavzuning asosiy g‘oyasi shu.

3. Nega API kerak?

Tasavvur qilamiz, bizda frontend bor:

React / Next.js │ │ HTTP Request ▼ API │ ▼ Database

Frontend database bilan to‘g‘ridan-to‘g‘ri ishlamaydi.

Masalan:

Browser │ │ GET /api/posts ▼ Next.js Server │ ▼ Database

Server database'dan ma'lumot olib:

[ { "id": 1, "title": "Next.js nima?" }, { "id": 2, "title": "React nima?" } ]

JSON qaytaradi.

🚩 Remember — API

API — Application Programming Interface.

Oddiy qilib:

API — frontend va backend orasidagi aloqa eshigi.

Masalan:

Frontend │ │ GET /api/posts ▼ API │ ▼ Database

API orqali:

ma'lumot olish; ma'lumot yaratish; o‘zgartirish; o‘chirish

mumkin.

4. Route Handler nima?

Next.js App Router'da API endpoint:

route.ts

fayli orqali yaratiladi.

Masalan:

app/ └── api/ └── posts/ └── route.ts

Bu:

/api/posts

endpointini yaratadi.

page.tsx vs route.ts

Bu farqni yaxshi tushunish kerak.

page.tsx app/posts/page.tsx

→ UI qaytaradi.

export default function PostsPage() { return <h1>Posts</h1>; } route.ts app/api/posts/route.ts

→ HTTP response qaytaradi.

export async function GET() { return Response.json({ message: "Hello API", }); }

Natija:

{ "message": "Hello API" } 5. Birinchi API yaratamiz

Project:

next-api-demo/

Struktura:

app/ ├── api/ │ └── posts/ │ └── route.ts ├── page.tsx └── layout.tsx app/api/posts/route.ts export async function GET() { return Response.json({ message: "Posts API ishlayapti", }); }

Serverni ishga tushiramiz:

npm run dev

Brauzer:

http://localhost:3000/api/posts

Natija:

{ "message": "Posts API ishlayapti" }

🎉 Bizning birinchi Next.js API'miz tayyor.

6. Nega GET yozdik?

HTTP'da turli methodlar bor:

Method Maqsad GET olish POST yaratish PUT to‘liq yangilash PATCH qisman yangilash DELETE o‘chirish

Masalan:

GET /api/posts

→ postlarni olish.

POST /api/posts

→ yangi post yaratish.

PATCH /api/posts/1

→ 1-postni o‘zgartirish.

DELETE /api/posts/1

→ 1-postni o‘chirish.

7. JSON ma'lumot bilan ishlash

Endi haqiqiyroq API qilamiz.

const posts = [ { id: 1, title: "Next.js nima?", content: "Next.js React framework.", }, { id: 2, title: "Route Handlers", content: "Next.js server-side API.", }, ];

To‘liq:

const posts = [ { id: 1, title: "Next.js nima?", content: "Next.js React framework.", }, { id: 2, title: "Route Handlers", content: "Next.js server-side API.", }, ];

export async function GET() { return Response.json(posts); }

Endi:

GET /api/posts

Natija:

[ { "id": 1, "title": "Next.js nima?", "content": "Next.js React framework." }, { "id": 2, "title": "Route Handlers", "content": "Next.js server-side API." } ] 8. POST — yangi ma'lumot yaratish

Endi client bizga JSON yuborsin:

{ "title": "React Server Components", "content": "RSC haqida..." }

Server uni qabul qilishi kerak.

export async function POST(request: Request) { const body = await request.json();

console.log(body);

return Response.json(body); }

Bu yerda:

request.json()

request body'dagi JSONni JavaScript objectga aylantiradi.

🚩 Remember — request.json()

Client:

{ "title": "Hello" }

Server:

const body = await request.json();

Natija:

{ title: "Hello" } 9. POST uchun status code

API yaxshi ishlab chiqilgan bo‘lsa, status code ham to‘g‘ri bo‘lishi kerak.

Yangi resource yaratilganda:

201 Created

ishlatamiz.

export async function POST(request: Request) { const body = await request.json();

return Response.json(body, { status: 201, }); } 10. Validation

Foydalanuvchi buni yuborishi mumkin:

{}

yoki:

{ "title": "" }

Biz bunday ma'lumotni qabul qilmasligimiz kerak.

Oddiy validation:

export async function POST(request: Request) { const body = await request.json();

if (!body.title || !body.content) { return Response.json( { message: "title va content majburiy", }, { status: 422, } ); }

return Response.json(body, { status: 201, }); }

Bu yerda:

422 Unprocessable Entity

validation xatosini bildiradi.

11. NextResponse

Next.js NextResponse ham beradi.

import { NextResponse } from "next/server";

export async function GET() { return NextResponse.json({ message: "Hello", }); }

Bu ham ishlaydi.

Oddiy API uchun:

Response.json()

yetarli bo‘lishi mumkin.

NextResponse esa Next.js'ga xos imkoniyatlar kerak bo‘lganda foydali.

Masalan:

cookies; redirects; headers; Next.js-specific response behavior. 12. Dynamic Route

Endi:

GET /api/posts/1

qilishimiz kerak.

Struktura:

app/ └── api/ └── posts/ ├── route.ts └── [id]/ └── route.ts

[id] — dynamic segment.

13. /api/posts/[id]/route.ts const posts = [ { id: 1, title: "Next.js nima?", }, { id: 2, title: "Route Handlers", }, ];

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> } ) { const { id } = await params;

const post = posts.find((post) => post.id === Number(id));

if (!post) { return Response.json( { message: "Post topilmadi", }, { status: 404, } ); }

return Response.json(post); }

Bu yerda:

/api/posts/1

uchun:

id === "1"

bo‘ladi.

Keyin:

Number(id)

qilib:

"1" → 1

aylantiramiz.

🚩 Remember — Dynamic Route [id]

degani:

URL'dagi qiymat dinamik bo‘ladi.

Masalan:

/api/posts/1 /api/posts/2 /api/posts/100

hammasi bitta:

[id]/route.ts

orqali ishlaydi.

14. DELETE

Endi postni o‘chiramiz.

export async function DELETE( request: Request, { params }: { params: Promise<{ id: string }> } ) { const { id } = await params;

return Response.json({ message: `Post ${id} o'chirildi`, }); }

Request:

DELETE /api/posts/1

Response:

{ "message": "Post 1 o'chirildi" }

Hozircha real arraydan o‘chirmayapmiz. Chunki keyingi bosqichda database bilan ishlaymiz.

15. PATCH

Postni qisman o‘zgartirish:

PATCH /api/posts/1

Body:

{ "title": "Updated title" }

Server:

export async function PATCH( request: Request, { params }: { params: Promise<{ id: string }> } ) { const { id } = await params;

const body = await request.json();

return Response.json({ id, ...body, }); }

Natija:

{ "id": "1", "title": "Updated title" } 16. Mini API'ning final strukturasi app/ │ ├── api/ │ └── posts/ │ ├── route.ts │ │ │ └── [id]/ │ └── route.ts │ ├── page.tsx └── layout.tsx

Endpointlar:

GET /api/posts POST /api/posts

GET /api/posts/:id PATCH /api/posts/:id DELETE /api/posts/:id

Bu allaqachon kichik CRUD API.

17. CRUD nima?

🚩 Remember

CRUD:

C — Create R — Read U — Update D — Delete

API'da:

POST → Create GET → Read PATCH → Update DELETE → Delete

Masalan blog:

Create → yangi post Read → postlarni ko‘rish Update → postni tahrirlash Delete → postni o‘chirish

Bu tushuncha Laravel'da ham, NestJS'da ham, Express'da ham, Django'da ham uchraydi.

18. HTTP status code'lar

O‘quvchi bularni yodlab emas, ma'nosini tushunib olishi kerak.

200

Hammasi yaxshi:

OK 201

Resource yaratildi:

Created 400

Request noto‘g‘ri:

Bad Request 401

Authentication kerak:

Unauthorized 403

Permission yo‘q:

Forbidden 404

Resource topilmadi:

Not Found 422

Validation xatosi:

Unprocessable Entity 500

Serverda xato:

Internal Server Error 19. Live Coding — Mini Blog API

Endi bitta to‘liqroq variant qilamiz.

app/api/posts/route.ts const posts = [ { id: 1, title: "Next.js nima?", content: "Next.js — React framework.", }, { id: 2, title: "Route Handlers", content: "Next.js ichida API yaratish.", }, ];

export async function GET() { return Response.json(posts); }

export async function POST(request: Request) { const body = await request.json();

if (!body.title || !body.content) { return Response.json( { message: "title va content majburiy", }, { status: 422, } ); }

const newPost = { id: posts.length + 1, title: body.title, content: body.content, };

posts.push(newPost);

return Response.json(newPost, { status: 201, }); } app/api/posts/[id]/route.ts const posts = [ { id: 1, title: "Next.js nima?", content: "Next.js — React framework.", }, { id: 2, title: "Route Handlers", content: "Next.js ichida API yaratish.", }, ];

export async function GET( request: Request, { params }: { params: Promise<{ id: string }> } ) { const { id } = await params;

const post = posts.find((post) => post.id === Number(id));

if (!post) { return Response.json( { message: "Post topilmadi", }, { status: 404, } ); }

return Response.json(post); } 20. Muhim muammo ⚠️

Bu yerda bitta juda muhim arxitektura muammosi bor.

Biz:

const posts = [...]

deb memory ichida ma'lumot saqlayapmiz.

Bu real database emas.

Server restart bo‘lsa:

POST ↓ posts.push() ↓ server restart ↓ ma'lumot yo‘q

Shuning uchun production'da:

Next.js Route Handler ↓ PostgreSQL ↓ Prisma / Drizzle / boshqa ORM

kabi architecture ishlatiladi.

Yoki:

Next.js ↓ Laravel API ↓ PostgreSQL

ham bo‘lishi mumkin.

21. Next.js'dagi "Backend-siz backend" aslida nima?

Bu iborani to‘g‘ri tushunish juda muhim.

Backend yo‘q degani emas.

Alohida backend server:

Next.js

- Laravel

bo‘lmasligi mumkin.

Buning o‘rniga:

Next.js ├── Frontend └── Server └── Route Handlers

bo‘ladi.

Ya'ni:

Browser ↓ Next.js ├── UI └── API ↓ Database

Shuning uchun:

Next.js full-stack application qurish imkonini beradi.

22. Qachon Route Handlers ishlatish yaxshi?

Kichik va o‘rta loyihalarda:

Frontend

- API
- Database

bitta Next.js application ichida bo‘lishi juda qulay.

Masalan:

Portfolio /api/contact

Contact form uchun.

Blog /api/posts /api/comments Dashboard /api/statistics /api/users E-commerce /api/products /api/cart /api/orders 23. Qachon alohida backend kerak?

Katta sistemalarda:

Next.js ↓ API Gateway ↓ Laravel / NestJS ↓ Database

kerak bo‘lishi mumkin.

Ayniqsa:

murakkab business logic; katta jamoa; mobile app; web app; admin panel; third-party integrations; microservices; kuchli authorization; katta backend ecosystem

bo‘lsa, alohida backend foydali.

Masalan:

             ┌── Next.js
             │

Client ──────┼── React Native │ └── Admin │ ▼ Laravel API │ PostgreSQL

Bu sizning kelajakdagi Laravel + Next.js loyihalaringiz uchun juda mos architecture.

24. Amaliy mashq 🧑‍💻 Easy

/api/products yarating.

GET:

GET /api/products

quyidagi JSONni qaytarsin:

[ { "id": 1, "name": "Laptop", "price": 1200 }, { "id": 2, "name": "Keyboard", "price": 100 } ] Medium

POST qo‘shing:

POST /api/products

Body:

{ "name": "Mouse", "price": 50 }

Validation:

name required price required price > 0 Hard 🔥

Dynamic API yarating:

GET /api/products/:id PATCH /api/products/:id DELETE /api/products/:id

Misol:

GET /api/products/1 { "id": 1, "name": "Laptop", "price": 1200 }

Agar product yo‘q bo‘lsa:

{ "message": "Product not found" }

va:

404

qaytishi kerak.

25. Mini Project 🚀 "Mini Blog API"

Quyidagilarni yarating:

/api/posts GET

Barcha postlar.

POST

Yangi post:

{ "title": "Next.js Route Handlers", "content": "Today I learned API Routes." } /api/posts/[id] GET PATCH DELETE Validation title → required content → required Error handling 404 → Post not found 422 → Validation error 201 → Created 200 → Success 26. Keyingi bosqichga qanday o'tamiz?

Bugungi API:

Next.js │ ├── GET ├── POST ├── PATCH └── DELETE

Hozir:

Memory Array

ishlatdik.

Keyingi production architecture esa:

Next.js Route Handler ↓ ORM ↓ PostgreSQL

Shundan keyin:

Authentication ↓ Authorization ↓ Database ↓ Validation (Zod) ↓ Error Handling ↓ Production API

ga o'tish mumkin.

Bu esa siz o‘rganayotgan Next.js + TypeScript + Laravel stackining haqiqiy full-stack qismiga olib boradi.

27. 5 ta Quiz 🧠

1. app/api/users/route.ts qaysi endpointni yaratadi?

A) /users B) /api/users C) /api/route/users D) /users/api

2. Yangi resource yaratish uchun odatda qaysi HTTP method ishlatiladi?

A) GET B) POST C) DELETE D) HEAD

3. request.json() nima qiladi?

A) JSON fayl yaratadi B) URLni JSONga aylantiradi C) Request body'dagi JSONni o‘qiydi D) Database'dan JSON oladi

4. Resource topilmasa odatda qaysi status code?

A) 200 B) 201 C) 404 D) 500

5. [id] nima uchun ishlatiladi?

A) Static route B) Dynamic route C) Middleware D) Database table

28. Interview Questions 💼 Next.js Route Handler nima? route.ts va page.tsx o‘rtasidagi farq nima? GET va POST farqi nima? request.json() nima qiladi? Dynamic Route Handler qanday yaratiladi? 404 va 422 farqi nima? Next.js'da API yaratishning Express/Laravel'dan farqi nima? Route Handler'da database bilan ishlash mumkinmi? Next.js full-stack framework deyilishining sababi nima? Qachon alohida Laravel/NestJS backend tanlagan bo‘lardingiz?
29. Git Commit

Amaliyot tugagach:

git add . git commit -m "feat: add nextjs route handlers mini api" 📚 Bugungi darsning eng muhim xulosasi

Bitta diagrammani eslab qoling:

                 Next.js
        ┌─────────────────────┐
        │                     │
        │     Frontend        │
        │                     │
        │   Server / API      │
        │      ↓              │
        │ Route Handlers      │
        └─────────┬───────────┘
                  │
                  ▼
              Database

Va URL mapping:

app/api/posts/route.ts ↓ GET /api/posts POST /api/posts

app/api/posts/[id]/route.ts ↓ GET /api/posts/1 PATCH /api/posts/1 DELETE /api/posts/1

Asosiy fikr: route.ts — Next.js App Router'da server-side HTTP endpoint yaratishning asosiy mexanizmi. Shu orqali Next.js ichida kichik backend/API qatlamini qurishimiz mumkin.
