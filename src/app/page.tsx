import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      
      <section className="w-full max-w-lg bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700 p-6 space-y-5">
        
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300">
            Learn & Connect ✨
          </h1>
          <p className="mt-1 text-gray-300">
            Edukacja + społeczność w jednym miejscu
          </p>
        </header>

        <nav className="flex justify-center gap-4">
          <Link
            href="/about"
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-green-500 hover:text-black font-medium transition"
          >
            About
          </Link>

          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-teal-500 hover:text-black font-medium transition"
          >
            Blog
          </Link>
        </nav>

        <p className="text-center text-gray-400">
          🚀 Routing działa bez przeładowania — magia
        </p>

        <div className="bg-gray-900 p-3 rounded-xl font-mono text-sm text-gray-500 text-center border border-gray-700">
          Frontend 
          <br />
          Deploy-ready
        </div>

        <footer className="flex justify-center gap-3">
          <Link
            href="https://github.com"
            className="text-gray-500 hover:text-white text-sm transition"
          >
          Twoje repo możesz potem wrzucić na
          </Link>
        </footer>

      </section>

    </main>
  );
}
