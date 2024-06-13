import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";import Layout from "./Layouts/layout";
import { Routes } from "react-router";
import RegisterPage from "./Page/registerNow";
import SignIn from "./Page/signIn";
import AddHotel from "./Page/addHotel";
import { useAppContext } from "./contexts/appContexts";
const App = () => {
  const{isLoggedIn}=useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>} />
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage/></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>} />
        {isLoggedIn && (
          <>
          <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>}></Route>
          </>
        )}
        {/* <Route path="*" element={<Navigate to="/"/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
