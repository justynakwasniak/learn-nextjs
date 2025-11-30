import Link from "next/link"

export default function HomePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Strona główna</h1>

      <nav className="space-x-4">
        <Link href="/about" className="text-blue-600 underline">About</Link>
        <Link href="/blog" className="text-blue-600 underline">Blog</Link>
      </nav>

      <p>Przechodzenie działa bez przeładowania strony 🚀</p>
    </div>
  )
}
