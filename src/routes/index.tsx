import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="container">
      <h1>Welcome to Tauri + Reacts THis is a public page</h1>
      <Button variant={"outline"} size={"sm"}>
        hellod
      </Button>
    </main>
  );
}

export default Index;
