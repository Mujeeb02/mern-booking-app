import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"; import Layout from "./Layouts/layout";
import { Routes } from "react-router";
import RegisterPage from "./Page/registerNow";
import SignIn from "./Page/signIn";
import AddHotel from "./Page/addHotel";
import { useAppContext } from "./contexts/appContexts";
import MyHotels from "./Page/myHotels";
import EditHotel from "./Page/editHotel";
import Search from "./Page/search";
import Detail from "./Components/detail";
import Booking from "./Page/booking";
import MyBookins from "./Page/myBookings";
import Home from "./Page/home";
const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
        <Route path="/detail/:hotelId" element={<Layout><Detail /></Layout>}></Route>
        {isLoggedIn && (
          <>
          <Route path="/hotel/:hotelId/booking" element={<Layout><Booking/></Layout>}></Route>
            <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>}></Route>
            <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>}></Route>
            <Route path="/my-bookings" element={<Layout><MyBookins /></Layout>}></Route>
            <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel /></Layout>}></Route>
          </>
        )}
        {/* <Route path="*" element={<Navigate to="/"/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
