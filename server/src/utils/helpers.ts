import jwt from "jsonwebtoken";

/**
 * API LINK: avatar-placeholder.iran.liara.run
 * Returns a link for Avatar Image With Initials From Names
 * @param firstName first anem of the user
 * @param lastName last name of the user *
 * @returns api link for avatar image
 */
const createAvatarLink = (firstName: string, lastName?: string): string => {
  const URL = lastName
    ? `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`
    : `https://avatar.iran.liara.run/username?username=${firstName}`;

  return URL;
};

/**
 * Returns a JWT
 * @param userId userId od the user *
 * @returns JWT
 */
const generateJWT = (userId: string): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //   console.log("JWT:", token);
  return token;
};

export { createAvatarLink, generateJWT };
