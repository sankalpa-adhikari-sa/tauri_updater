import { useAuth } from "@/lib/authProvider";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.session) {
      throw redirect({
        to: "/login",
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
