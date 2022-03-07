const { useRouter } = require("next/router")
const { useState, useEffect } = require("react")
import { useDispatch } from 'react-redux'
import authService from '../../features/auth/authService'
import { resetAuthDetails } from '../../features/auth/authSlice'

const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter()
        const [verfified, setVerified] = useState(false)
        const dispatch = useDispatch()

        useEffect(async () => {
            const authDetails = JSON.parse(localStorage.getItem('authDetails'))
            const accessToken = authDetails?.access_token

            if (!authDetails || !accessToken) {
                Router.replace('/login')
                return
            } else {
                const isValid = await authService.verifyToken(accessToken)
                if (isValid) {
                    setVerified(isValid)
                    return
                } else {
                    localStorage.removeItem('authDetails')
                    dispatch(resetAuthDetails())
                    Router.replace('/login')
                    return
                }
            }
        }, [])

        if (verfified) {
            return <WrappedComponent {...props} />
        } else {
            return null
        }
    }
}

export default withAuth