"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Product = {
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: string;
  sold: number;
  stock: number;
  image: string;
  tag?: string;
};

const flashProducts: Product[] = [
  {
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Electronics",
    price: "₹13,695",
    oldPrice: "₹24,900",
    discount: "45% OFF",
    rating: "4.8 (1.2k)",
    sold: 78,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&q=85",
  },
  {
    name: "Noise ColorFit Pro 4",
    category: "Electronics",
    price: "₹4,799",
    oldPrice: "₹7,999",
    discount: "40% OFF",
    rating: "4.5 (892)",
    sold: 62,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=85",
  },
  {
    name: "HP Pavilion Laptop",
    category: "Laptops",
    price: "₹38,999",
    oldPrice: "₹59,999",
    discount: "35% OFF",
    rating: "4.6 (1.5k)",
    sold: 48,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=85",
  },
  {
    name: "Nike Air Force 1",
    category: "Fashion",
    price: "₹5,999",
    oldPrice: "₹11,995",
    discount: "50% OFF",
    rating: "4.4 (678)",
    sold: 71,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
  },
];

const trendingProducts: Product[] = [
  {
    name: "boAt Wave Call",
    category: "Electronics",
    price: "₹3,499",
    oldPrice: "₹5,999",
    discount: "",
    rating: "4.4 (2.3k)",
    sold: 0,
    stock: 0,
    tag: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85",
  },
  {
    name: "Adidas Ultraboost 22",
    category: "Fashion",
    price: "₹8,999",
    oldPrice: "₹12,999",
    discount: "",
    rating: "4.6 (1.8k)",
    sold: 0,
    stock: 0,
    tag: "Trending",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
  },
  {
    name: "Samsung Galaxy S23",
    category: "Mobile Phones",
    price: "₹59,999",
    oldPrice: "₹79,999",
    discount: "",
    rating: "4.5 (1.5k)",
    sold: 0,
    stock: 0,
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=85",
  },
  {
    name: "JBL Tune 760NC",
    category: "Electronics",
    price: "₹6,999",
    oldPrice: "₹9,999",
    discount: "",
    rating: "4.4 (956)",
    sold: 0,
    stock: 0,
    tag: "Deal",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85",
  },
  {
    name: "Philips Air Fryer",
    category: "Home & Living",
    price: "₹4,499",
    oldPrice: "₹7,999",
    discount: "",
    rating: "4.7 (2.1k)",
    sold: 0,
    stock: 0,
    tag: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=85",
  },
];

const categories = [
  ["📱", "Mobile Phones"],
  ["💻", "Laptops"],
  ["🎧", "Electronics"],
  ["🏠", "Home & Living"],
  ["👕", "Fashion"],
  ["🧴", "Beauty & Personal Care"],
  ["🏀", "Sports & Outdoors"],
  ["🎮", "Toys & Games"],
  ["🍴", "Food & Beverages"],
];

function LightningLogo() {
  return (
    <a className="brand" href="#" aria-label="BlitzCart home">
      <span className="brand-mark">
        <Image
          src="/images/blitzcart-logo.png"
          alt="BlitzCart - Deals That Don't Wait"
          width={730}
          height={166}
          priority
          className="h-auto w-[220px] object-contain"
        />
      </span>
    </a>
  );
}

function ProductCard({
  product,
  flash = false,
  onAdd,
}: {
  product: Product;
  flash?: boolean;
  onAdd: (name: string) => void;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="product-card">
      {flash && (
        <div className="product-topline">
          <span className="discount">{product.discount}</span>
          <span className="timer">◷ 02:14:32</span>
        </div>
      )}
      {!flash && <span className="tag">{product.tag}</span>}
      <button
        className={`heart ${saved ? "saved" : ""}`}
        onClick={() => setSaved(!saved)}
        aria-label="Add to wishlist"
      >
        {saved ? "♥" : "♡"}
      </button>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-name">{product.name}</div>
      <div className="rating">
        <span>★</span> {product.rating}
      </div>
      <div className="prices">
        <del>{product.oldPrice}</del>
        <strong>{product.price}</strong>
      </div>
      {flash && (
        <>
          <div className="stock-line">
            <span style={{ width: `${product.sold}%` }} />
          </div>
          <div className="stock-copy">
            {product.sold}% sold <span>Only {product.stock} left</span>
          </div>
          <button className="add-cart" onClick={() => onAdd(product.name)}>
            🛒 &nbsp; Add to Cart
          </button>
        </>
      )}
    </article>
  );
}

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState("Home");
  const [notice, setNotice] = useState("");
  const filteredFlash = useMemo(
    () =>
      flashProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  function addToCart(name: string) {
    setCartCount((count) => count + 1);
    setNotice(`${name} added to your cart`);
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main className="storefront">

      <header className="topbar">
        <LightningLogo />
        <label className="searchbox">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, brands and more..."
          />
          <button aria-label="Search">⌕</button>
        </label>
        <div className="top-actions">
          <button>♙ &nbsp; Login / Register</button>
          <button>♡ &nbsp; Wishlist</button>
          <button>
            🛒 <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <nav className="navrow" aria-label="Main navigation">
        <button className="all-cats">☰ &nbsp; All Categories</button>
        {[
          "Home",
          "Flash Deals",
          "Best Sellers",
          "New Arrivals",
          "Brands",
          "Contact",
        ].map((item) => (
          <button
            key={item}
            className={activeNav === item ? "active" : ""}
            onClick={() => setActiveNav(item)}
          >
            {item}
          </button>
        ))}
        <span className="shipping">
          🚚 &nbsp; Free Shipping on orders above ₹999
        </span>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="sale-pill">ϟ &nbsp; LIMITED TIME FLASH SALE</span>
          <h1>
            Deals That <span>Don’t Wait.</span>
          </h1>
          <p>
            Discover incredible deals, shop your favorite products, and grab
            limited-time offers before they disappear.
          </p>
          <button
            className="primary-btn"
            onClick={() => setActiveNav("Flash Deals")}
          >
            Shop Flash Deals &nbsp; →
          </button>
        </div>
        <div className="hero-art">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=85"
            alt="Premium headphones"
          />
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=85"
            alt="Smartphone"
          />
          <img
            src="https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&q=85"
            alt="Smart watch"
          />
          <div className="countdown">
            Next Flash Sale In
            <div>
              <b>
                02<small>Days</small>
              </b>
              <b>
                14<small>Hours</small>
              </b>
              <b>
                32<small>Minutes</small>
              </b>
              <b>
                17<small>Seconds</small>
              </b>
            </div>
          </div>
        </div>
      </section>

      <section className="category-strip" aria-label="Shop by category">
        {categories.map(([icon, name]) => (
          <div className="category" key={name}>
            <span className="category-icon">{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </section>

      <div className="content-grid">
        <div>
          <section className="section">
            <div className="section-heading">
              <h2>⚡ Flash Sale</h2>
              <p>Hot deals. Limited time. Don’t miss out!</p>
              <a href="#">View All Flash Deals →</a>
            </div>
            <div className="products">
              {filteredFlash.length ? (
                filteredFlash.map((product) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    flash
                    onAdd={addToCart}
                  />
                ))
              ) : (
                <p>No matching flash-sale products found.</p>
              )}
            </div>
          </section>
          <section className="section">
            <div className="section-heading">
              <h2>🔥 Trending Products</h2>
              <p>Popular items loved by customers</p>
              <a href="#">View All →</a>
            </div>
            <div className="trending-products">
              {trendingProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </section>
        </div>
        <aside className="sidebar">
          <div className="brand-ad">
            <h3>
              Big Savings
              <br />
              on Your
              <br />
              <span>Favorite Brands</span>
            </h3>
            <p>Fashion, Electronics, Home & More</p>
            <button>Shop Now →</button>
          </div>
          <div className="benefits">
            <div className="benefit">
              <span className="benefit-icon">🚚</span>
              <div>
                <b>Free Shipping</b>
                <small>On orders above ₹999</small>
              </div>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🛡️</span>
              <div>
                <b>Secure Payments</b>
                <small>100% secure & trusted</small>
              </div>
            </div>
            <div className="benefit">
              <span className="benefit-icon">↩️</span>
              <div>
                <b>Easy Returns</b>
                <small>Hassle-free returns</small>
              </div>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🎧</span>
              <div>
                <b>24/7 Support</b>
                <small>We’re here to help</small>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="seller-banner">
        <span className="seller-icon">🏬</span>
        <div>
          <h3>Become a Seller on BlitzCart</h3>
          <p>Grow your business with our multi-tenant marketplace platform.</p>
        </div>
        <button>Start Selling &nbsp; →</button>
      </section>
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </main>
  );
}
