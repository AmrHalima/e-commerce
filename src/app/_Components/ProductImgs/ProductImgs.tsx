"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import AddToWishList from "../AddToWishList/AddToWishList";

interface ProductImagesProps {
    coverImage: string;
    images: string[];
    title: string;
    id: string;
}

export default function ProductImages({
    id,
    coverImage,
    images,
    title,
}: ProductImagesProps) {
    const [selectedImage, setSelectedImage] = useState<string>(coverImage);

    return (
        <div className="relative md:w-1/2 w-full space-y-4">
            <div className="relative w-3/4 mx-auto h-[400px]">
                <AddToWishList productId={id} />
                <Image
                    src={selectedImage}
                    alt={title}
                    fill
                    className="object-cover rounded-md"
                    quality={75}
                    priority
                />
            </div>

            {images.length > 0 && (
                <Carousel className="mx-auto w-2/3">
                    <CarouselContent>
                        {images.map((img, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/3 cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className="aspect-square w-full overflow-hidden rounded-md border border-muted">
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        width={150}
                                        height={150}
                                        className="object-cover w-full h-full transition-transform hover:scale-105"
                                        quality={30}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    );
}
