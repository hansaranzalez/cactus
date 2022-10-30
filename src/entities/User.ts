import Role from "./Role";
import UserAvatar from "./UserAvatar";

export default class User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    avatar: UserAvatar;
    role: Role;
    created_at: Date;
    updated_at: Date;

    constructor(user?: User) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.lastname = user.lastname;
            this.email = user.email;
            this.password = user.password;
            this.phone = user.phone;
            if (!user.avatar) {
                this.avatar = new UserAvatar();
            } else {
                this.avatar = user.avatar;
            }
            this.role = (user.role) ? new Role(user.role) : new Role();
            this.created_at = user.created_at;
            this.updated_at = user.updated_at;
        } else {
            this.id = '';
            this.name = "";
            this.lastname = "";
            this.email = "";
            this.password = "";
            this.phone = "";
            this.avatar = new UserAvatar();
            this.role = new Role();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
        return this;
    }
}