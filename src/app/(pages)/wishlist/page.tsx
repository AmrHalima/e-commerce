"use client";

import AddToCart from "@/app/_Components/AddToCart/AddToCart";
import Loading from "@/app/loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { WishListContext } from "@/context/WishLIstContext";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

export default function WishList() {
    const { wishList, loading } = useContext(WishListContext);

    return (
        <>
            {loading ? (
                <Loading />
            ) : wishList?.count ? (
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold tracking-tight">
                        WishList
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {wishList.count} items in your wishlist
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        {/* Items Column */}
                        <div className="lg:col-span-2 space-y-4">
                            {wishList.data.map((item) => {
                                const {
                                    _id,
                                    imageCover,
                                    category,
                                    title,
                                    ratingsAverage,
                                    ratingsQuantity,
                                    price,
                                    brand,
                                    id,
                                } = item;

                                return (
                                    <Card
                                        key={_id}
                                        className="w-full flex flex-col md:flex-row overflow-hidden"
                                    >
                                        <div className="relative w-full md:w-48 h-48">
                                            <Link href={`/products/${_id}`}>
                                                <Image
                                                    src={imageCover}
                                                    alt={title.replaceAll(
                                                        " ",
                                                        "-"
                                                    )}
                                                    fill
                                                    className="object-cover rounded-md"
                                                    sizes="(max-width: 768px) 100vw, 200px"
                                                />
                                            </Link>
                                        </div>

                                        <CardContent className="flex flex-col justify-between p-4 flex-1">
                                            <div>
                                                <Link href={`/products/${_id}`}>
                                                    <CardTitle className="text-base font-semibold mb-1">
                                                        {title
                                                            .split(" ")
                                                            .slice(0, 5)
                                                            .join(" ")}
                                                    </CardTitle>
                                                </Link>
                                                <CardDescription className="text-sm mb-2">
                                                    <p>{category?.name}</p>
                                                    <p>Brand: {brand?.name}</p>
                                                </CardDescription>

                                                {/* Ratings */}
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {new Array(
                                                            Math.floor(
                                                                ratingsAverage
                                                            )
                                                        )
                                                            .fill(0)
                                                            .map((_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                                                />
                                                            ))}
                                                        {new Array(
                                                            5 -
                                                                Math.floor(
                                                                    ratingsAverage
                                                                )
                                                        )
                                                            .fill(0)
                                                            .map((_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    className="h-3 w-3 text-gray-300"
                                                                />
                                                            ))}
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {ratingsAverage} (
                                                        {ratingsQuantity}{" "}
                                                        reviews)
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price + AddToCart */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold">
                                                    {price} EGP
                                                </span>
                                                <AddToCart productId={id} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Summary Column (optional) */}
                        <div className="hidden lg:block">
                            <Card className="p-4">
                                <CardTitle className="text-lg mb-2">
                                    Wishlist Summary
                                </CardTitle>
                                <CardDescription>
                                    You have {wishList.count} items saved for
                                    later.
                                </CardDescription>
                            </Card>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
                    Your wishlist is empty.
                </div>
            )}
        </>
    );
}
