"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loginAction } from "../_action/authAction";
import { useActionState, useEffect } from "react";

import { toast } from "sonner";

const LoginFrom = () => {
  const [state, action, pending] = useActionState(loginAction, false);

  useEffect(() => {
    if (!state) return;

    if (state.success === false) {
      toast.error(state.message || "Login failed");
    } else if (state.success === true) {
      toast.success("Login successful!");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <input
          className="border"
          name="phone"
          type="phone"
          placeholder="Enter your phone"
        />
        <input
          className="border"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginFrom;
