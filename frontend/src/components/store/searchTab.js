import { useEffect, useState } from "react";
import { BaseURL } from "../../api/axios";

export function useSearchCard(images) {
  const searchCardArr = [
    {
      name: "pants",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.searchCatShirtImg}`,
      tabName: "pant",
    },
    {
      name: "hoodies",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.searchCatPantImg}`,
      tabName: "hoodie",
    },
    {
      name: "shirts",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.searchCatHoodieImg}`,
      tabName: "shirt",
    },
    {
      name: "jackets",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.searchCatJacketImg}`,
      tabName: "jacket",
    },
    {
      name: "shoes",
      imagePath: `${BaseURL}/uploads/mediaLibrary/${images?.searchCatShoesImg}`,
      tabName: "shoes",
    },
  ];

  return {searchCardArr}
}

export function switchSearchTab() {
  const [searchTab, setSearchTab] = useState("")

  const setActiveSearchTab = (tab) => {
    setSearchTab(tab)
  }

  return { setActiveSearchTab, searchTab }
}