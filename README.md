Watch and stream your favourite anime, ad free.

Soma Version 2.0 is the latest iteration of my previous anime website, [**Soma Version 1.0 (soma-chill)**](https://github.com/jasondev01/soma). It is a free, open-source anime streaming website built using [Next.js 14](https://nextjs.org/) and [Tailwind](https://tailwindcss.com/).


## Features

- **No Ads** - No ads, no popups, no redirects.
- **PWA Support** - You can install it on your phone for an easy access.
- **Disqus Comment** - You can interact with the other users on the anime episode you watch.

## Local Development

```
git clone https://github.com/jasondev01/soma-v2.0.git
cd soma-v2.0
npm install or yarn install
```

Before running the application, ensure that you rename the `.env.sample` file to `.env` and set the TMDB access key (READ ACCESS TOKEN) within it. The TMDB access key is mandatory.

```
npm run dev or yarn dev
```

## Deployment

Soma is built on Next.js 14, so caching is done on the fly and will revalidate the data at given intervals. You can refer to `utils/get-anime.ts` for more details. However, if you want to integrate third-party caching, you can do so on your own. I suggest using KV on Vercel for caching.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjasondev01%2Fsoma-v2.0)

If you are deploying to vercel. Make sure to set ENVIRONMENT VARIABLE `NEXT_PUBLIC_TMD_ACCESS_KEY` and set it your access key.

## Credits

[Consumet](https://github.com/consumet/consumet.ts)


## Disclaimer

This is a personal project intended for educational reference and/or purposes. The project is open-source and licensed under the MIT license.