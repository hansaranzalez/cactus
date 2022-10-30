import { computed, reactive } from "vue";

interface IntagramPostContract {
    id: string;
    caption: string;
    media_type: string;
    media_url: string;
    permalink: string;
    thumbnail_url: string;
    timestamp: string;
    username: string;
}

interface FacebookSdkStateContract {
    initialized: boolean;
    loading: boolean;
    error: boolean;
    intagramPost: IntagramPostContract;
    facebookUserAccessToken: string | null;
}

const state = reactive<FacebookSdkStateContract>({
    initialized: false,
    loading: false,
    error: false,
    intagramPost: {
        id: "",
        caption: "Pruebas",
        media_type: "",
        media_url: "https://cactus-47.s3.amazonaws.com/Screenshot%20from%202022-10-05%2011-40-29.png",
        permalink: "",
        thumbnail_url: "",
        timestamp: "",
        username: "",
    },
    facebookUserAccessToken: null,
});

const facebookSdk = computed(() => ({
    initialized: {
        get: () => state.initialized,
        set: (value: boolean) => (state.initialized = value),
    },
    loading: {
        get: () => state.loading,
        set: (value: boolean) => (state.loading = value),
    },
    error: {
        get: () => state.error,
        set: (value: boolean) => (state.error = value),
    },
    intagramPost: {
        get: () => state.intagramPost,
        set: (value: IntagramPostContract) => (state.intagramPost = value),
    },
    postCaption: {
        get: () => state.intagramPost.caption,
        set: (value: string) => (state.intagramPost.caption = value),
    },
    facebookUserAccessToken: {
        get: () => state.facebookUserAccessToken,
        set: (value: string) => (state.facebookUserAccessToken = value),
    },
    setMediaImageUrl: (mediaUrl: any) => {
        state.intagramPost.media_url = mediaUrl;

    },
    login: () => {
        return new Promise((resolve: any) => {
            (window as any).FB.login(
                (response: any) => {
                    if (response.authResponse) {
                        state.facebookUserAccessToken = response.authResponse.accessToken;
                        resolve(response.authResponse.accessToken);
                    }
                },
                { scope: "instagram_basic,pages_show_list" }
            );
        });
    },
    logout: () => {
        return new Promise((resolve: any) => {
            (window as any).FB.logout((response: any) => {
                state.facebookUserAccessToken = null;
                resolve(response);
            });
        });
    },
    loginStatus: () => {
        return new Promise((resolve: any) => {
            (window as any).FB.getLoginStatus((response: any) => {
                if (response.status === "connected") {
                    state.facebookUserAccessToken = response.authResponse.accessToken;
                    resolve(response.authResponse.accessToken);
                }
            });
        });
    },

    getFacebookPages: () => {
        return new Promise((resolve: any) => {
            (window as any).FB.api(
                "/me/accounts",
                "GET",
                { access_token: state.facebookUserAccessToken },
                (response: any) => {
                    resolve(response.data);
                }
            );
        });
    },
    getInstagramAccountId: (facebookPageId: string) => {
        return new Promise((resolve: any) => {
            (window as any).FB.api(
                `/${facebookPageId}?fields=instagram_business_account&access_token=${state.facebookUserAccessToken}`,
                "GET",
                (response: any) => {
                    resolve(response.instagram_business_account.id);
                }
            );
        });
    },
    createMediaObjectContainer: (instagramAccountId: string) => {
        console.log('instagramAccountId', instagramAccountId)
        return new Promise((resolve) => {
            (window as any).FB.api(
                `${instagramAccountId}/media`,
                "POST",
                {
                    access_token: state.facebookUserAccessToken,
                    image_url: state.intagramPost.media_url,
                    caption: state.intagramPost.caption,
                },
                (response: any) => {
                    console.log('Resss',response)
                    resolve(response.id);
                }
            );
        });
    },
    publishMediaObject: (instagramAccountId: string, mediaObjectId: string) => {
        console.log({
            access_token: state.facebookUserAccessToken,
            creation_id: mediaObjectId,
        })
        return new Promise((resolve) => {
            
            (window as any).FB.api(
                `${instagramAccountId}/media_publish`,
                "POST",
                {
                    access_token: state.facebookUserAccessToken,
                    creation_id: mediaObjectId,
                },
                (response: any) => {
                    resolve(response.id);
                }
            );
        });
    },
}));

export default facebookSdk.value;