import { Product } from "@/interface/product";

export async function getProducts(
    product?: String,
    pageNumber?: Number,
    category?: String,
    brand?: String
): Promise<Product | null> {
    try {
        const res: Response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products${
                product ? `/${product}` : ""
            }${pageNumber ? `?page=${pageNumber}` : ""}${
                category ? `?category[in]=${category}` : ""
            }${brand ? `?brand=${brand}` : ""}`
        );
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const products: Product = await res.json();
        return products;
    } catch (error) {
        console.log(error);
        return null;
    }
}
