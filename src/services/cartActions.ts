"use server";

import { Cart } from "@/interface/cart";
import { toast } from "sonner";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addToCart(productId?: string) {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token + "",
            },
            body: JSON.stringify({ productId }),
        });

        if (!res.ok) {
            toast.error("Failed to add to cart");
            return;
        }

        const cart: Cart = await res.json();
        return cart;
    } catch (err) {
        console.error("addToCart error:", err);
        toast.error("Something went wrong while adding to cart");
        return;
    }
}

export async function getCart() {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token + "",
            },
        });

        if (!res.ok) {
            toast.error("Failed to fetch cart");
            return;
        }

        const cart: Cart = await res.json();
        return cart;
    } catch (err) {
        console.error("getCart error:", err);
        toast.error("Something went wrong while fetching cart");
        return;
    }
}

export async function removeCartItem(cartItemId: string) {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/cart/${cartItemId}`, {
            method: "DELETE",
            headers: {
                token: token + "",
            },
        });

        if (!res.ok) {
            toast.error("Failed to remove item from cart");
            return;
        }

        const cart: Cart = await res.json();
        return cart;
    } catch (err) {
        console.error("removeCartItem error:", err);
        toast.error("Something went wrong while removing item");
        return;
    }
}

export async function updateCartItem(cartItemId: string, count: number) {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/cart/${cartItemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token + "",
            },
            body: JSON.stringify({ count }),
        });

        if (!res.ok) {
            toast.error("Failed to update item");
            return;
        }

        const cart: Cart = await res.json();
        return cart;
    } catch (err) {
        console.error("updateCartItem error:", err);
        toast.error("Something went wrong while updating item");
        return;
    }
}

export async function clearCart() {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(`${process.env.API_URL}/cart`, {
            method: "DELETE",
            headers: {
                token: token + "",
            },
        });

        if (!res.ok) {
            toast.error("Failed to clear cart");
            return;
        }

        const cart: Cart = await res.json();
        return cart;
    } catch (err) {
        console.error("clearCart error:", err);
        toast.error("Something went wrong while clearing cart");
        return;
    }
}

const shippingAddress = {
    details: "details",
    phone: "01010700999",
    city: "Cairo",
};

export async function checkOutSession(cartId: string) {
    const encToken = (await cookies()).get("next-auth.session-token")?.value;
    const token = await decode({
        token: encToken,
        secret: process.env.AUTH_SECRET!,
    });
    try {
        const res = await fetch(
            `${process.env.API_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token + "",
                },
                body: JSON.stringify({ shippingAddress }),
            }
        );

        if (!res.ok) {
            toast.error("Failed to start checkout session");
            return;
        }

        const data = await res.json();
        if (data?.status === "success") {
            window.location.href = data.session.url;
        }
    } catch (err) {
        console.error("checkOutSession error:", err);
        toast.error("Something went wrong during checkout");
        return;
    }
}
