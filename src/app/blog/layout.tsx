import Layout from "@/app/_components/Layout"
export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <Layout>{children}</Layout>
  }