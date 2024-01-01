// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            For just $9.99 per month, this travel subscription opens the door to
            a world of possibilities. Whether you are an avid adventurer or a
            weekend explorer, this affordable pricing ensures access to
            exclusive travel perks, discounts, and insider tips. Its a
            budget-friendly way to elevate your travel experience, making the
            globe-trotting lifestyle more accessible to all wanderlust
            enthusiasts.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
