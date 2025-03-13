import Link from "next/link";
import styles from "@/app/styles/NavLinks.module.css"; // Adjust the path if needed

export default function NavLinks() {
  return (
    <div className={styles.navLinks_container}>
      <ul>
        <li className={styles.home}><Link href="#">Home</Link></li>
        <li><Link href="#">Appointment</Link></li>
        <li><Link href="#">Health Blog</Link></li>
        <li><Link href="#">Reviews</Link></li>
      </ul>
    </div>
  );
}
