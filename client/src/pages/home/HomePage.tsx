// import { Link } from "react-router-dom";
// import { Button } from "../../components/ui/button";
import Dashboard from "./components/Dashboard";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const navigate = useNavigate();
  // const { user } = useAuth();
  // if (!user) return navigate("/login");

  return (
    <div className="w-full min-h-screen bg-slate-200 flex flex-col items-center">
      {/* <div className="flex flex-col items-center gap-y-4 my-auto">
        <h1 className="text-4xl font-extrabold uppercase lg:text-7xl shadow-md">
          MERN Chat App
        </h1>
        <p className="text-xl text-center w-1/2 lg:text-4xl ">
          A realtime chat application built using MERN stack and Socket.io
        </p>
        <Link to="/login">
          <Button className="mt-4">Login</Button>
        </Link>
      </div> */}
      <Dashboard />
    </div>
  );
};

export default HomePage;
