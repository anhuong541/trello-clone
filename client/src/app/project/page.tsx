import { handleUserInfo } from "@/actions/query-actions";
import Header from "@/components/layouts/Header";
import { Sidebar } from "@/components/layouts/Sidebar";
import { cookies } from "next/headers";

export default async function ProjectPage() {
  const data = await handleUserInfo(cookies());

  return (
    <main className="h-screen w-screen flex flex-col">
      <Header userInfo={data?.data} />
      <div className="lg:grid lg:grid-cols-10 flex h-full">
        <Sidebar userId={data?.data?.data?.uid} projectId="" />
        <div className="lg:col-span-8 w-full h-full bg-blue-100" />
      </div>
    </main>
  );
}
