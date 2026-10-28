import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

// Mock Data
const products = [
  {
    id: 1,
    name: "Apple AirPods Pro",
    discount: "45% OFF",
    price: "₹12,695",
    oldPrice: "₹24,900",
    rating: "4.8",
    stock: 75,
    src:"airpods-pro.jpg"
  },
  {
    id: 2,
    name: "Noise ColorFit Pro 4",
    discount: "40% OFF",
    price: "₹4,799",
    oldPrice: "₹7,999",
    rating: "4.6",
    stock: 50,
    src:"noise-colorfit.jpg"
  },
  {
    id: 3,
    name: "HP Pavilion Laptop",
    discount: "25% OFF",
    price: "₹30,999",
    oldPrice: "₹39,999",
    rating: "4.6",
    stock: 25,
    src:"hp-pavilion.jpg"
  },
  {
    id: 4,
    name: "Nike Air Force 1",
    discount: "30% OFF",
    price: "₹5,999",
    oldPrice: "₹8,595",
    rating: "4.4",
    stock: 10,
    src:"nike-ariforce.jpg"
  },
];

export default function FlashSaleSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            ⚡ Flash Sale{" "}
            <span className="text-sm font-normal text-gray-500 ml-2">
              Hot deals. Limited time. Don't miss out!
            </span>
          </h2>
        </div>
        <button className="text-blue-600 font-medium hover:underline">
          View All Flash Deals →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Grid (Takes 3 columns) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="relative mb-4">
                <div className="relative h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden z-0">
                  <Image
                    src={`/products/${product.src}`} 
                    alt="Apple AirPods Pro"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
                  {product.discount}
                </span>

                <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md text-gray-400 hover:text-red-500 z-10 transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <span className="text-yellow-400">★</span> {product.rating}{" "}
                (1.2k)
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-red-600 font-bold">{product.price}</span>
                <span className="text-gray-400 text-xs line-through">
                  {product.oldPrice}
                </span>
              </div>

              {/* Stock Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                <div
                  className="bg-red-500 h-1.5 rounded-full"
                  style={{ width: `${product.stock}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Only {product.stock}% left
              </p>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-2">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Right Sidebar (Takes 1 column) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Big Savings Banner */}
          <div className="bg-blue-900 text-white rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-xl font-bold mb-2">
              Big Savings on Your Favorite Brands
            </h3>
            <p className="text-blue-200 text-sm mb-4">
              Fashion, Electronics, Home & More
            </p>
            <button className="bg-white text-blue-900 text-sm font-bold py-2 px-4 rounded-full">
              Shop Now →
            </button>
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">
              🎧
            </div>
          </div>

          {/* Features List */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
            {[
              {
                icon: "",
                title: "Free Shipping",
                desc: "On orders above ₹999",
              },
              {
                icon: "🛡️",
                title: "Secure Payments",
                desc: "100% Secure & trusted",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "Hassle-free returns",
              },
              {
                icon: "",
                title: "24/7 Support",
                desc: "We're here to help you",
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
