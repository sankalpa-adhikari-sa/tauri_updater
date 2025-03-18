import { Button } from "@/components/ui/button";
import { useAuthentication } from "@/hooks/useAuthentication";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_private/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signOut } = useAuthentication();
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        signOut.mutate(undefined, {
          onSuccess: () => resolve(),
          onError: () => reject(),
        });
      }),
      {
        loading: "Logging out...",
        success: () => {
          return "Logged out successfully!";
        },
        error: "Logout failed. Please try again.",
        onAutoClose: () => {
          navigate({ to: "/auth" });
        },
        duration: 1000,
      }
    );
  };

  return (
    <div>
      Hello "/_private/dashboard"!
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
}
