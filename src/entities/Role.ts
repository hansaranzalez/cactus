export default class Role {
    id: number | null;
    name: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
    
    constructor(role?: Role) {
        if (role) {
            this.id = role.id;
            this.name = role.name;
            this.description = role.description;
            this.created_at = (role.created_at) ? new Date(role.created_at) : new Date();
            this.updated_at = (role.updated_at) ? new Date(role.updated_at) : new Date();
        }else {
            this.id = null;
            this.name = "";
            this.description = "";
            this.created_at = new Date();
            this.updated_at = new Date();
        }
        return this;
    }
}