import NavigationBar from "@/components/navigation/navigationBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const user = await getLoggedInUser();
    return (
      <main className="flex flex-col lg:flex-row min-h-screen min-w-screen">
        <NavigationBar user={user} />
        {children}
      </main>
    );
  }
  