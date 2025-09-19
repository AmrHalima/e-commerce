import { Params } from "next/dist/server/request/params";
import React from "react";
import { getProducts } from "@/services/getProducts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import ProductImages from "@/app/_Components/ProductImgs/ProductImgs";
import { Daum, Product } from "@/interface/product";
import AddToCart from "@/app/_Components/AddToCart/AddToCart";

export async function generateMetadata({ params }: { params: Params }) {
    const id = (await params).productId;
    const product: Product | null = await getProducts(id?.toString());
    if (!product) {
        return {
            title: "Product Not Found",
        };
    }
    if (!Array.isArray(product.data))
        return {
            title: product?.data.title,
            description: product?.data.description,
            keywords: [product?.data.category.name, product?.data.brand.name],
        };
}
export default async function ProductDetails({ params }: { params: Params }) {
    const { productId } = await params;
    const product = await getProducts(productId?.toString());

    if (!product || Array.isArray(product.data)) {
        return <div className="text-center p-10">No product found</div>;
    }

    const {
        images,
        title,
        slug,
        description,
        price,
        imageCover,
        category: { name: categoryName },
        brand: { name: brandName },
        ratingsAverage,
        ratingsQuantity,
        priceAfterDiscount,
        id,
    }: Daum = product.data;

    const renderStars = (rating: number) => {
        const filledStars = Math.floor(rating);
        const emptyStars = 5 - filledStars;

        return (
            <>
                {Array(filledStars)
                    .fill(0)
                    .map((_, i) => (
                        <StarIcon
                            key={`filled-${i}`}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                {Array(emptyStars)
                    .fill(0)
                    .map((_, i) => (
                        <StarIcon
                            key={`empty-${i}`}
                            className="h-4 w-4 text-gray-300"
                        />
                    ))}
            </>
        );
    };

    return (
        <div className="container mx-auto py-10">
            <Card className="flex flex-col md:flex-row gap-8 p-6 shadow-md">
                {/* 🖼 Interactive Images */}

                <ProductImages
                    id={id}
                    coverImage={imageCover}
                    images={images}
                    title={title}
                />

                {/* ℹ️ Product Info */}
                <CardContent className="flex flex-col gap-4 md:w-1/2">
                    <CardTitle className="text-3xl font-bold">
                        {title}
                    </CardTitle>

                    <div className="text-muted-foreground text-sm space-y-1">
                        <p>
                            <strong>Category:</strong> {categoryName}
                        </p>
                        <p>
                            <strong>Brand:</strong> {brandName}
                        </p>
                        <p>{description}</p>
                        <p className="text-xs">Slug: {slug}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {renderStars(ratingsAverage)}
                        <span className="text-sm text-muted-foreground">
                            ({ratingsAverage} from {ratingsQuantity} reviews)
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {priceAfterDiscount && (
                            <span className="text-lg font-semibold text-primary">
                                {priceAfterDiscount} EGP
                            </span>
                        )}
                        <span
                            className={`text-sm ${
                                priceAfterDiscount
                                    ? "line-through text-muted-foreground"
                                    : "font-semibold text-primary"
                            }`}
                        >
                            {price} EGP
                        </span>
                    </div>
                    <AddToCart productId={id} />
                </CardContent>
            </Card>
        </div>
    );
}
