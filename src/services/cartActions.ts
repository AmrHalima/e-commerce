import { Cart } from "@/interface/cart";
import { i } from "framer-motion/client";
import { toast } from "sonner";

export async function addToCart(productId?: string) {
    {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NDFiOTg3MDQyNmEzOTIyZDBkMyIsIm5hbWUiOiJBbXIgWWFzc2VyIEhhbGltYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTAzMzcyLCJleHAiOjE3NjU4NzkzNzJ9.gg6cinTe6bCxe2XjFDzawtiD1YZH2GQPvyGYiRVvVNQ",
            },
            body: JSON.stringify({ productId }),
        });

        if (!res.ok) {
            toast.error("Failed to add to cart");
        } else {
            const cart: Cart = await res.json();
            return cart;
        }
    }
}
export async function getCart() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NDFiOTg3MDQyNmEzOTIyZDBkMyIsIm5hbWUiOiJBbXIgWWFzc2VyIEhhbGltYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTAzMzcyLCJleHAiOjE3NjU4NzkzNzJ9.gg6cinTe6bCxe2XjFDzawtiD1YZH2GQPvyGYiRVvVNQ",
        },
    });
    if (!res.ok) {
        toast.error("Failed to fetch to cart");
    } else {
        const cart: Cart = await res.json();
        return cart;
    }
}

export async function removeCartItem(cartItemId: string) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
            method: "DELETE",
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NDFiOTg3MDQyNmEzOTIyZDBkMyIsIm5hbWUiOiJBbXIgWWFzc2VyIEhhbGltYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTAzMzcyLCJleHAiOjE3NjU4NzkzNzJ9.gg6cinTe6bCxe2XjFDzawtiD1YZH2GQPvyGYiRVvVNQ",
            },
        }
    );
    if (!res.ok) {
        toast.error("Failed to remove item from cart");
    } else {
        const cart: Cart = await res.json();
        return cart;
    }
}
export async function updateCartItem(cartItemId: string, count: number) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NDFiOTg3MDQyNmEzOTIyZDBkMyIsIm5hbWUiOiJBbXIgWWFzc2VyIEhhbGltYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTAzMzcyLCJleHAiOjE3NjU4NzkzNzJ9.gg6cinTe6bCxe2XjFDzawtiD1YZH2GQPvyGYiRVvVNQ",
            },
            body: JSON.stringify({ count }),
        }
    );
    if (!res.ok) {
        toast.error("Failed to update item");
    } else {
        const cart: Cart = await res.json();
        return cart;
    }
}
export async function clearCart() {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "DELETE",
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NDFiOTg3MDQyNmEzOTIyZDBkMyIsIm5hbWUiOiJBbXIgWWFzc2VyIEhhbGltYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTAzMzcyLCJleHAiOjE3NjU4NzkzNzJ9.gg6cinTe6bCxe2XjFDzawtiD1YZH2GQPvyGYiRVvVNQ",
        },
    });
    if (!res.ok) {
        toast.error("Failed to clear cart");
    } else {
        const cart: Cart = await res.json();
        return cart;
    }
}
const shippingAddress = {
    details: "details",
    phone: "01010700999",
    city: "Cairo",
};

export async function checkOutSession(cartId: string) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzg4NDFiOTg3MDQyNmEzOTIyZDBkMyIsIm5hbWUiOiJBbXIgWWFzc2VyIEhhbGltYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTAzMzcyLCJleHAiOjE3NjU4NzkzNzJ9.gg6cinTe6bCxe2XjFDzawtiD1YZH2GQPvyGYiRVvVNQ",
            },
            body: JSON.stringify({ shippingAddress }),
        }
    );
    if (!res.ok) {
        toast.error("Failed to update item");
    } else {
        const data = await res.json();
        if (data?.status === "success") {
            window.location.href = data.session.url;
        }
    }
}
