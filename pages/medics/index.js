import Head from "next/head"
import { useSelector } from "react-redux"

const Index = () => {
    const { authDetails } = useSelector((state) => state.auth)
    return (
        <>
        <Head>
            <title>Receptionist | { authDetails.user.username}</title>
        </Head>
         <div>Medic</div>
         </>
    )
}

export default Index