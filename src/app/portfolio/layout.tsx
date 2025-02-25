import Layout from "@/app/_components/Layout"

export default function PortFolioLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <Layout>{children}</Layout>
  }