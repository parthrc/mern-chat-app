import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

interface AvatarImgProps {
  profileUrl?: string;
}

const AvatarImg = ({ profileUrl }: AvatarImgProps) => {
  return (
    <Avatar className="">
      <AvatarImage src={profileUrl || "https://github.com/shadcn.png"} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarImg;
