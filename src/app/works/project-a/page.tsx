export default function WorkDetail() {
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Project A</h1>
        <div className="bg-gray-200 h-96 w-full mb-8"></div> {/* Placeholder for image */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold">目的と概要</h2>
          <p>ここにプロジェクトの目的と概要が入ります。</p>
          <h2 className="text-2xl font-bold">役割と貢献</h2>
          <p>ここにあなたの役割と貢献が入ります。</p>
          <h2 className="text-2xl font-bold">使用技術</h2>
          <p>ここにプロジェクトで使用した技術が入ります。</p>
        </div>
      </div>
    </main>
  );
}