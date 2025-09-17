import { Product } from "@/interface/product";

export async function getProducts(
    product?: String,
    pageNumber?: Number
): Promise<Product | undefined> {
    try {
        const res: Response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products${
                product ? `/${product}` : ""
            }${pageNumber ? `?page=${pageNumber}` : ""}`,
            {
                cache: "force-cache", //!temprory
            }
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
