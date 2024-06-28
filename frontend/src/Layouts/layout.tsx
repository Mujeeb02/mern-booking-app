import Hero from "../Components/hero"
import Header from "../Components/header"
import Footer from "../Components/footer"
import SearchBar from "../Components/searchBar";
interface Props{
    children:React.ReactNode;
}
const Layout = ({children}:Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero/>
            <div className="container mx-auto">
                <SearchBar/> 
            </div>
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default Layout