"use client";
import { Cart } from "@/interface/cart";
import { getCart } from "@/services/cartActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
export const CartContext = createContext<{
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    fetchCart: () => Promise<void>;
}>({
    cart: null,
    setCart: () => {},
    loading: false,
    setLoading: () => {},
    fetchCart: async () => {},
});

export default function CartContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const { status } = useSession();
    const router = useRouter();
    const fetchCart = async () => {
        try {
            if (status === "unauthenticated") {
                router.push("/login");
                return;
            }
            setLoading(true);
            const newCart = await getCart();
            setCart(newCart!);
        } catch (error) {
            if (error instanceof Error)
                toast.error("Failed to load cart: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{ cart, setCart, loading, setLoading, fetchCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
