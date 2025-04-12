import Navbar from "@/components/Navbar";

const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className="pattern h-screen container px-10 mx-auto lg:max-w-6xl">
        <Navbar />
        {children}
    </main>
  )
}

export default RootLayout