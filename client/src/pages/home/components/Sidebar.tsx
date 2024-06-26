import ActiveConvosList from "./ActiveConvosList";
import SearchBar from "./SearchBar";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <div className="flex w-full flex-col lg:min-w-[20rem] lg:w-[20rem] bg-pink-300 max-h-screen">
      <SidebarHeader />
      <SearchBar />

      <ActiveConvosList />
    </div>
  );
};

export default Sidebar;
