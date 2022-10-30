import facebookSdk from "./facebookSdk";

export default async function shareInstagramPost() {
    facebookSdk.loading.set(true);
    const facebookPages = await facebookSdk.getFacebookPages();
    const instagramAccountId = await facebookSdk.getInstagramAccountId((facebookPages as any)[0].id);
    const mediaObjectId = await facebookSdk.createMediaObjectContainer(instagramAccountId as string);
    console.log(instagramAccountId,mediaObjectId)
    await facebookSdk.publishMediaObject(instagramAccountId as string, mediaObjectId as string);
    facebookSdk.loading.set(false);
    facebookSdk.intagramPost.set({
        id: '',
        caption: "",
        media_type: "",
        media_url: "",
        permalink: "",
        thumbnail_url: "",
        timestamp: "",
        username: "",
    })

}