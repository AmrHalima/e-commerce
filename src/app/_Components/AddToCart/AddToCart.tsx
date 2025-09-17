"use client";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { addToCart } from "@/services/cartActions";
import { Loader2Icon } from "lucide-react";

import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddToCart({ productId }: { productId?: string }) {
    const [loading, setLoading] = useState<Boolean>(false);
    const { setCart } = useContext(CartContext);
    return (
        <Button
            onClick={async () => {
                setLoading(true);
                const newCart = await addToCart(productId);
                if (newCart) {
                    setCart(newCart);
                    toast.success("Product added to cart successfully");
                } else toast.error("failed to add to cart");
                setLoading(false);
            }}
            variant="default"
            className="text-xs px-2 py-1 h-7"
        >
            {loading ? <Loader2Icon className="animate-spin" /> : ""}
            Add to Cart
        </Button>
    );
}
