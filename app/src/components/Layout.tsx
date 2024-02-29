import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export function Layout() {

  return (
    <body
      className={`flex w-full h-[100vh] ${inter.className}`}
    >
      <header>

      </header>
      <section>

      </section>
    </body>
  )
}