export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <section className=" prose lg:prose-3xl prose-img:rounded-xl prose-headings:underline prose-a:text-lime-600 prose-code:text-lime-500 mx-auto  ">
      {children}
    </section>)
  }