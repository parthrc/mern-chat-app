import AvatarImg from "./AvatarImg";

const ActiveConvosList = () => {
  return (
    <div className=" w-full overflow-y-auto ">
      {data.map((d, index) => (
        <div
          className="bg-white w-full px-2 py-3 flex items-center border-b  border-b-slate-300 hover:bg-slate-200 cursor-pointer gap-x-2"
          key={index}
        >
          <AvatarImg />
          {d}
        </div>
      ))}
    </div>
  );
};

export default ActiveConvosList;

const data = [
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
  "contact name",
];
