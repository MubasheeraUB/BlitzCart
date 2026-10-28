import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import FlashSaleSection from '@/components/FlashSaleSection';

// TODO: Replace this with your actual Auth logic (e.g., getServerSession)
const mockUser = null; // Set to null to see Guest view, or an object to see Logged-in view
// const mockUser = { id: '1', name: 'Rahul', role: 'customer' }; 

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Pass the user to the Navbar */}
      <Navbar user={mockUser} />
      
      <HeroSection />
      
      {/* You can add CategorySection here */}
      
      <FlashSaleSection />
      
      {/* Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-yellow-400 p-3 rounded-full text-2xl">🏪</div>
            <div>
              <h2 className="text-xl font-bold">Become a Seller on BlitzCart</h2>
              <p className="text-blue-200 text-sm">Grow your business with our multi-vendor marketplace platform.</p>
            </div>
          </div>
          <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
            Start Selling →
          </button>
        </div>
      </section>
    </main>
  );
}