import { useSelector } from "react-redux";
import { CategoryCard } from "../../index";
import { BaseURL } from "../../api/axios";

function Category() {
  const images = useSelector((state) => state.media.images);

  const categories = [
    {
      id: 3,
      name: "Pants",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.heroCatShirtImg}`,
      tab: "pant",
    },
    {
      id: 2,
      name: "Hoodies",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.heroCatPantImg}`,
      tab: "hoodie",
    },
    {
      id: 1,
      name: "Shirts",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.heroCatHoodieImg}`,
      tab: "shirt",
    },
    {
      id: 4,
      name: "Jackets",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.heroCatJacketImg}`,
      tab: "jacket",
    },
    {
      id: 5,
      name: "Shoes",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.heroCatShoesImg}`,
      tab: "shoes",
    },
  ];
  return (
    <div className="w-full pt-10 pb-6 my-4 grid grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
      {categories.map((e) => (
        <CategoryCard
          key={e.id}
          name={e.name}
          imagePath={e.imagePath}
          tab={e.tab}
        />
      ))}
    </div>
  );
}

export default Category;
