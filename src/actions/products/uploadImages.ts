import { ImagesContract } from "../../entities/Product";
import Http from "../../Http";
import productsStore from "../../store/productsStore";


const url =`http://localhost:3000/v1/products/${
    productsStore.getProductFormPayload().id
  }/upload`;


export default async function uploadImages(images: ImagesContract[]) {
  try {
    // get files from images object and convert to array
    const files = Object.values(images).map((image) => image.file);
    console.log('files', files);
    const response = await Http.uploadFiles(url, files);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);
  }
}