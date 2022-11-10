import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useSelector } from "react-redux";
const Home = () => {
  const secUser = useSelector((state) => state.home.secUser);

  return (
    <div className="homePage">
      <div className="container">
        <Sidebar />
        {secUser ? (
          <Chat />
        ) : (
          <div className="chat">
            <div className="SelectUser">Select User</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
