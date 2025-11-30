import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Blog</h1>
      <Link href="/blog/123" className="underline text-blue-600">Zobacz post 123</Link>
      <Link href="/blog/456" className="underline text-blue-600">Zobacz post 456</Link>
    </div>
  );
}
