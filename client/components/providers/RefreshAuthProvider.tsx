"use client";
import { logIn } from "@/actions/auth.actions";
import { refreshAuth } from "@/lib/api/tanstack/auth";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function RefreshAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const { data } = useQuery({
    queryFn: async ({ signal }) => refreshAuth({ signal, user: session?.user }),
    queryKey: ["refreshAuth"],
    enabled: !!session?.user,
  });

  console.log(data);

  const [isPending, setIsPending] = React.useState(true);

  useEffect(() => {
    const refreshAuth = async () => {
      await logIn(data);
    };
  }, [data]);

  return (
    <div className="h-screen w-screen grid place-content-center">
      <Loader2 className="animate-spin text-primary" size={38} />
    </div>
  );
}
