export class RepositoryItem {
    id: number;
    name: String;
    created_at: Date;
    visible: Boolean;
    description: String;
    owner!: {
        login: String;
    };
    constructor(id: number, name: String, created_at: Date, visible: Boolean, description: String, owner: { login: String }) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.visible = visible;
        this.description = description;
        this.owner.login = owner.login;
    }
}