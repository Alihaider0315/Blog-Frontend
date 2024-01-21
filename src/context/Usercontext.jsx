import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { URL } from '../url';

export const Usercontext = createContext({});

export function UserContextProvider ({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []); // Add an empty dependency array

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", { withCredentials: true });
    //   console.log(res.data);
    setUser(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Usercontext.Provider value={{ user, setUser }}>
      {children}
    </Usercontext.Provider>
  );
}
