"use client";
import React, { useState } from 'react';
import styles from '@/app/styles/Review.module.css';
import Image from 'next/image';
import star from '@/public/images/one_star.svg';

interface Review {
    id: number;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
    status: 'pending' | 'completed';
}

export default function Review() {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPendingPage, setCurrentPendingPage] = useState<number>(1);
    const [selectedPendingReview, setSelectedPendingReview] = useState<Review | null>(null);
    const reviewsPerPage = 5;

    // Mock data for reviews
    const reviews: Review[] = [
        {
            id: 1,
            patientName: "John Doe",
            rating: 5,
            comment: "Excellent doctor, very professional and caring.",
            date: "2024-03-15",
            status: 'completed'
        },
        {
            id: 2,
            patientName: "Jane Smith",
            rating: 4,
            comment: "Good experience overall, would recommend.",
            date: "2024-03-14",
            status: 'completed'
        },
        {
            id: 3,
            patientName: "Alice Johnson",
            rating: 0,
            comment: "",
            date: "2024-03-16",
            status: 'pending'
        },
        {
            id: 4,
            patientName: "Bob Wilson",
            rating: 0,
            comment: "",
            date: "2024-03-16",
            status: 'pending'
        },
        {
            id: 5,
            patientName: "Carol Brown",
            rating: 0,
            comment: "",
            date: "2024-03-16",
            status: 'pending'
        },
        {
            id: 6,
            patientName: "David Lee",
            rating: 5,
            comment: "Great bedside manner and thorough examination.",
            date: "2024-03-13",
            status: 'completed'
        }
    ];

    const handleRatingClick = (value: number) => {
        setRating(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle review submission here
        console.log({ rating, comment, reviewId: selectedPendingReview?.id });
        setRating(0);
        setComment('');
        setSelectedPendingReview(null);
    };

    const handlePendingReviewClick = (review: Review) => {
        setSelectedPendingReview(review);
    };

    // Filter reviews
    const completedReviews = reviews.filter(review => review.status === 'completed');
    const pendingReviews = reviews.filter(review => review.status === 'pending');

    // Pagination logic for completed reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = completedReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(completedReviews.length / reviewsPerPage);

    // Pagination logic for pending reviews
    const indexOfLastPendingReview = currentPendingPage * reviewsPerPage;
    const indexOfFirstPendingReview = indexOfLastPendingReview - reviewsPerPage;
    const currentPendingReviews = pendingReviews.slice(indexOfFirstPendingReview, indexOfLastPendingReview);
    const totalPendingPages = Math.ceil(pendingReviews.length / reviewsPerPage);

    return (
        <div className={styles.review_container}>
            

            {/* Pending Reviews Section */}
            {pendingReviews.length > 0 && (
                <div className={styles.reviews_display_section}>
                    <h2>Pending Reviews</h2>
                    <div className={styles.reviews_list}>
                        {currentPendingReviews.map((review) => (
                            <div key={review.id} className={styles.review_card}>
                                {selectedPendingReview?.id === review.id ? (
                                    <div className={styles.pending_review_form}>
                                        <div className={styles.review_header}>
                                            <h3>{review.patientName}</h3>
                                            <button 
                                                className={styles.cancel_button}
                                                onClick={() => setSelectedPendingReview(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className={styles.rating_stars}>
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <div
                                                    key={value}
                                                    className={`${styles.star} ${value <= rating ? styles.active : ''}`}
                                                    onClick={() => handleRatingClick(value)}
                                                >
                                                    <Image
                                                        src={star}
                                                        alt={`${value} star`}
                                                        height={24}
                                                        width={24}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Write your review here..."
                                            className={styles.comment_input}
                                            required
                                        />
                                        <button 
                                            type="submit" 
                                            className={styles.submit_button}
                                            onClick={handleSubmit}
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className={styles.pending_review_card}
                                        onClick={() => handlePendingReviewClick(review)}
                                    >
                                        <div className={styles.review_header}>
                                            <h3>{review.patientName}</h3>
                                            <span className={styles.pending_status}>Pending</span>
                                        </div>
                                        <p className={styles.review_date}>{review.date}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {totalPendingPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setCurrentPendingPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPendingPage === 1}
                                className={styles.pagination_button}
                            >
                                Previous
                            </button>
                            <span className={styles.page_info}>
                                Page {currentPendingPage} of {totalPendingPages}
                            </span>
                            <button
                                onClick={() => setCurrentPendingPage(prev => Math.min(prev + 1, totalPendingPages))}
                                disabled={currentPendingPage === totalPendingPages}
                                className={styles.pagination_button}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Completed Reviews Section */}
            <div className={styles.reviews_display_section}>
                <h2>Patient Reviews</h2>
                <div className={styles.reviews_list}>
                    {currentReviews.map((review) => (
                        <div key={review.id} className={styles.review_card}>
                            <div className={styles.review_header}>
                                <h3>{review.patientName}</h3>
                                <div className={styles.review_rating}>
                                    {[...Array(5)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.star} ${
                                                index < review.rating ? styles.active : ''
                                            }`}
                                        >
                                            <Image
                                                src={star}
                                                alt={`${index + 1} star`}
                                                height={16}
                                                width={16}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className={styles.review_comment}>{review.comment}</p>
                            <span className={styles.review_date}>{review.date}</span>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={styles.pagination_button}
                        >
                            Previous
                        </button>
                        <span className={styles.page_info}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={styles.pagination_button}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 