import SidebarComponents from "@/components/common/SidebarComponents";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarComponents />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
