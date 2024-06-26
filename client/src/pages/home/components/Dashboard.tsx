import Chat from "./Chat";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-full min-h-screen bg-slate-200">
      {/* Sidebar */}
        <Sidebar />
      {/* Chat */}
        <Chat />
    </div>
  );
};

export default Dashboard;
