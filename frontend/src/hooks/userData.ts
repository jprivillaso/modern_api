import { useCallback, useEffect, useState } from "react";
import { getUserData } from "../services/user";
import { User } from "../types/user.type";

export const useUserData = (user: string) => {
  const [userData, setUserData] = useState<User[]>([]);

  const fetchUserData = useCallback(async () => {
    const userData: User[] = await getUserData();
    setUserData(userData.filter(u => u.id === user));
  }, [user]);

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData]);

  return userData;
};
