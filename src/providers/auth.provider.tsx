import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useEffect } from "react";

import Loader from "$/components/shared/Loader";
import { useWhishlistStore } from "$/store/WhislistStore";

import getMe from "../api/auth/get-me";
import { logoutUser } from "../api/auth/logout";
import { getByUserId } from "../api/whishlist/whishlist.api";
import AuthContext from "../contexts/auth/auth.context";
import { User } from "../types/native/user.types";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const setWhishlist = useWhishlistStore((state) => state.setWhishlist);
  const clearWhishlist = useWhishlistStore((state) => state.clearWhishlist);

  const {
    data: user,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: whislistData } = useQuery({
    queryKey: ["get-whislist-by-userId", user?.id],
    queryFn: () => getByUserId(user!.id),
    enabled: !!user?.id, // Only fetch when user is logged in
    refetchOnMount: true,
  });

  useEffect(() => {
    if (whislistData) {
      const products = whislistData
        .map((item: any) => item.product)
        .filter(Boolean);
      if (products.length > 0) {
        setWhishlist(products);
      }
    }
  }, [whislistData, setWhishlist]);

  useEffect(() => {
    if (user?.id) {
      queryClient.refetchQueries({
        queryKey: ["get-whislist-by-userId", user.id],
      });
    }
  }, [user?.id, queryClient]);

  const handleInvalidateUser = () => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
  };

  const { mutate: handleLogoutUser, isPending: pendingLogout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueriesData(
        {
          queryKey: ["user"],
        },
        null,
      );
      queryClient.invalidateQueries({
        queryKey: ["user-logout"],
      });
      // Clear wishlist on logout
      queryClient.removeQueries({
        queryKey: ["get-whislist-by-userId"],
      });
      clearWhishlist();
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-logout"],
      });
    },
  });

  const handleSetUser = (data: User) => {
    queryClient.setQueryData(["user"], data);
  };

  if (isFetching) return <Loader />;

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        role: user?.role ?? null,
        isPending: isFetching,
        isPendingLogout: pendingLogout,
        status,
        setUserData: handleSetUser,
        clearUser: handleLogoutUser,
        invalidateUser: handleInvalidateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
