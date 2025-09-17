"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import {
    checkOutSession,
    clearCart,
    getCart,
    removeCartItem,
    updateCartItem,
} from "@/services/cartActions";
import { ChevronsRightIcon, ShoppingCart, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "sonner";

export function formatCurrency(num: number) {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "EGP",
    }).format(num);
}

export default function Cart() {
    const { cart, setCart, loading, setLoading } = useContext(CartContext);
    async function x() {
        try {
            setLoading(true);
            const newCart = await getCart();
            setCart(newCart!);
        } catch (error) {
            toast.error("Failed to load cart: " + error);
        } finally {
            setLoading(false);
        }
    }
    if (
        typeof cart?.data?.products?.[0]?.product === "string" ||
        cart == null
    ) {
        x();
    }

    // const cartItems = [
    //     // Sample cart items
    //     {
    //         id: 1,
    //         product: {
    //             title: "Product One",
    //             brand: { name: "Brand A" },
    //             category: { name: "Category X" },
    //             image: "https://ecommerce.routemisr.com/Route-Academy-products/1680403397482-1.jpeg",
    //         },
    //         price: 1200,
    //         quantity: 2,
    //     },
    //     {
    //         id: 2,
    //         product: {
    //             title: "Product Two",
    //             brand: { name: "Brand B" },
    //             category: { name: "Category Y" },
    //             image: "https://ecommerce.routemisr.com/Route-Academy-products/1680403397482-1.jpeg",
    //         },
    //         price: 800,
    //         quantity: 1,
    //     },
    // ];

    // const subtotal = cartItems.reduce(
    //     (sum, item) => sum + item.price * item.quantity,
    //     0
    // );
    // const tax = subtotal * 0.14; // example 14% VAT
    // const total = subtotal + tax;

    return (
        <>
            {loading ||
            typeof cart?.data?.products?.[0]?.product === "string" ? (
                <Loading />
            ) : cart?.numOfCartItems! > 0 ? (
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Shopping Cart
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {cart?.numOfCartItems} items in your cart
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        {/* Items Column */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart?.data?.products?.map(
                                ({ _id, product, price, count }) => (
                                    <div
                                        key={_id}
                                        className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                                    >
                                        <Image
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                                            width={100}
                                            height={100}
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                                                        {product.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {product.brand.name} ·{" "}
                                                        {product.category.name}
                                                    </p>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <div className="font-semibold">
                                                        {formatCurrency(
                                                            price * count
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {!(count <= 1) && (
                                                        <button
                                                            onClick={async () => {
                                                                const newCart =
                                                                    await updateCartItem(
                                                                        product._id,
                                                                        count -
                                                                            1
                                                                    );
                                                                if (
                                                                    newCart?.status ==
                                                                    "success"
                                                                ) {
                                                                    setCart(
                                                                        newCart
                                                                    );
                                                                    toast.success(
                                                                        "Item removed from cart"
                                                                    );
                                                                }
                                                            }}
                                                            aria-label="decrease"
                                                            className="size-8 rounded-lg border hover:bg-accent"
                                                        >
                                                            –
                                                        </button>
                                                    )}
                                                    <span className="w-6 text-center font-medium">
                                                        {count}
                                                    </span>
                                                    <button
                                                        onClick={async () => {
                                                            const newCart =
                                                                await updateCartItem(
                                                                    product._id,
                                                                    count + 1
                                                                );
                                                            if (
                                                                newCart?.status ==
                                                                "success"
                                                            ) {
                                                                setCart(
                                                                    newCart
                                                                );
                                                                toast.success(
                                                                    "Item added to cart"
                                                                );
                                                            }
                                                        }}
                                                        aria-label="increase"
                                                        className="size-8 rounded-lg border hover:bg-accent"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={async () => {
                                                        const newCart =
                                                            await removeCartItem(
                                                                product._id
                                                            );
                                                        if (
                                                            newCart?.status ==
                                                            "success"
                                                        ) {
                                                            setCart(newCart);
                                                            toast.success(
                                                                "Item removed from cart"
                                                            );
                                                        }
                                                    }}
                                                    aria-label="remove"
                                                    className="text-destructive hover:underline text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Summary Column */}
                        <div className="border rounded-xl p-4 shadow-sm h-fit bg-card sticky top-24">
                            <h2 className="text-lg font-semibold mb-4">
                                Order Summary
                            </h2>
                            <div className="flex justify-between text-sm mb-2">
                                <span>
                                    Subtotal {cart?.numOfCartItems} items
                                </span>
                                <span>
                                    {formatCurrency(cart?.data.totalCartPrice!)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Shipping</span>
                                <span>{formatCurrency(0)}</span>
                            </div>
                            {/* <div className="flex justify-between text-sm mb-2">
                        <span>Tax (14%)</span>
                        <span>{formatCurrency(tax)}</span>
                    </div> */}
                            <div className="flex justify-between font-semibold text-base border-t pt-2">
                                <span>Total</span>
                                <span>
                                    {formatCurrency(cart?.data.totalCartPrice!)}
                                </span>
                            </div>

                            <Button
                                variant="default"
                                className="w-full mt-4"
                                onClick={async () => {
                                    console.log(cart?.cartId);
                                    await checkOutSession(cart?.cartId!);
                                }}
                            >
                                <ChevronsRightIcon /> Proceed to Checkout
                            </Button>
                            <Link href={"/products"}>
                                <Button
                                    variant={"outline"}
                                    className="w-full mt-4"
                                >
                                    <ShoppingCart /> Continue Shopping
                                </Button>
                            </Link>
                            <Button
                                variant="destructive"
                                className="w-full mt-4"
                                onClick={async () => {
                                    const res = await clearCart();
                                    if (res?.message == "success") {
                                        toast.success("Cart cleared");
                                        setCart(null);
                                    }
                                }}
                            >
                                <Trash2Icon /> Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Your Cart is Empty
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link href={"/products"}>
                        <Button
                            variant={"outline"}
                            className="w-1/3 mt-4 mx-auto"
                        >
                            <ShoppingCart /> Start Shopping
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
}
