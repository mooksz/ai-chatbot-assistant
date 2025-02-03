import { Header } from "@/components/molecules/Header/Header";
import { Loader } from "@/components/molecules/Loader/Loader";
import { Sidebar } from "@/components/molecules/Sidebar/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <div className="flex flex-1 flex-col lg:flex-row bg-gray-100">
        <Sidebar />

        <div className="flex flex-1 justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
