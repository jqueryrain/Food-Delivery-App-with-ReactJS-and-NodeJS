import axois from 'axios'

const VerifyToken = async () => {
    const token = localStorage.getItem('authToken')
    const response = await axois.post('http://localhost:3000/api/check/user/token', { token })
    return response.data.message

}

export default VerifyToken