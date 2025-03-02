import Layout from "@/app/_components/Layout"
export default function AppsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <Layout>{children}</Layout>
  }
