// src/app/works/[id]/page.tsx
import type { Metadata } from "next";

type PageProps = { params: { id: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = decodeURIComponent(params.id);
  return { title: `Works | ${id}`, description: `Work detail for "${id}"` };
}

export default function WorkPage({ params }: PageProps) {
  const id = decodeURIComponent(params.id);
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Work: {id}</h1>
      <p className="text-gray-600">ここに作品「{id}」の詳細を表示します。</p>
    </main>
  );
}
