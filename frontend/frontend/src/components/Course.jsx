import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        // ✅ Change this to your backend API endpoint
        const res = await fetch('http://localhost:4001/book');
        
        if (!res.ok) {
          throw new Error('Failed to fetch books');

        }
        
        const data = await res.json();
        console.log("All books:", data);
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    getBook();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12 text-gray-600">
            Discover our comprehensive collection of books and courses. Whether you're looking for free resources or premium content, we have something for everyone. Start your learning journey today and expand your knowledge with our curated selection.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.length === 0 ? (
            <p className="col-span-4 text-center py-10">No books available</p>
          ) : (
            book.map((item) => (
              <Cards key={item._id} item={item} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Course;