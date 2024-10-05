
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Recipe Calories</h1>
      </div>

      <div className={styles.navLinks}>
        <a href="#">Home</a>
        <a href="#">Recipes</a>
        <a href="#">About</a>
        <a href="#">Search</a>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search" />
          <button className={styles.searchIcon}>
            <i className="fas fa-search"></i> {/* Font Awesome icon */}
          </button>
        </div>
        <button className={styles.userIcon}>
          <i className="fas fa-user"></i> {/* Font Awesome icon */}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
