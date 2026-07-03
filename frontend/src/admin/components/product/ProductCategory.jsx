import { NavLink } from "react-router-dom";

function ProductCategory({ page }) {
  const productBoxArr = [
    {
      name: "shirts",
      imgPath: "/images/footer_action/footer_action_shirt.png",
      tab: "shirt",
    },
    {
      name: "pants",
      imgPath: "/images/footer_action/footer_action_pant.png",
      tab: "pant",
    },
    {
      name: "hoodies",
      imgPath: "/images/footer_action/footer_action_hoodie.png",
      tab: "hoodie",
    },
    {
      name: "shoes",
      imgPath: "/images/footer_action/footer_action_shoes.png",
      tab: "shoes",
    },
    {
      name: "jackets",
      imgPath: "/images/footer_action/footer_action_jacket.png",
      tab: "jacket",
    },
  ];
  return (
    <>
      {productBoxArr.map((e, idx) => (
        <NavLink
          to={`/dashboard/${page}/${e.tab}`}
          key={idx}
          className="relative sliderCardWrapper hover:text-(--bg-accent) hover:shadow-xl w-full sm:w-[48%] lg:w-[31%] xl:w-[48%] 2xl:w-[31%] h-[200px] sm:h-[280px] lg:h-[40vh] p-6 sm:p-10 lg:p-16 overflow-hidden rounded-3xl backdrop-blur-lg cursor-pointer flex justify-start items-start transition-all ease-in-out duration-300"
        >
          <div className="absolute top-0 left-0 z-[2] w-full h-full bg-(--bg-accent)/10"></div>
          <img
            src={e.imgPath}
            width={"80%"}
            className={`absolute slideImage opacity-70 transition-all duration-300 ${
              e.name === "shoes"
                ? "-right-16 sm:-right-32 lg:-right-60 xl:-right-30 -bottom-4 sm:-bottom-8 lg:-bottom-5 xl:-bottom-10"
                : "-right-12 sm:-right-24 lg:-right-50 xl:-right-20 -bottom-50 sm:-bottom-24 lg:-bottom-40 xl:-bottom-50"
            }`}
            alt={e.name}
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase z-[3] transition-colors ease-in-out duration-300">
            {e.name}
          </h2>
        </NavLink>
      ))}
    </>
  );
}

export default ProductCategory;
