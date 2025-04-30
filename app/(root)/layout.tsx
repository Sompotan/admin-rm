import SidebarComponents from "@/components/common/SidebarComponents";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import Headers from "@/components/common/Headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarComponents />
      <SidebarInset>
          <Headers />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
