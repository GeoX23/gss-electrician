"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Review, ReviewsResponse, ReviewsData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import reviewsData from "@/data/reviews.json";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const StarRating = ({ rating }: { rating: string }) => {
  const numericRating = parseFloat(rating);
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((index) => (
        <StarIcon
          key={index}
          className={classNames(
            numericRating > index ? "text-yellow-400" : "text-gray-300",
            "h-5 w-5 flex-shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [included, setIncluded] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewedSite, setReviewedSite] = useState<string | null>(
    "Douleutaras"
  );

  useEffect(() => {
    const fetchReviews = () => {
      setLoading(true);
      setError(null);
      try {
        // Get the current page of reviews from the JSON file
        const pageIndex = currentPage - 1;
        const pageData = (reviewsData as unknown as ReviewsResponse[])[
          pageIndex
        ];

        if (!pageData) {
          throw new Error("Failed to fetch reviews");
        }

        setReviews(pageData.data);
        setTotalPages(pageData.meta.pagination.pages);

        // Create a map of user IDs to display names
        const userMap = pageData.included.reduce((acc, user) => {
          const name = `${user.attributes.sellerDisplayName}`;
          acc[user.id] = name;
          return acc;
        }, {} as { [key: string]: string });
        setIncluded(userMap);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(
          "Δεν ήταν δυνατή η φόρτωση των αξιολογήσεων. Παρακαλώ δοκιμάστε ξανά αργότερα."
        );
      }
      setLoading(false);
    };

    fetchReviews();
  }, [currentPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("el-GR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => setCurrentPage(currentPage)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Δοκιμάστε ξανά
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Stats */}
          <div className="border-b border-t border-gray-200 pb-4 pt-4">
            <dl className="grid grid-cols-3 gap-8">
              <div className="flex flex-col text-center">
                <dt className="text-sm font-medium text-gray-500">Ποιότητα</dt>
                <dd className="text-xl font-semibold tracking-tight text-emerald-600">
                  5.0
                </dd>
              </div>
              <div className="flex flex-col text-center">
                <dt className="text-sm font-medium text-gray-500">Τιμή</dt>
                <dd className="text-xl font-semibold tracking-tight text-emerald-600">
                  4.8
                </dd>
              </div>
              <div className="flex flex-col text-center">
                <dt className="text-sm font-medium text-gray-500">
                  Συνέπεια & Ποιότητα επικοινωνίας
                </dt>
                <dd className="text-xl font-semibold tracking-tight text-emerald-600">
                  5.0
                </dd>
              </div>
            </dl>
          </div>

          {/* Reviews */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {included[review.relationships.buyer.data.id]}
                        <span className="text-gray-400 text-xs ml-2">
                          Reviewed on {reviewedSite}
                        </span>
                      </h3>
                      <StarRating rating={review.attributes.rating} />
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.attributes.created)}
                    </p>
                  </div>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      {review.attributes.comment || ""}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 pt-6">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
            >
              <ChevronDoubleLeftIcon className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-2">
              {(() => {
                let pages: number[] = [];
                const maxVisible = 4;

                if (totalPages <= maxVisible) {
                  // If we have 4 or fewer pages, show all
                  pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                } else if (currentPage <= 2) {
                  // If we're near the start
                  pages = [1, 2, 3, 4];
                } else if (currentPage >= totalPages - 1) {
                  // If we're near the end
                  pages = [
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  ];
                } else {
                  // Show current page and surrounding pages
                  pages = [
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                  ];
                }

                return pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={classNames(
                      "rounded-md px-3 py-2 text-sm font-semibold",
                      currentPage === page
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {page}
                  </button>
                ));
              })()}
            </div>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
            >
              <ChevronDoubleRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
