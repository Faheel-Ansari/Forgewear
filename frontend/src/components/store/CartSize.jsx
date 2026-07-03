import { Minus, Plus } from "lucide-react";
import React from "react";

function CartSize({ size, setSelectedSize, selectedSize}) {
  return (
    <button
      onClick={() => setSelectedSize(size)}
      className={`${selectedSize === size ? 'bg-(--bg-accent) text-(--background)' : 'bg-(--text-color)/20 hover:bg-(--bg-accent)/15 hover:text-(--bg-accent)'} flex items-center justify-center py-1 w-[45%] rounded-lg cursor-pointer transition-colors ease-in-out duration-300`}
    >
      <p className="text-xl font-semibold uppercase">{size}</p>
    </button>
  );
}

export default CartSize;
