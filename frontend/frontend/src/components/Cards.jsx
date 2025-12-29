import React from "react";

function Cards({ item }) {
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-48 bg-gray-100">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-base">
            {item.title}
            <div className="badge badge-secondary text-xs">{item.category}</div>
          </h2>
          <p className="text-sm">{item.name}</p>
          <div className="card-actions justify-between mt-3">
            <div className="badge badge-outline">${item.price}</div>
            <div className="cursor-pointer px-3 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200 text-sm">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;