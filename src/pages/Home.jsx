import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section className="flex flex-1 flex-col justify-start items-center gap-10 mt-6">
      {user.current ? (
        <div className="flex w-[50%] flex-col gap-4">
          <h2 className="text-2xl">Submit Idea</h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              className="w-80 h-12 bg-zinc-800 focus:outline-none px-2 rounded-lg"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              placeholder="Description"
              value={description}
              className=" h-16 bg-zinc-800 focus:outline-none px-2 rounded-lg"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <button
              type="button"
              className="bg-lime-600 py-2 px-4 rounded-lg font-medium hover:bg-lime-800"
              onClick={async () => {
                await ideas.add({
                  userId: user.current.$id,
                  title,
                  description,
                });
                setTitle("");
                setDescription("");
              }}
              disabled={ideas.isLoading}
            >
              {ideas.isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <section>
          <p>Please login to submit an idea.</p>
        </section>
      )}
      <div className="flex w-[50%] flex-col gap-4">
        <h2>Latest Ideas</h2>
        <ul className="flex flex-col gap-3">
          {ideas.current.map((idea) => (
            <li
              key={idea.$id}
              className="flex flex-row justify-between border p-4 items-center border-zinc-800"
            >
              <div>
                <strong>{idea.title}</strong>
                <p className="text-zinc-400">{idea.description}</p>
              </div>
              {user.current && user.current.$id === idea.userId && (
                <button
                  type="button"
                  className="bg-lime-900 px-8 rounded-lg h-8 hover:bg-red-800"
                  onClick={() => ideas.remove(idea.$id)}
                  disabled={ideas.isLoading}
                >
                  {ideas.isLoading ? "Loading..." : "Remove"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
