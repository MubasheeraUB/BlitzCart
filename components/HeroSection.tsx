import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        
        {/* Left Content */}
        <div className="md:w-1/2 z-10">
          <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
             Limited Time Flash Sale
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
            Deals That <span className="text-blue-600">Don't Wait.</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Discover incredible deals, shop your favorite products, and grab limited-time offers before they disappear.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full flex items-center gap-2 transition">
            Shop Flash Deals <ArrowRight size={20} />
          </button>
        </div>

        {/* Right Content / Countdown */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col items-center md:items-end z-10">
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-sm">
            <p className="text-gray-500 text-sm mb-2">Next Flash Sale In</p>
            <div className="flex gap-4 justify-center">
              {['02 Days', '14 Hours', '32 Mins', '17 Secs'].map((time, i) => (
                <div key={i} className="text-center">
                  <span className="block text-2xl font-bold text-gray-900">{time.split(' ')[0]}</span>
                  <span className="text-xs text-gray-500">{time.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Placeholder for Hero Image (Headphones/Watch) */}
          <div className="text-6xl">🎧  📱</div> 
        </div>

        {/* Background Decorative Blob */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-200 rounded-full opacity-50 blur-3xl"></div>
      </div>
    </section>
  );
}