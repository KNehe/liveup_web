import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Developer contacts</p>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:kamolunehemiah@gmail.com" title="My email">
            kamolunehemiah@gmail.com
          </a>
        </li>

        <li title="my phone number">Phone: +256 774 225 437</li>

        <li>
          <a
            href="https://www.linkedin.com/in/nehemiah-kamolu/"
            title="link to my LinkedIn profile"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/Nehemiah_Nehe"
            title="link to my twitter profile"
          >
            Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com/knehe/" title="link to my github profile">
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://medium.com/@Nehe_Kamolu"
            title="link to my medium articles"
          >
            Medium
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
