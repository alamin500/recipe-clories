
import css from './HeroSection.module.css';
import bannerImage from '../../assets/Rectangle 1 (3).png';

const HeroSection = () => {
  return (
    <div className={css.heroContainer}>
      <div className={css.content}>
        <h1 className={css.title}>Discover an exceptional cooking class tailored for you!</h1>
        <p className={css.subTitle}>
          Learn and Master Basic Programming, Data Structures, Algorithm, OOP, Database 
          and solve 500+ coding problems to become an exceptionally well world-class Programmer!
        </p>
        <div className={css.buttons}>
          <button className={css.exploreBtn}>Explore Now</button>
          <button className={css.feedbackBtn}>Our Feedback</button>
        </div>
      </div>
      <img className={css.bannerImage} src={bannerImage} alt="fsdf " />
    </div>
  );
};

export default HeroSection;
