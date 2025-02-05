import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
  const limit = 10;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const countries = data?.countries || [];
  const totalPages = Math.ceil(countries.length / limit);

  // Slice countries for the current page
  const paginatedCountries = countries.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Country List</h1>

      {/* Country List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedCountries.map((country: any, index: number) => (
          <li
            key={index}
            onClick={() => setSelectedCountry(country)}
            className="cursor-pointer border p-4 rounded shadow-sm hover:bg-gray-100 flex flex-col items-center text-center"
          >
            <p className="text-6xl">{country.emoji}</p>
            <p className="font-semibold text-lg mt-2">{country.name}</p>
            <p className="text-sm text-gray-600">{country.capital || 'No capital'}</p>
            <p className="text-sm text-gray-600">{country.currency || 'No currency'}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal for Selected Country */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-md p-6 text-center">
            <p className="text-8xl mb-4">{selectedCountry.emoji}</p>
            <h2 className="text-xl font-bold mb-4">{selectedCountry.name}</h2>
            <p><strong>Capital:</strong> {selectedCountry.capital || 'No capital'}</p>
            <p><strong>Currency:</strong> {selectedCountry.currency || 'No currency'}</p>
            <p><strong>Continent:</strong> {selectedCountry.continent?.name || 'Unknown'}</p>
            <p>
              <strong>Languages:</strong>{' '}
              {selectedCountry.languages.length > 0
                ? selectedCountry.languages.map((lang: any) => lang.name).join(', ')
                : 'No languages'}
            </p>
            <button
              onClick={() => setSelectedCountry(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedCountries;