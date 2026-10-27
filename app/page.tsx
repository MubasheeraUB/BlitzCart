
import Link from "next/link";
import styles from "./page.module.css";

const products = [
  {
    id: 1,
    name: "Everyday Wireless Headphones",
    category: "Electronics",
    price: "₹1,499",
    oldPrice: "₹2,499",
    discount: "40% OFF",
    symbol: "🎧",
    color: "lavender",
  },
  {
    id: 2,
    name: "Minimal Everyday Backpack",
    category: "Fashion",
    price: "₹899",
    oldPrice: "₹1,499",
    discount: "40% OFF",
    symbol: "🎒",
    color: "peach",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: "₹2,199",
    oldPrice: "₹3,499",
    discount: "37% OFF",
    symbol: "⌚",
    color: "mint",
  },
  {
    id: 4,
    name: "Insulated Travel Bottle",
    category: "Lifestyle",
    price: "₹499",
    oldPrice: "₹799",
    discount: "38% OFF",
    symbol: "🥤",
    color: "blue",
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.announcement}>
        Big deals. Short windows. Smart shopping.
      </div>

      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Blitz<span>Cart</span>
          <span className={styles.logoDot}>.</span>
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          <Link href="#deals">Flash deals</Link>
          <Link href="#products">Discover</Link>
        </nav>

        <div className={styles.headerActions}>
          <Link className={styles.headerLink} href="/login">
            Sign in
          </Link>
          <Link className={styles.accountButton} href="/register">
            Join BlitzCart
          </Link>
        </div>
      </header>

      <section className={styles.hero} id="deals">
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            YOUR NEXT GREAT FIND STARTS HERE
          </span>

          <h1>
            Great finds.
            <br />
            <span>Little prices.</span>
            <br />
            Limited time.
          </h1>

          <p>
            Discover exciting products and limited-time deals.
            Your next favourite thing might be just a click away.
          </p>

          <Link href="#products" className={styles.primaryButton}>
            Explore the deals <span aria-hidden="true">→</span>
          </Link>

          <div className={styles.heroNote}>
            <span aria-hidden="true">✦</span>
            Browse freely. Sign in when you're ready to shop.
          </div>
        </div>

        <div className={styles.heroArtwork}>
          <div className={styles.orbit} />
          <div className={styles.heroCircle}>
            <span className={styles.gift}>🎁</span>
          </div>
          <div className={styles.floatingCard}>
            <span>FLASH DEAL</span>
            <strong>Big savings</strong>
            <small>Small shopping window</small>
          </div>
          <div className={styles.sparkleOne}>✦</div>
          <div className={styles.sparkleTwo}>✧</div>
        </div>
      </section>

      <section className={styles.benefits} aria-label="Shopping benefits">
        <div>
          <span>✦</span>
          <p>Limited-time offers</p>
        </div>
        <div>
          <span>◇</span>
          <p>Discover new finds</p>
        </div>
        <div>
          <span>♡</span>
          <p>Your shopping, your way</p>
        </div>
      </section>

      <section className={styles.productsSection} id="products">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>HANDPICKED FOR YOU</span>
            <h2>Deals worth discovering<span>.</span></h2>
            <p>Explore a few sample picks from our upcoming storefront.</p>
          </div>

          <span className={styles.sampleLabel}>SAMPLE PRODUCTS</span>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <article className={styles.productCard} key={product.id}>
              <div
                className={`${styles.productArtwork} ${styles[product.color]}`}
              >
                <span className={styles.discount}>
                  {product.discount}
                </span>
                <span className={styles.productSymbol} aria-hidden="true">
                  {product.symbol}
                </span>
              </div>

              <div className={styles.productInfo}>
                <span className={styles.category}>{product.category}</span>
                <h3>{product.name}</h3>

                <div className={styles.priceRow}>
                  <strong>{product.price}</strong>
                  <del>{product.oldPrice}</del>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.disclaimer}>
          These are demonstration products and prices, not live offers.
        </p>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.logo}>
          Blitz<span>Cart</span><span className={styles.logoDot}>.</span>
        </Link>
        <p>Discover more. Shop smarter.</p>
      </footer>
    </main>
  );
}
