import ActiveConvosList from "./ActiveConvosList";
import SearchBar from "./SearchBar";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <div className="flex w-full flex-col lg:min-w-[20rem] lg:w-[20rem]  max-h-screen border-r">
      <SidebarHeader />
      <SearchBar />

      <ActiveConvosList />
    </div>
  );
};

export default Sidebar;
