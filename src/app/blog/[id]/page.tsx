"use client";

import { use } from "react";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = use(params); // Rozpakowuje obietnicę params


  // id jest z nazwy folderu [id], kiedy jestesmy` na stronie /blog/123 to id będzie równe "123"

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Post Blog ID: {id}</h1>
      <p className="mt-2">To jest dynamiczna podstrona posta w Next.js.</p>
    </div>
  );
}
