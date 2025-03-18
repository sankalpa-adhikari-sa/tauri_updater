import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ context, location }) => {
    const { session, isLoading } = context.auth;

    if (context.auth == null || isLoading) {
      return;
    }

    if (!session) {
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
  return (
    <div>
      <Outlet />
    </div>
  );
}
