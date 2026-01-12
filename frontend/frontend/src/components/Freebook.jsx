import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cards from "./Cards";

function Freebook() {
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
        
        // Filter only free books
        const freeBooks = data.filter((item) => item.category === "Free");
        console.log("Free books:", freeBooks);
        setBook(freeBooks);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10">
        <div className="mb-8">
          <h1 className="font-bold text-2xl pb-2">Free Offered Courses</h1>
          <p className="text-gray-600">
            Explore our collection of free books and courses. Learn at your own pace with high-quality content available at no cost.
          </p>
        </div>

        <div>
          {book.length === 0 ? (
            <p className="text-center py-10">No free books available</p>
          ) : (
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
}

export default Freebook;