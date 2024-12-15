"use client";
import { refreshAuth } from "@/lib/api/tanstack/auth";
import { useQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import { motion, AnimatePresence, delay } from "framer-motion";

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

  // const [isPending, setIsPending] = React.useState(true);

  useEffect(() => {
    // if (data) {
    //   setIsPending(false);
    // }
  }, [data]);

  return (
    <>
      {children}
      {/* <AnimatePresence>
        {isPending && (
          <motion.div
            key="loader"
            className="h-[calc(100vh-500px)] w-[calc(100vh-500px)] grid place-content-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Loader2 className="animate-spin text-primary" size={38} />
          </motion.div>
        )}
      </AnimatePresence>
      {!isPending && children} */}
    </>
  );
}
