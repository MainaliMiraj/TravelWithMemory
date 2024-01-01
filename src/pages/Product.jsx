import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Traveling worldwide is a transformative and enriching experience
            that allows individuals to explore diverse cultures, landscapes, and
            traditions. It opens up a world of opportunities to learn, grow, and
            broaden ones perspectives. Here are some aspects to consider when
            describing worldwide travel
          </p>
          <p>
            Traveling worldwide exposes you to a kaleidoscope of cultures, each
            with its unique customs, traditions, and way of life. You have the
            chance to interact with people from various backgrounds, fostering a
            deeper understanding and appreciation for global diversity.
          </p>
        </div>
      </section>
    </main>
  );
}
