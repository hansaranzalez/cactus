import { RoleType } from "../@types";
import Role from "./Role";
import RolesStore from "../store/rolesStore";
import { computed, reactive } from "vue";
import UserAvatar from "./UserAvatar";


export interface UserRegistrationPayload {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}

export default class User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    avatar: UserAvatar;
    role: Role;
    isAdmin: boolean;
    isUser: boolean;
    isGuest: boolean;
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
                this.avatar = new UserAvatar(user.avatar);
            }
            this.role = (user.role) ? new Role(user.role) : new Role();
            this.created_at = user.created_at;
            this.updated_at = user.updated_at;
        } else {
            this.id = 0;
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

        this.isAdmin = computed({
            get: () => this.checkRole('ADMIN'),
            set: (value: boolean) => {
                this.setRole('ADMIN');
            }
        }).value;
        this.isUser = computed({
            get: () => this.checkRole('USER'),
            set: (value: boolean) => {
                this.setRole('USER');
            }
        }).value;
        this.isGuest = computed({
            get: () => this.checkRole('GUEST'),
            set: (value: boolean) => {
                this.setRole('GUEST');
            }
        }).value;
        return this;
    }

    checkRole(role: RoleType): boolean {
        return this.role.name === role;
    }

    setRole(role: RoleType) {
        const rolesList = RolesStore.getRolesList();
        const roleToAdd = rolesList.find((r) => r.name === role);
        if (roleToAdd) {
            this.role = roleToAdd;
        }
    }

    getLoginPayload(): { email: string; password: string } {
        return {
            email: this.email,
            password: this.password,
        };
    }

    getRegisterPayload(): UserRegistrationPayload {
        return {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            phone: this.phone,
        };
    }

}