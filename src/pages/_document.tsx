import { ThemeModeScript } from "flowbite-react";

export default function Document() {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <main />
        <NextScript />
      </body>
    </html>
  );
}