"use client";
import Wishlist from "@/interface/wishlist";
import { getWishList } from "@/services/wishlistActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
export const WishListContext = createContext<{
    wishList: Wishlist | null;
    setWishList: React.Dispatch<React.SetStateAction<Wishlist | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    wishList: null,
    setLoading: () => {},
    setWishList: () => {},
    loading: true,
});

export default function WishLIstContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [wishList, setWishList] = useState<Wishlist | null>(null);
    const [loading, setLoading] = useState(true);
    const { status } = useSession();
    const router = useRouter();
    const fetchWishList = async () => {
        try {
            if (status === "unauthenticated") {
                router.push("/login");
                return;
            }
            const wishList = await getWishList();
            setWishList(wishList);
            setLoading(false);
        } catch (error) {
            if (error instanceof Error)
                toast.error("Failed to load wislist: " + error.message);
        }
    };
    useEffect(() => {
        fetchWishList();
    }, []);
    return (
        <WishListContext.Provider
            value={{ wishList, setWishList, loading, setLoading }}
        >
            {children}
        </WishListContext.Provider>
    );
}
