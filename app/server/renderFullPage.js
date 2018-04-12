export default function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Smilebooth</title>
        <link rel="stylesheet" href="https://use.typekit.net/wpc4ivb.css">
        <link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/public/client.js"></script>
      </body>
    </html>
  `
}
