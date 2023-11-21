import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chat from "./Chat";

const Layout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
      <Chat />
      <Footer />
    </>
  );
};
export default Layout;
