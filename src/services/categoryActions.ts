export async function getCategory(categoryId?: string) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${
            categoryId ? categoryId : ""
        }`,
        {
            method: "GET",
        }
    );
    if (res.ok) {
        const categories = await res.json();
        return categories;
    } else {
        throw new Error("Failed to fetch categories");
    }
}
