import { useState } from "react";
import { useSelector } from "react-redux";
import { SideBarButton } from "../../index";
import {
  Archive,
  Handbag,
  House,
  Images,
  MessageCircleQuestionMark,
  MonitorSmartphone,
  PackageOpen,
  ReceiptText,
  ShoppingBag,
  Star,
  Tags,
  ToggleRight,
} from "lucide-react";

const sideBarAdminButtonArr = [
  { name: "dashboard", path: "", icon: <House size={32} strokeWidth={2.8} /> },
  {
    name: "products",
    path: "/product",
    icon: <PackageOpen size={32} strokeWidth={2.8} />,
  },
  {
    name: "orders",
    path: "/order",
    icon: <ShoppingBag size={32} strokeWidth={2.8} />,
  },
  {
    name: "reviews",
    path: "/review",
    icon: <Star size={32} strokeWidth={2.8} />,
  },
  {
    name: "manage stock",
    path: "/stock",
    icon: <Archive size={32} strokeWidth={2.8} />,
  },
  {
    name: "manage status",
    path: "/status",
    icon: <ToggleRight size={32} strokeWidth={2.8} />,
  },
  {
    name: "media library",
    path: "/media/library",
    icon: <Images size={32} strokeWidth={2.8} />,
  },
  {
    name: "FAQs",
    path: "/faq",
    icon: <MessageCircleQuestionMark size={32} strokeWidth={2.8} />,
  },
];
const sideBarUserButtonArr = [
  { name: "dashboard", path: "", icon: <House size={32} strokeWidth={2.8} /> },
  {
    name: "orders",
    path: "/order",
    icon: <ShoppingBag size={32} strokeWidth={2.8} />,
  },
  {
    name: "reviews",
    path: "/review",
    icon: <Star size={32} strokeWidth={2.8} />,
  },
];

function SideBar() {
  const theme = useSelector((state) => state.theme.currentTheme);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="mb-12 w-full lg:w-80 lg:h-[calc(100vh-94px)] lg:sticky lg:top-[94px] lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r border-(--text-color)/5 bg-(--background) z-10">
      {/* Inline Styles to guarantee scrollbar hiding on horizontal swipe */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />

      {/* Responsive layout container: Horizontal swiper on mobile/tablet, Vertical sidebar on desktop */}
      <div className="flex flex-row lg:flex-col items-center lg:items-start gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible w-full py-4 px-4 lg:p-6 scrollbar-none">
        {role === "admin"
          ? sideBarAdminButtonArr.map((e, idx) => (
              <SideBarButton
                key={idx}
                theme={theme}
                name={e.name}
                path={e.path}
                icon={e.icon}
              />
            ))
          : sideBarUserButtonArr.map((e, idx) => (
              <SideBarButton
                key={idx}
                theme={theme}
                name={e.name}
                path={e.path}
                icon={e.icon}
              />
            ))}
      </div>
    </div>
  );
}

export default SideBar;
