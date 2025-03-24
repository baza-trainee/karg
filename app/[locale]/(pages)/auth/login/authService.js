import { loginUser, logoutUser, getUserById } from "./api";

export default class authService {
    static async login(email, password) {
        return loginUser(email, password);
    };

    static async logout(setIsDirector) {
        return await logoutUser(setIsDirector);
    };

    static async getById(id) {
        return await getUserById(id);
    }
}
