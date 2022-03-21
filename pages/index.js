import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "../styles/Home.module.css";
import PrescribeSVG from "../public/images/doctors_in_white.svg";
import ManualSVG from "../public/images/hittingwall.svg";
import ReferSVG from "../public/images/doctors_in_white.svg";
import PrescribeScreenshot from "../public/images/prescribe_screenshot.PNG";

export default function Home() {
  const { authDetails } = useSelector((state) => state.auth);
  return (
    <div>
      <Head>
        <title>LiveUp</title>
        <meta
          name="description"
          content="A web application that enables doctors to track patient prescriptions, avoid redundancy and manual processes"
        />
        <meta name="author" content="Nehemiah Kamolu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* intro */}
      <section className={styles.intro}>
        <Image
          src="/images/refer_screenshot.PNG"
          className={styles.intro_img}
          alt="a screenshot of a modal to record a prescription"
          layout="fill"
        />
        <div className={styles.intro_text}>
          <h1>LIVE UP</h1>
          <p>Enjoy work in your health center, clinic, or hospital</p>
          <div className={styles.intro_btns}>
            <Link href="/login">
              <a>{authDetails?.user ? "Continue working" : "Start working"}</a>
            </Link>
            <a
              href="https://youtu.be/FrIVVXfFy-M"
              target="_blank"
              rel="noreferrer"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* features */}
      <section className={styles.features} id="features">
        {/* prescriptions */}
        <section className={styles.feature}>
          <div className={styles.text}>
            <h2> Track Prescriptions</h2>
            <p>
              Record prescriptions for your patients every day. Be able to
              lookup a patient&apos;s past prescription by you or any other
              doctor. This saves you the headache of looking up past
              prescriptions from books which might have been misplaced or
              destroyed
            </p>
          </div>
          <div className={styles.feature_img}>
            <Image
              src={PrescribeSVG}
              alt="An illustration of prescription tracking"
              objectFit="contain"
            />
          </div>
        </section>

        {/* avoid manual processes */}
        <section className={styles.feature}>
          <div className={styles.feature_img}>
            <Image
              src={ManualSVG}
              alt="An illustration of prescription tracking"
            />
          </div>
          <div className={styles.text}>
            <h2>Avoid manual processes</h2>
            <p>
              LiveUp helps you to quickly forget the stress of making value out
              of the data collected. You do not have to gather a bunch of books
              to know statistics such as the number of patients registered, the
              number of admitted patients, the number of prescriptions made,
              etc. This information is provided on the fly as you work.
            </p>
          </div>
        </section>

        {/* Refer and Admit */}
        <section className={styles.feature}>
          <div className={styles.text}>
            <h2>Refer and Admit</h2>
            <p>
              Receptionists can easily refer a patient they have registered to a
              clincian. A clincian can then see a patient(s) referred to him and
              decide to record them in the system as admitted. Past referrals by
              all receptionists and past admissions made by all clinicians for a
              particular patient can easily be viewed.
            </p>
          </div>
          <div className={styles.feature_img}>
            <Image
              src={ReferSVG}
              alt="An illustration of prescription tracking"
            />
          </div>
        </section>
      </section>

      {/* About */}

      <section className={styles.About} id="about">
        <h2 className={styles.title}>About</h2>
        <div className={styles.about_wrapper}>
          <div className={styles.about_text}>
            <p className={styles.description}>
              LiveUp helps doctors to track patient prescriptions, avoid
              redundancy and manual processes. I was inspired to create this
              project after I remembered the long processes and repetitive steps
              at a dispensary in my town. I was asked to provide information
              about past medications I received but could not give. This was
              because the book that the health worker had written in was
              destroyed by water. I also noticed some patients carried more than
              one book to every office they entered. If one or all got misplaced
              or destroyed, alot of information can be lost. This would require
              the health worker to record the details a second or N times.
            </p>
            <p>
              The source code of the{"  "}
              <a
                href="http://github.com/knehe/liveup_api/"
                title="link to api's source code"
              >
                {"  "} API {"  "}
              </a>
              and{" "}
              <a
                href="https://github.com/KNehe/liveup_web"
                title="link to front end's source code"
              >
                this site
              </a>{" "}
              are available on GitHub.
            </p>

            <p>Find me on the following sites:</p>
            <ul>
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
                <a
                  href="https://github.com/knehe/"
                  title="link to my github profile"
                >
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

          <div className={styles.about_img}>
            <Image
              src={PrescribeScreenshot}
              objectFit="contain"
              alt="a screenshot of modal where a doctor can record a prescription"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
