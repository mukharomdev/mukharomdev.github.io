import { ThemeModeScript } from "flowbite-react";

export default function Document() {
  return (
    <html suppressHydrationWarning>
      <Head>
        <ThemeModeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  );
}