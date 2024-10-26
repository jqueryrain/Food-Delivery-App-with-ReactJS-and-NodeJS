import axois from 'axios'

const VerifyToken = async () => {
    const token = localStorage.getItem('authToken')
    const response = await axois.post('http://localhost:3000/api/check/user/token', { token })
    if (response.data.message === 'User Authenticated!') {
        return true
    } else {
        return false
    }
}

export default VerifyToken