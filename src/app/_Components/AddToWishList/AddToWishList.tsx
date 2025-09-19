"use client";
import { addToWishlist, removeFromWishlist } from "@/services/wishlistActions";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddToWishList({
    productId,
    isActive = false,
}: {
    productId: string;
    isActive?: boolean;
}) {
    const [clicked, setClicked] = useState<Boolean>(isActive);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { status } = useSession();
    const router = useRouter();
    async function toggle() {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }
        setIsLoading(true);
        try {
            if (!clicked) {
                await addToWishlist(productId);
                setClicked(true);
            } else {
                await removeFromWishlist(productId);
                setClicked(false);
            }
        } catch (error) {
            console.error("Failed to update wishlist:", error);
            // Optionally revert state on error
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Heart
            onClick={(e) => {
                e.stopPropagation();
                if (!isLoading) {
                    toggle();
                }
            }}
            className={cn(
                "absolute top-2 left-2 z-10 text-primary hover:scale-125 transition-all ease-in-out",
                { "animate-ping": isLoading }
            )}
            fill={clicked ? "#7dc9cf" : "none"}
        />
    );
}
