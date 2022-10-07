export default class Category {
    public id: number | null;
    public name: string;
    public description: string;
    public created_at: string;
    public updated_at: string;

    constructor(category?: Category) {

        if (category) {
            this.id = category.id;
            this.name = category.name;
            this.description = category.description;
            this.created_at = category.created_at;
            this.updated_at = category.updated_at;
        } else {
            this.id = null;
            this.name = "";
            this.description = "";
            this.created_at = "";
            this.updated_at = "";
        }

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };

    }
}