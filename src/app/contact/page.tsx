import Link from 'next/link';

export default function Contact() {
  return (
    <main className="bg-[#f7f7f7] text-[#232024] py-20 px-8 md:px-16 lg:px-32 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-medium mb-16 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
          お問い合わせ
        </h1>

        {/* Contact Form Section */}
        <section className="mb-24 border border-gray-200/80 p-8 rounded-sm bg-white/50">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
            ご連絡はこちらから
          </h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>氏名</label>
              <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>メールアドレス</label>
              <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors" />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-lg font-medium mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>件名</label>
              <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors" />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-lg font-medium mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>メッセージ</label>
              <textarea id="message" rows={7} className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="inline-block bg-[#232024] text-[#f7f7f7] px-12 py-4 hover:bg-[#b33953] transition-colors duration-300 cursor-pointer" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                送信
              </button>
            </div>
          </form>
        </section>

        {/* Social Media Links Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: '"Shippori Mincho", serif' }}>
            ソーシャルメディア
          </h2>
          <div className="flex justify-center space-x-8 text-xl">
            <a href="#" className="hover:text-[#b33953] transition-colors" style={{ fontFamily: '"Shippori Mincho", serif' }}>Twitter</a>
            <a href="#" className="hover:text-[#b33953] transition-colors" style={{ fontFamily: '"Shippori Mincho", serif' }}>LinkedIn</a>
            <a href="#" className="hover:text-[#b33953] transition-colors" style={{ fontFamily: '"Shippori Mincho", serif' }}>GitHub</a>
          </div>
        </section>
      </div>
    </main>
  );
}