export class Repository {
    [x: string]: any;
    id: number;
    name: String;
    created_at: Date;
    visible: Boolean;
    description: String;
    owner!: {
        login: String;
    };
    total_count: number
    constructor(id: number, name: String, created_at: Date, visible: Boolean, description: String, owner: { login: String },
        total_count: number) {
        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.visible = visible;
        this.description = description;
        this.owner.login = owner.login;
        this.total_count = total_count
    }
}