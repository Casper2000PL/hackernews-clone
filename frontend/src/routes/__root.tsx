import Header from "@/components/side-header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
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

      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools />
    </>
  );
}
