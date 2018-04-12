export default function renderFullPage(html, header) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Smilebooth</title>
        <link rel="stylesheet" href="https://use.typekit.net/wpc4ivb.css">
        <link href="https://fonts.googleapis.com/css?family=Orbitron" rel="stylesheet">
        ${header}
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/public/client.js"></script>
      </body>
    </html>
  `
}
