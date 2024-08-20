# Next.js Hello World


This example shows the most basic idea behind Next. We have 2 pages: `src/pages/index.js` and `src/pages/about.js`. The former responds to `/` requests and the latter to `/about`. Using `next/link` you can add hyperlinks between them with universal routing capabilities.

The app in this repo is deployed at https://next-js.onrender.com.

## Deploy as Node Web Service

Click the button below to deploy this app on Render.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)


## Deploy as Static Site

1. Modify the code:
    1. In `render.yaml`, replace the definition of the service named `next-js` with the definition that is commented out.
    2. In `next.config.mjs`, uncomment the line that sets `output: "export"`.

2. Commit the code changes to your repository.

3. Click the Deploy to Render button.