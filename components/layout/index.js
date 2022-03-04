import CNavbar from "../navbar"
import Footer from '../footer'

const Layout = ({ children }) => {
    return (
        <>
        <CNavbar/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}

export default Layout