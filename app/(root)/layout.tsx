import Navbar from "@/components/Navbar";

const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className="root-layout">
        <Navbar />
        {children}
    </main>
  )
}

export default RootLayout