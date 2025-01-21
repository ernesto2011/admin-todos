import { Sidebar, TopMenu } from "@/components";

export default function DashboardLayout({children,}: {children: React.ReactNode;}) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-[calc(100vh-64px)] ">
        <TopMenu />
        <div className="px-6 pt-6">{children}</div>
      </div>
    </>
  );
}
