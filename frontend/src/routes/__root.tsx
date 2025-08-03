import Header from "@/components/side-header";
import { Toaster } from "@/components/ui/sonner";
import { type QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="text-foreground bg-custom-white flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto grow p-4">
          <Outlet />
        </main>
        <footer className="container mx-auto p-4 text-center">
          <p className="text-muted-foreground text-sm">
            HackerNews &copy; 2025
          </p>
        </footer>
      </div>

      <Toaster />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools />
    </>
  );
}
