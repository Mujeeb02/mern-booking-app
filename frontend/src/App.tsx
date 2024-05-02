import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";import Layout from "./Layouts/layout";
import { Routes } from "react-router";
import RegisterPage from "./Page/registerNow";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>} />
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage/></Layout>} />
        {/* <Route path="*" element={<Navigate to="/"/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
