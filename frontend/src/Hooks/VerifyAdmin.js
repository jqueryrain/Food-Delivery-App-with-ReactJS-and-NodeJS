import axois from 'axios'
import config from '../config/config'

const VerifyAdmin = async () => {
    const token = localStorage.getItem('token')
    const response = await axois.post(`${config.Server_admin_URL}/check/admin/token`, { token })
    if (response.status === 200 && response.data.message === 'User Authenticated!') {
        return true
    } else {
        return false
    }
}

export default VerifyAdmin