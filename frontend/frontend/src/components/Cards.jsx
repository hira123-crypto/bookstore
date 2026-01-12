import React from "react";

function Cards({ item }) {
  // ✅ Handle Download/Purchase Action
  const handleAction = () => {
    if (item.category === "Free") {
      // Download free book
      if (item.downloadUrl) {
        const link = document.createElement('a');
        link.href = item.downloadUrl;
        link.download = `${item.title}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`✅ Downloading "${item.title}" - Enjoy your free book!`);
      } else {
        // Fallback if no downloadUrl
        window.open(item.image, '_blank');
        alert(`📖 Opening "${item.title}"`);
      }
    } else {
      // Handle paid book purchase
      alert(`🛒 Redirecting to purchase "${item.title}" for $${item.price}`);
      // TODO: Add actual payment logic here
      // window.location.href = `/checkout/${item._id}`;
    }
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-48 bg-gray-100 relative">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-contain"
          />
          {/* ✅ Category Badge on Image */}
          <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
            item.category === "Free" 
              ? 'bg-green-500 text-white' 
              : 'bg-purple-500 text-white'
          }`}>
            {item.category}
          </div>
        </figure>
        
        <div className="card-body p-4">
          <h2 className="card-title text-base">
            {item.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.name}</p>
          
          <div className="card-actions justify-between items-center mt-3">
            {/* ✅ Dynamic Price Display */}
            <div className={`font-bold text-lg ${
              item.category === "Free" ? 'text-green-500' : 'text-pink-500'
            }`}>
              {item.category === "Free" || item.price === 0 ? "FREE" : `$${item.price}`}
            </div>
            
            {/* ✅ Dynamic Action Button */}
            <button
              onClick={handleAction}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                item.category === "Free"
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-pink-500 hover:bg-pink-600 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {item.category === "Free" ? "📥 Download" : "🛒 Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;