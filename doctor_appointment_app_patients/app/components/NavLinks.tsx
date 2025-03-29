"use client";
import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import styles from "@/app/styles/NavLinks.module.css";

export default function NavLinks() {
  const { id } = useParams();
  const pathname = usePathname();

  const isDoctorProfile = /^\/doctors\/\d+$/.test(pathname);

  return (
    <div className={styles.navLinks_container}>
      <ul>
        <li className={styles.home}>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/doctors">Doctors</Link>
        </li>
        {isDoctorProfile && (
          <>
            <li>
              <Link href={`/doctor/${id}/appointment`}>Appointment</Link>
            </li>
            <li>
              <Link href={`/doctor/${id}/reviews`}>Reviews</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/help">Help</Link>
        </li>
      </ul>
    </div>
  );
}
