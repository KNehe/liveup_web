import { useRouter } from "next/router"
import { useNavigator } from "../../hooks/hooks"

const withAuthPage = (AuthComponent) => {
    return (props) => {
        const router = useRouter()

        if (typeof window !== "undefined") {
            const authDetails = JSON.parse(localStorage.getItem('authDetails'))
            if (!authDetails || !authDetails?.user || !authDetails?.access_token){
                return <AuthComponent {...props}/>
            } else {
                useNavigator(router, authDetails)
            }
        }
        return null
    }
}

export default withAuthPage