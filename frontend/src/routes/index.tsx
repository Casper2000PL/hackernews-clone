import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div className="bg-black text-red-500">asasd</div>
      <Button>Click Me</Button>
    </div>
  );
}
