import { useAuth } from "@/lib/authProvider";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context, location }) => {
    const { session, isLoading } = context.auth;
    console.log("Private route beforeLoad - Session:", session);
    console.log("Private route beforeLoad - isLoading:", isLoading);

    if (context.auth == null || isLoading) {
      console.log("Private is still loading, skipping redirect...");
      return;
    }

    if (!session) {
      console.log("Redirecting to dashboard, session exists");
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  const auth = useAuth();
  console.log(auth.session);
  return (
    <div>
      <Outlet />
    </div>
  );
}
