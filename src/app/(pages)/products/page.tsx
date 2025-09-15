import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Product } from "@/interface/product";
import { Heart, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export async function getProducts(
    product?: String
): Promise<Product | undefined> {
    try {
        const res: Response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products${
                product ? `/${product}` : ""
            }`
        );
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const products: Product = await res.json();
        return products;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
export default async function products() {
    const products = await getProducts();
    if (!products) {
        return <div className="text-center p-10">No products found</div>;
    }
    const { data } = products as Product;
    if (!Array.isArray(data)) {
        return (
            <div className="text-center p-10">some products are missing</div>
        );
    }

    return (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map(
                ({
                    _id,
                    imageCover,
                    category: { name },
                    title,
                    ratingsAverage,
                    ratingsQuantity,
                    price,
                    priceAfterDiscount,
                }) => {
                    return (
                        <div
                            key={_id}
                            className=" sm:max-w-sm md:max-w-md lg:max-w-lg"
                        >
                            <Card className="w-full">
                                <CardContent className="p-3">
                                    <Link href={"/products/" + _id}>
                                        <div className="mb-2 relative">
                                            <Heart className="absolute top-2 left-2 z-10 text-muted hover:text-card" />
                                            <Image
                                                className="h-full w-full object-cover rounded-md"
                                                quality={75}
                                                loading="lazy"
                                                src={imageCover}
                                                width={360}
                                                height={360}
                                                alt={title.replaceAll(" ", "-")}
                                            ></Image>
                                        </div>
                                        <CardTitle className="text-sm mb-1">
                                            {title
                                                .split(" ")
                                                .slice(0, 3)
                                                .join(" ")}
                                        </CardTitle>
                                        <CardDescription className="text-xs mb-2 line-clamp-2">
                                            {name}
                                        </CardDescription>
                                        <div className="flex items-center space-x-1 mb-2">
                                            <div className="flex">
                                                {new Array(
                                                    Math.floor(ratingsAverage)
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
                                            <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                                                <span>{ratingsAverage}</span>
                                                <span>
                                                    {ratingsQuantity} Reviews
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pb-2">
                                            {priceAfterDiscount && (
                                                <span className="text-sm font-bold">
                                                    {priceAfterDiscount} EGP
                                                </span>
                                            )}
                                            <span
                                                className={
                                                    priceAfterDiscount
                                                        ? "line-through text-xs"
                                                        : "text-sm font-bold"
                                                }
                                            >
                                                {price} EGP
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="flex flex-col gap-2 ">
                                        <Button
                                            variant="default"
                                            className="text-xs px-2 py-1 h-7"
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    );
                }
            )}
        </div>
    );
}
