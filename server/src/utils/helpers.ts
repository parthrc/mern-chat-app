// fucntion to create a link for Avatars With Initials From Names
// avatar-placeholder.iran.liara.run

const createAvatarLink = (firstName: string, lastName: string) => {
  const URL = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
  console.log(URL);
  return URL;
};
