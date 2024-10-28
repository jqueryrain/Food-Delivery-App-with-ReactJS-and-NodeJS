import axois from 'axios'
import config from '../config/config'

const VerifyToken = async () => {
    const token = localStorage.getItem('authToken')
    const response = await axois.post(`${config.Server_URL}/check/user/token`, { token })
    if (response.data.message === 'User Authenticated!') {
        return true
    } else {
        return false
    }
}

export default VerifyToken