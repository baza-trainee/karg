This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Як користуватися Trello

**Створення карток**: Для кожного тікета або завдання, які ви приймаєте на себе, створіть відповідну картку на дошці Trello. Назва картки повинна відповідати назві тікета або завдання.

**Розподіл роботи**: Після створення картки додайте її до потрібного списку на дошці. Ви можете використовувати списки для категоризації завдань, наприклад, "В розробці", "На перевірці", "Готово до злиття" і т. д.

**Оновлення статусу**: Під час роботи над завданням чи тікетом, оновлюйте статус картки на Trello, додавайте коментарі, якщо необхідно, та інформуйте про виконану роботу.

**Злиття змін в гілку**: Після успішного завершення роботи, створіть пулреквест відповідно до правил нашого репозиторію. Ви можете посилатися на відповідну картку на Trello у коментарях до пулреквесту.

**Затвердження та злиття**: Ваші колеги та тім-лід переглянуть та затвердять ваш пулреквест після перевірки. Якщо все в порядку, ваші зміни будуть злиті в головну гілку.

Дякую!

## Робота з GitHub

## Основні гілки:

У вашому репозиторії мають бути дві основні гілки:

a. **main**\ або **master**\: Це головна гілка продакшену. Вона має бути захищена, і тільки тім-лід може підтверджувати пулреквести в цю гілку. Пулреквести в **main**/**master**\ можливі лише з гілки **dev**.

b. **dev**\: Це основна розробнича гілка. Вона також має бути захищена, і пулреквести в неї потребують перегляду та затвердження від двох розробників. З гілки **dev** створюються всі інші гілки, і всі пулреквести з фіксами та новими функціями повинні бути спрямовані сюди. Також вам слід задеплоїти цю гілку на GitHub Pages і надати посилання всім кому це потрібно для зручного перегляду змін та оновлень.

2. Створення нових гілок:
   Коли ви отримали тікет або взяли його на себе, вам потрібно створити нову гілку з **dev**. Назва гілки повинна відповідати такій структурі:

<**category**\>/<**reference**\>/<**description-in-kebab-case**\>

## Category

Гілка повинна починатися з одного з наступних вибраних значень:

**feature**: Призначена для додавання, рефакторингу або видалення функції.
‌

**bugfix**: Призначена для виправлення помилок.
‌

**hotfix**: Призначена для зміни коду за допомогою тимчасового рішення та/або без дотримання звичайного процесу (зазвичай через надзвичайну ситуацію).
‌

**test**: Призначена для експериментів поза проблемою/тікетом.
‌

Reference

Після категорії має стояти символ «/», а потім назва або номер тікету, над яким ви працюєте. Якщо немає назви чи номеру, просто додайте `no-ref`.

‌
Description

Після посилання має бути ще один символ "/", а потім опис, який підсумовує мету цієї конкретної гілки. Цей опис має бути коротким і написаним у kebab-case (слова розділені дефісами).

Приклади

feature/issue-42/create-new-button-component
bugfix/issue-342/button-overlap-form-on-mobile
hotfix/no-ref/registration-form-not-working
test/no-ref/refactor-components-with-atomic-design

## Коміти:

Коміти мають бути написані у такому стилі: `<category>: <do something>; <do some other things>`

‌

Category

Кожен коміт має починатися з категорії зміни. Ви можете використовувати наступні 4 категорії для всього:

feat: Призначено для додавання нової функції.
fix: Призначений для виправлення помилки.
refactor: Призначений для зміни коду з метою покращення продуктивності або зручності (наприклад, читабельності).
chore: Все інше (написання документації, форматування, додавання тестів, очищення непотрібного коду тощо).
‌

Після категорії має бути символ ":", що вказує на опис коміту.

Повідомлення

Після двокрапки опис коміту має складатися з коротких операторів, що описують зміни. Кожен вислів має починатися з дієслова.

Твердження повинні бути відокремлені від самих себе символом ";"

‌

Приклади

feat: add new button component; add new button components to templates
‌

fix: add the stop directive to button component to prevent propagation
‌

refactor: rewrite button component in TypeScript
‌

chore: write button documentation
