import PropTypes from "prop-types";
import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  function onLoading() {
    setIsloading((pre) => !pre);
  }
  async function login(email, password) {
    onLoading();
    try {
      const loggedIn = await account.createEmailPasswordSession(
        email,
        password
      );
      setUser(loggedIn);
      onLoading();
      window.location.replace("/");
    } catch {
      onLoading();
      throw new Error("Invalid Password or Email");
    }
  }

  async function logout() {
    try {
      onLoading();
      await account.deleteSession("current");
      setUser(null);
      onLoading();
    } catch (error) {
      onLoading();
      console.log(error);
    }
  }

  async function register(email, password) {
    try {
      onLoading();
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      onLoading();
      console.log(error);
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      console.log("teste: ", loggedIn);
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, login, logout, register, onLoading, isLoading }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
