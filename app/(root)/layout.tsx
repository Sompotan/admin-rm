import SidebarComponents from "@/components/common/SidebarComponents";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import Headers from "@/components/common/Headers";
import {Toaster} from "sonner";

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
          <div className="px-8 root">
              {children}
              <Toaster richColors position="top-right" />
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
