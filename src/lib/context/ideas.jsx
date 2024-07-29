import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";
import PropTypes from "prop-types";
import { useUser } from "./user";

export const IDEAS_DATABASE_ID = "66a76ca10011f42fd6e8";
export const IDEAS_COLLECTION_ID = "66a76cc60014ee3981fe";

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  function onLoading() {
    setIsloading((pre) => !pre);
  }
  async function add(idea) {
    try {
      if (idea.title !== "" || idea.description !== "") {
        onLoading();
        const response = await databases.createDocument(
          IDEAS_DATABASE_ID,
          IDEAS_COLLECTION_ID,
          ID.unique(),
          idea
        );
        setIdeas((ideas) => [response, ...ideas].slice(0, 10));
        onLoading();
      } else {
        alert("One or more filds empt");
      }
    } catch (error) {
      onLoading();
      console.log(error);
    }
  }

  async function remove(id) {
    try {
      onLoading();
      await databases.deleteDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        id
      );
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
      onLoading();
    } catch (error) {
      onLoading();
      console.log(error);
    }
  }

  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setIdeas(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider
      value={{ current: ideas, add, remove, isLoading, onLoading }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

IdeasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
