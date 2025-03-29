"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "@/app/styles/DisplayDoctor.module.css";
import SearchBar from "./SearchBar";
import DoctorCard from "./DoctorCard";
import Filter from "./Filter";
import Footer from "./Footer";

export default function DisplayDoctor() {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Filter state
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    rating: "",
    doctor_name: "",
    specialty: "",
    disease: "",
    pageNo: 1,
  });

  // Function to fetch doctors with filters
  const fetchDoctors = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value !== "")
      ).toString();

      const response = await fetch(
        `http://localhost:5000/doctor/search?${queryParams}`
      );
      const data = await response.json();

      setDoctors(data.data);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }, [filters]);

  // Debounce function
  const debounce = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  };

  // Call API when filters change (with debounce)
  useEffect(() => {
    const debouncedFetch = debounce(fetchDoctors, 500);
    debouncedFetch();
  }, [fetchDoctors]);

  return (
    <div className={styles.displayDoctor_container}>
      <div className={styles.searchBar_component_div}>
        <SearchBar filters={filters} setFilters={setFilters} />
      </div>

      <section className={styles.doctor_result}>
        <h3>{totalRecords} doctors available</h3>
        <p>
          Book appointments with minimum wait-time & verified doctor details
        </p>
      </section>

      <button className={styles.filter_btn} onClick={() => setIsOpen(true)}>
        Filters
      </button>

      <div className={styles.filter_cards}>
        <div className={styles.filter_component_div}>
          <Filter filters={filters} setFilters={setFilters} />
        </div>
        <article className={styles.cards_container}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.doctor_id} doctor={doctor} />
          ))}
        </article>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setFilters((prev) => ({ ...prev, pageNo: currentPage - 1 }))
          }
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setFilters((prev) => ({ ...prev, pageNo: currentPage + 1 }))
          }
        >
          Next
        </button>
      </div>

      <Footer />

      {/* Sidebar Filter Modal */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <aside
            className={styles.sidebar}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.crossBtn}
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <div className={styles.filter_component_div_sidebar}>
              <Filter filters={filters} setFilters={setFilters} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
