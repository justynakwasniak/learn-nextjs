"use client";

import { use } from "react";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = use(params);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Post Blog ID: {id}</h1>
      <p className="mt-2">To jest dynamiczna podstrona posta w Next.js.</p>
    </div>
  );
}
