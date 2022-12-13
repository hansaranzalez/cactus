
import Http from "../../Http";
import productsStore from "../../store/productsStore";





export default async function uploadImages() {
  try {
    // get files from images object and convert to array
    const images = productsStore.currentProductImages.get();
    const productId = productsStore.form.get().id;
    if (!productId) throw new Error("Product id is not defined");
    const url = `products/${productId}/upload`;
    const filtered = images.filter(img => img.url !== '' && img.isNew)
    const formData = new FormData();
    filtered.forEach((img) => {
      const file = img.file as File;
      formData.append('images[]', file, file.name);
      formData.append('order[]', String(img.order));
    });
    const response = await Http.uploadFiles(url, formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}