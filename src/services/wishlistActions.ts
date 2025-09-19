"use server";

import Wishlist from "@/interface/wishlist";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getWishList() {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/wishList`, {
            headers: {
                token: token + "",
            },
        });

        if (!res.ok) {
            return null;
        }

        const wishList = await res.json();
        return wishList as Wishlist;
    } catch (err) {
        console.error("getWishList error:", err);
        return null;
    }
}

export async function removeFromWishlist(productId: string) {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/wishlist` + productId, {
            method: "DELETE",
            headers: {
                token: token + "",
            },
        });

        if (!res.ok) {
        } else {
            console.log("removed from wishlist");
        }
    } catch (err) {
        console.error("removeFromWishlist error:", err);
    }
}

export async function addToWishlist(productId: string) {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token + "",
            },
            body: JSON.stringify({ productId }),
        });

        if (!res.ok) {
            console.error("failed to add to wishlist");
        } else {
            console.log("added to wishlist");
        }
    } catch (err) {
        console.error("addToWishlist error:", err);
    }
}
