export default class UserAvatar {
    id: number;
    url: string;
    name: string;
    size: number;
    type: string;
    created_at: string;
    updated_at: string;

    constructor(avatar?: UserAvatar) {
        if (avatar) {
            this.id = avatar.id;
            this.url = avatar.url;
            this.name = avatar.name;
            this.size = avatar.size;
            this.type = avatar.type;
            this.created_at = avatar.created_at;
            this.updated_at = avatar.updated_at;
        } else {
            this.id = 0;
            this.url = '';
            this.name = '';
            this.size = 0;
            this.type = '';
            this.created_at = '';
            this.updated_at = '';
        }
        return this;
    }
}