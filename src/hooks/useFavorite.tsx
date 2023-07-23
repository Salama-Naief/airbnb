"use client";

import { onOpen } from "@/redux/hooks/useLoginSlice";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface IUseFavorite {
  listingId: string;
  currentUser: User | null;
}
const useFavorite = ({ currentUser, listingId }: IUseFavorite) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const hasFavorite = useMemo(() => {
    if (!currentUser) {
      toast.error("you must be logedin!");
      dispatch(onOpen());
      return;
    }
    const list = currentUser.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId, dispatch]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        toast.error("you must be logedin!");
        dispatch(onOpen());
        return;
      }
      try {
        let response;
        setIsloading(true);
        if (hasFavorite) {
          response = axios.delete(`/api/favorites/${listingId}`);
        } else {
          response = axios.post(`/api/favorites/${listingId}`);
        }
        const { data } = await response;
        setIsloading(false);
        if (data.status === "success") {
          toast.success("success");
          router.refresh();
        } else if (data.status === "error") {
          data.errors.map((e: any) => {
            toast.error(e.message);
          });
        }
      } catch (error) {
        toast.error("something went wrong!");
      }
    },
    [currentUser, listingId, hasFavorite, dispatch, router]
  );

  return {
    hasFavorite,
    toggleFavorite,
    isLoading,
  };
};

export default useFavorite;
