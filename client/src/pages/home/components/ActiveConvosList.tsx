import useGetActiveConversations from "../../../hooks/useGetActiveConversations";
import { ActiveConversation } from "../../../types/api.types";
import AvatarImg from "./AvatarImg";

const ActiveConvosList = () => {
  const { activeConversations, isLoading } = useGetActiveConversations();

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!isLoading && activeConversations.length === 0) {
    return (
      <div className="w-full overflow-y-auto text-black">
        Search to start chatting with a user
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto">
      {activeConversations.map((d: ActiveConversation, index) => (
        <div
          className="bg-white w-full px-2 py-3 flex items-center border-b border-b-slate-300 hover:bg-slate-200 cursor-pointer gap-x-2"
          key={index}
        >
          <AvatarImg />
          {d.otherParticipant.firstName}
        </div>
      ))}
    </div>
  );
};

export default ActiveConvosList;
