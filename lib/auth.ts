import { auth as nextAuth } from "@/auth";

export const currentUser = async () => {
  const session = await nextAuth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await nextAuth();

  return session?.user?.role;
};
