import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../datahandling/databasehandling";
import { useRouter } from "next/router";

// From: https://github.com/dijonmusters/build-a-saas-with-next-js-supabase-and-stripe/blob/master/14-implement-authorization-using-row-level-security-and-policies/context/user.js
const Context = createContext({});

const Provider = ({ children }:any) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const login = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    login,
    logout,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser:any = () => useContext(Context);

export default Provider;