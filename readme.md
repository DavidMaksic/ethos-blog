# Ethos Blog

A Next.js blog website featuring internationalization, user authentication and a comment system. Designed for a comfy reading experience.

Installation:
```
npm i
npm run dev
```

![main image](https://davidmaksic.vercel.app/assets/ethos-BxVz4v8U.png)

Ethos Blog enables its users to do many things: read, comment, bookmark, etc. This website is powered by **Next.js** which provides fast initial load times and server-side rendering.

Authentication and authorization was implemented using **NextAuth**. Internationalization is supported thanks to **`next-intl`** library. Site is styled with **Tailwind** and can be used on variety of devices thanks to the responsive design.

Light and dark mode are handled by **`next-themes`**. Dynamic metadata is implemented for SEO optimization.

Both **Umami** and **Vercel** are used for analytics. Application data is stored in **Supabase** database. Deployed on **Vercel**.

<br />

## Landing page

Upon entering the website, user will first see the slider with featured articles. On the top is the header with page navigation, theme toggle, user profile (or log-in) and language toggle. On mobile devices, this is abstracted into a modal.

![landing page](https://davidmaksic.vercel.app/assets/ethos-0-K1Fg0HYf.png)

<br />

Bellow, user can see articles that are featured by category.

![tag features](https://davidmaksic.vercel.app/assets/ethos-1-p_QfvThm.png)

<br />

Last segment of the landing page is the Latest articles section, where user has an option to filter the articles based on category.

![latest articles](https://davidmaksic.vercel.app/assets/ethos-2-CbtV0Kte.png)

<br />

## Article

This is the main part of the blog. Bellow title there is the main image card with basic information about the author and some options.

![article](https://davidmaksic.vercel.app/assets/ethos-3-Bv7KRomy.png)

<br />

All articles are made using a WYSIWYG text editor, which means they will be rich with special styles, images, videos, etc. Images can be smoothly zoomed in by clicking on them. On the right side there is a config button that has a few handy options (table of contents, theme toggle, etc).

![article options](https://davidmaksic.vercel.app/assets/ethos-4-4xHbaFPn.png)

<br />

After the article content, user will see a card with author's information. On the left side are basic article options: like, comment, bookmark and share. Bellow, user can leave a comment (if they are logged-in).

![article options 2](https://davidmaksic.vercel.app/assets/ethos-5-Cbx7Uivd.png)

<br />

This part of the page displays all comments and replies, with sorting option. Users can like comments, and toggle replies.

![comments](https://davidmaksic.vercel.app/assets/ethos-6-B7m62173.png)

<br />

## Archive

On this page, users can search, sort and filter all articles.

![archive](https://davidmaksic.vercel.app/assets/ethos-7-5SZFYbGw.png)

<br />

## About page

Here users can read the short description of this blog and etymology behind its name. There is also a list of all the authors.

![about page](https://davidmaksic.vercel.app/assets/ethos-8-DWu8Gp68.png)

<br />

## User profile

After singing up/logging in, user can access their profile. By default, they will see the Overview page, which showcases some profile statistics.

![profile overview](https://davidmaksic.vercel.app/assets/ethos-9-BJK8p3Oh.png)

<br />

After navigating to the Comments section, user will see all of their comments and replies. They can sort them, and navigate directly to them (to their position in the article) by a click.

![user's comments](https://davidmaksic.vercel.app/assets/ethos-10-DSSf0zUK.png)

<br />

In the Bookmarks section, user can access all saved articles. Search, sorting, and pagination are available, just as in archive page.

![user's bookmarks](https://davidmaksic.vercel.app/assets/ethos-11-CyEpz2UW.png)

<br />

Finally, we come to the profile settings. Here user can change their username and profile image.

![profile settings](https://davidmaksic.vercel.app/assets/ethos-12-DDAKG-M7.png)

<br />

## Credits

Special thanks to **[Jonas Schmedtmann](https://www.udemy.com/user/jonasschmedtmann/)**, thanks to whom I learned everything I know; his work was an inspiration for most of my projects. If you are new at learning web development check him out!

<br />
