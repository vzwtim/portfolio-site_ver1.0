export default function Contact() {
  return (
    <main className="bg-[#ffffff] text-[#232024] py-20 px-8 md:px-16 lg:px-32 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-24 text-center mt-24">
          Contact
        </h1>

        {/* Contact Form Section */}
        <section className="mb-24 border border-gray-200/80 p-8 rounded-sm bg-white/50">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Feel free to reach out
          </h2>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
              <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
              <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors" />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-lg font-medium mb-2">Subject</label>
              <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors" />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea id="message" rows={7} className="w-full p-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#b33953] transition-colors"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="inline-block bg-[#232024] text-[#f7f7f7] px-12 py-4 hover:bg-[#b33953] transition-colors duration-300 cursor-pointer">
                Send
              </button>
            </div>
          </form>
        </section>

      </div>
    </main>
  );
}
