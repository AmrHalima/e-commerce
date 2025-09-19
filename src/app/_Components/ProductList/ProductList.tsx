import { getProducts } from "@/services/getProducts";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import WishlistResponse, { WishlistItem } from "@/interface/wishlist"; // <-- define response interface
import { Product } from "@/interface/product"; // <-- define product response interface
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";
import AddToWishList from "../AddToWishList/AddToWishList";
import { getWishList } from "@/services/wishlistActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProductList({
    pageNumber,
    product,
    category,
    brand,
}: {
    product?: string;
    pageNumber?: number;
    category?: string;
    brand?: string;
}) {
    const session = await getServerSession(authOptions);

    const products = (await getProducts(
        product,
        pageNumber,
        category,
        brand
    )) as Product;

    if (!products || !Array.isArray(products.data)) {
        return <div className="text-center p-10">No products found</div>;
    }
    let wishSet = new Set<string>();
    if (session) {
        const wishList = (await getWishList()) as WishlistResponse;
        wishSet = new Set(
            wishList?.data?.map((item: WishlistItem) => item._id)
        );
    }

    return (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.data.map((item) => {
                const {
                    _id,
                    imageCover,
                    category,
                    title,
                    ratingsAverage,
                    ratingsQuantity,
                    price,
                    brand,
                } = item;

                const isActive = wishSet.has(_id);

                return (
                    <Card key={_id} className="w-full">
                        <CardContent className="p-3">
                            <div className="mb-2 relative">
                                <AddToWishList
                                    productId={_id}
                                    isActive={isActive}
                                />
                                <Link href={`/products/${_id}`}>
                                    <Image
                                        className="h-full w-full object-cover rounded-md"
                                        quality={75}
                                        loading="lazy"
                                        src={imageCover}
                                        width={360}
                                        height={360}
                                        alt={title.replaceAll(" ", "-")}
                                    />
                                </Link>
                            </div>
                            <CardTitle className="text-sm mb-1">
                                {title.split(" ").slice(0, 3).join(" ")}
                            </CardTitle>
                            <CardDescription className="text-xs mb-2 line-clamp-2">
                                <p>{category?.name}</p>
                                <p>Brand: {brand?.name}</p>
                            </CardDescription>

                            {/* Ratings */}
                            <div className="flex items-center space-x-1 mb-2">
                                <div className="flex">
                                    {new Array(Math.floor(ratingsAverage))
                                        .fill(0)
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    {new Array(5 - Math.floor(ratingsAverage))
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
                                    <span>{ratingsQuantity} Reviews</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between pb-2">
                                {price}
                            </div>

                            <div className="flex flex-col gap-2">
                                <AddToCart productId={_id} />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
