import { loginUser, logoutUser, getUserById } from "./api";

export default class authService {
    static async login(email, password) {
        return loginUser(email, password);
    };

    static async logout() {
        return await logoutUser();
    };

    static async getById(id) {
        return await getUserById(id);
    }
}
