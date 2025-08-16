import type { Metadata } from 'next';

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = decodeURIComponent(params.slug);
  return { title: `Special | ${title}`, description: `Special page for "${title}"` };
}

export default function SpecialPage({ params }: PageProps) {
  const title = decodeURIComponent(params.slug);
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Special: {title}</h1>
      <p className="text-gray-600">このページは「{title}」の特設ページです。</p>
    </main>
  );
}
