import axios from '@/http-common'

class UserService {
    async updateUser(uid, data) {
        return await axios.put(`/accounts/${uid}`, data)
    }

    async getUser(uid) {
        return await axios.get(`/accounts/${uid}`)
    }
}

export default new UserService();