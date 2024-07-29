import { useState } from "react";
import { useUser } from "../lib/context/user";

export function Login() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex flex-col flex-1 mt-40 items-center gap-4">
      <h1 className="text-5xl">Login or register</h1>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-80 h-12 bg-zinc-800 focus:outline-none px-2 rounded-lg"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-80 h-12 bg-zinc-800 focus:outline-none px-2 rounded-lg"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="flex flex-col gap-2">
          <button
            className="bg-lime-600 py-2 px-4 rounded-lg font-medium hover:bg-lime-800"
            type="button"
            onClick={() => user.login(email, password)}
            disabled={user.isLoading}
          >
            {user.isLoading ? "Loading..." : "Login"}
          </button>
          <button
            className="bg-lime-700 text-lime-950 py-2 px-4 rounded-lg font-medium hover:bg-lime-600"
            type="button"
            onClick={() => user.register(email, password)}
            disabled={user.isLoading}
          >
            {user.isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
}
