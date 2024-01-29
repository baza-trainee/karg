import styles from "./styles/hero.module.scss";
import Image from "next/image";
import heroImageMob from "@/public/assets/images/main/hero-mob.jpg";
import heroImageTab from "@/public/assets/images/main/hero-tablet.jpg";
import heroImageDesk from "@/public/assets/images/main/hero-desktop.jpg";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Kyiv animal <br />
        rescue group
      </h1>
      <div className={styles.mobImage}>
        <Image
          src={heroImageMob}
          alt="Picture of the team"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={styles.tabImage}>
        <Image
          src={heroImageTab}
          alt="Picture of the team"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={styles.deskImage}>
        <Image
          src={heroImageDesk}
          alt="Picture of the team"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
