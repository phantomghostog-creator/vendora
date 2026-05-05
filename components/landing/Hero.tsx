export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full opacity-10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              Now live and accepting sellers worldwide
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              The <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Shopify & Whop</span> killer
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Super simple for buyers. Easy dashboard for you. Start for <strong className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">$15/mo</strong> — less than Netflix.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/signup" className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition shadow-lg shadow-purple-500/30">
                Start free trial
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/demo" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition border border-white/20">
                Watch demo
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-400">Trusted by 5,000+ businesses worldwide</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg inline-block font-semibold">
                    Your Store Dashboard
                  </div>
                  <p className="text-gray-500 mt-2 text-sm">Easy admin panel preview</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl shadow-lg p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Today&apos;s Sales</p>
                  <p className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">$1,247</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
