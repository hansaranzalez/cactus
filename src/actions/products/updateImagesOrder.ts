import Http from "../../Http";
import productsStore from "../../store/productsStore";

export async function updateImagesOrder(): Promise<void> {
    try {
        const images = productsStore.currentProductImages.get();
        const productId = productsStore.product.get().id;
        if (!productId) throw new Error("Product id is not defined");
        const url = `products/update-images-order`;
        const filtered = images.filter(img => img.url !== '')
        const order = filtered.map(img => ({ order: img.order, id: img.id }));
        const response = await Http.post(url, order);
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}