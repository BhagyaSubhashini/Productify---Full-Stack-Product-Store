import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

// the best way to implement this is by using webhooks
function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

const {
  mutate: syncUserMutation,
  isPending,
  isSuccess,
  isError,
  reset,
} = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess && !isError) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
}, [isSignedIn, user, syncUserMutation, isPending, isSuccess, isError]);

useEffect(() => {
   // Reset when user identity changes or sign-out occurs so sync can run again
  reset();
}, [user?.id, isSignedIn, reset]);
  return { isSynced: isSuccess };
}

export default useUserSync;