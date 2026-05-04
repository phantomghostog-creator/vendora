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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Ready to Upgrade Your Setup?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of satisfied customers who have elevated their digital workspace with SaaSStore. 
            Free shipping on orders over $100.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Browse All Products
            </button>
            <button className="bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all">
              Contact Sales
            </button>
          </div>
          <p className="mt-8 text-sm text-gray-500 italic">
            * 90-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>
    </main>
  );
}
