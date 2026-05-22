# Ethos Blog

A Next.js blog website featuring internationalization, user authentication and a comment system. Designed for a comfy reading experience.

Installation:
```
npm i && npm run dev
```

![main image](https://davidmaksic.vercel.app/ethos.png)

<br />
This application is powered by **Next.js**, which enables near-instant load times and navigation thanks to ISR (Incremental Static Generation).

<br />
<br />

Authentication is implemented using **Better Auth**. Emails are styled with **React Email**, and sent by **Resend**. Internationalization is supported thanks to **`next-intl`** library. Site is styled with **Tailwind** and can be used on a variety of devices thanks to the responsive design.

Light and dark mode are handled by **`next-themes`**. Dynamic metadata/OpenGraph/JSON-LD are implemented for SEO optimization. Complex layout animations are implemented thanks to **Motion** library. Data validation is implemented with **Zod**.

**Umami** is used for analytics. Application data is stored in **Supabase** database. Deployed on **Vercel**.

<br />

## Landing page

Upon entering the website, user will first see the slider with featured articles. On the top is the header with page navigation, theme toggle, user profile (or log-in) and language toggle. On mobile devices, this is abstracted into a modal.

![landing page](https://davidmaksic.vercel.app/ethos-0.png)

<br />

Bellow, user can see articles that are featured by category.

![tag features](https://davidmaksic.vercel.app/ethos-1.png)

<br />

Last segment of the landing page is the Latest articles section, where user has an option to filter the articles based on category.

![latest articles](https://davidmaksic.vercel.app/ethos-2.png)

<br />

## Article view

This is the main part of the blog. Bellow title there is the main image card with basic information about the author and some options.

![article](https://davidmaksic.vercel.app/ethos-3.png)

<br />

All articles are made using a WYSIWYG text editor, which means they will be rich with special styles, images, videos, etc. Images can be smoothly zoomed in by clicking on them. On the right side there is a config button that has a few handy options (table of contents, theme toggle, etc).

![article options](https://davidmaksic.vercel.app/ethos-4.png)

<br />

After the article content, user will see a card with author's information. On the left side are basic article options: like, comment, bookmark and share. Bellow, user can leave a comment (if they are logged-in).

![article options 2](https://davidmaksic.vercel.app/ethos-5.png)

<br />

This part of the page displays all comments and replies, with sorting option. Users can like comments, and toggle replies.

![comments](https://davidmaksic.vercel.app/ethos-6.png)

<br />

## Browsing articles

On this page, users can search, sort and filter all articles.

![archive](https://davidmaksic.vercel.app/ethos-7.png)

<br />

## About page

Here users can read the short description of this blog and etymology behind its name. There is also a list of all the authors.

![about page](https://davidmaksic.vercel.app/ethos-7.png)

<br />

## Subscription flow

At the end of each page there is a newsletter sign-up.

![subscription flow](https://davidmaksic.vercel.app/newsletter-1.png)

<br />

After subscribing, user will get welcome email. Emails are sent using **Resend** library.

![welcome email](https://davidmaksic.vercel.app/newsletter-2.png)

<br />

Now, whenever a new article is published user will be notified by an email.

![email notification](https://davidmaksic.vercel.app/newsletter-3.jpg)

<br />

## Authentication

On this page user can sign in/up and reset their password. Aside from traditional credentials, users can also sign in using **OAuth**, like Google or Github.

![authentication page](https://davidmaksic.vercel.app/auth-1.jpg)

<br />

If user chooses to reset their password, they will get confirmation email with instructions for that.

![confirmation email](https://davidmaksic.vercel.app/auth-2.png)

<br />

**Note**: Most email clients don't support custom styles and fonts, like Gmail or Outlook. But others, such as Apple or iOS Mail do allow them.

<br />

## User profile

After singing up/logging in, user can access their profile. By default, they will see the Overview page, which showcases some profile statistics.

![profile overview](https://davidmaksic.vercel.app/ethos-9.png)

<br />

After navigating to the Comments section, user will see all of their comments and replies. They can sort them, and navigate directly to them (to their position in the article) by a click.

![user's comments](https://davidmaksic.vercel.app/ethos-10.png)

<br />

In the Bookmarks section, user can access all saved articles. Search, sorting, and pagination are available, just as in archive page.

![user's bookmarks](https://davidmaksic.vercel.app/ethos-11.png)

<br />

Finally, we come to the profile settings. Here user can change their username and profile image.

![profile settings](https://davidmaksic.vercel.app/ethos-12.png)

<br />

## Credits

Special thanks to <u>**[Jonas Schmedtmann](https://www.udemy.com/user/jonasschmedtmann/)**</u>; his work was an inspiration for most of my projects. If you are new at learning web development, check him out!

<br />
