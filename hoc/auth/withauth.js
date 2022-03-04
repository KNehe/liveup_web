const { useRouter } = require("next/router")
const { useState, useEffect } = require("react")
import authService from '../../features/auth/authService'

const withAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter()
        const [verfified, setVerified] = useState(false)

        useEffect(async () => {
            const authDetails = JSON.parse(localStorage.getItem('authDetails'))
            const accessToken = authDetails?.access_token

            if (!authDetails || !accessToken) {
                Router.replace('/login')
            } else {
                const isValid = await authService.verifyToken(accessToken)
                if (isValid) {
                    setVerified(isValid)
                } else {
                    localStorage.removeItem('authDetails')
                    Router.replace('/login')
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