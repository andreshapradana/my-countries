import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      name
      emoji
      capital
      currency
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

const PaginatedCountries: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  const limit = 12;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  const countries = data?.countries || [];
  const totalPages = Math.ceil(countries.length / limit);

  // Slice countries for the current page
  const paginatedCountries = countries.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const CountryCard = ({ country }: { country: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-all duration-300 flex flex-col items-center"
    >
      <p className="text-5xl mb-4">{country.emoji}</p>
      <h3 className="text-lg font-bold text-gray-800">{country.name}</h3>
      <p className="text-sm text-gray-600 mt-2">
        <strong>Capital:</strong> {country.capital || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Currency:</strong> {country.currency || "N/A"}
      </p>
      <button
        onClick={() => setSelectedCountry(country)}
        className="text-sm px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Details
      </button>
    </motion.div>
  );

  const CountryModal = ({ country, onClose }: { country: any; onClose: () => void }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
        <div className="text-center">
          <p className="text-6xl mb-4">{country.emoji}</p>
          <h2 className="text-2xl font-bold text-gray-800">{country.name}</h2>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Capital:</strong> {country.capital || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Currency:</strong> {country.currency || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Continent:</strong> {country.continent?.name || "Unknown"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Languages:</strong>{" "}
            {country.languages.length > 0
              ? country.languages.map((lang: any) => lang.name).join(", ")
              : "No languages"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedCountries.map((country: any, index: number) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <AnimatePresence>
        {selectedCountry && (
          <CountryModal
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaginatedCountries;
