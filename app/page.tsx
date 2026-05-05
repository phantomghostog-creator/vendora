import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ProductShowcase />
      <Testimonials />
      <FAQ />
      
      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-50 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-8">
            Limited time offer
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Shopify & Whop</span> killer is here.
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Stop overpaying for your store. Start for <strong className="text-gray-900">$15/mo</strong> and join the next generation of digital entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:opacity-90 transition-all shadow-xl shadow-purple-200 transform hover:-translate-y-1">
              Build your store now
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
              View demo
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-gray-400 grayscale opacity-70">
            {/* Trusted by logos would go here */}
            <span className="font-bold text-lg">Trusted by 5,000+ sellers</span>
          </div>
        </div>
      </section>
    </main>
  );
}
