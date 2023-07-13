export interface ItemData {
    id: number;
    item_id: string;
    user_id: string;
    name: string;
    file_size: null | string;
    type: string;
    real_path: null | string;
    access: string;
    belongs_to: string;
    created_at: string;
    updated_at: string;
    user: {
        user_id: string,
        name: string,
        email: string,
        role: string
    }
}