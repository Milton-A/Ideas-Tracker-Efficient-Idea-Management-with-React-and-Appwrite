import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div className="bg-zinc-900 w-screen h-screen text-zinc-50">
      <UserProvider>
        <IdeasProvider>
          <Navbar />
          <main className="flex flex-1 h-[90%]">
            {isLoginPage ? <Login /> : <Home />}
          </main>
        </IdeasProvider>
      </UserProvider>
    </div>
  );
}

function Navbar() {
  const user = useUser();

  return (
    <nav className="py-2 px-8 bg-zinc-800 text-zinc-50 flex flex-row justify-between items-center">
      <a href="/" className="text-3xl hover:text-lime-500 font-bold">
        Idea tracker
      </a>
      <div className="flex flex-row items-center gap-4">
        {user.current ? (
          <>
            <span className="text-lg">{user.current.email}</span>
            <button
              type="button"
              onClick={() => user.logout()}
              className="bg-lime-200 text-lime-950 py-2 px-4 rounded-lg font-medium hover:bg-lime-800 hover:text-zinc-50"
              disabled={user.isLoading}
            >
              {user.isLoading ? "Loading..." : "Logout"}
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="bg-lime-600 py-2 px-4 rounded-lg font-medium hover:bg-lime-800"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

export default App;
