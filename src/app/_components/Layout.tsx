export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="container prose">{children}</section>
  }