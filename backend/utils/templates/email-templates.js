export function emailTemplate(subject, body) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${subject}</title>
  </head>
  <body>
    <h1>${subject}</h1>
    <p>${body}</p>
  </body>
  </html>
    `;
}
