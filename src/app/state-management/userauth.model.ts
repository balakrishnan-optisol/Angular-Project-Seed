export class UserAuth  extends Map<string, any> {
    pending: boolean = false;
    is_logged_in: boolean = false;
    user_data: UserData | null
}

export class ProgressState extends Map<string, any> {
    show_progress: boolean = false;
}

export class ProgressStateRecord {
    show_progress = false;
}

export class UserAuthRecord {
    pending = false;
    is_logged_in = false;
    user_data = null
}

export interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    user_type: string;
}

export interface UserDataPass {
    email: string;
    password: string;
}