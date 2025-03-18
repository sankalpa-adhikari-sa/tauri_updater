import { createFileRoute, redirect } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/authProvider";
import { SigninForm } from "@/routes/-components/forms/signin";
import { SignupForm } from "@/routes/-components/forms/signup";

export const Route = createFileRoute("/(auth)/auth")({
  beforeLoad: ({ context, location }) => {
    const { session, isLoading } = context.auth;
    console.log("Auth route beforeLoad - Session:", session);
    console.log("Auth route beforeLoad - isLoading:", isLoading);

    if (context.auth == null || isLoading) {
      console.log("Auth is still loading, skipping redirect...");
      return;
    }

    if (session) {
      console.log("Redirecting to dashboard, session exists");
      throw redirect({
        to: "/dashboard",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthPage,
});

function AuthPage() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading authentication...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">sign-in</TabsTrigger>
          <TabsTrigger value="sign-up">sign-up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SigninForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
