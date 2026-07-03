import { NavLink, useLocation } from "react-router-dom";
import { FooterMarque } from "../../index";

const Footer = ({ isLoggedIn }) => {
  const location = useLocation();
  const isNavBarNormal =
    location.pathname.startsWith("/order") ||
    location.pathname.startsWith("/checkout");

  return (
    <div className="backdrop-blur-md border-t border-(--text-color)/5">
      <FooterMarque />

      <div className="w-full py-10 sm:py-16 md:py-20 flex justify-center">
        <div className="w-full max-w-[1440px] xl:max-w-[1680px] px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-8 sm:gap-12">
          {/* Top Row: Brand Logo */}
          <div className="flex items-center">
            <NavLink to={"/"}>
              <h1
                className="overflow-hidden text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] uppercase text-(--text-color)"
                id="footerLogo"
              >
                FORGEWEAR
              </h1>
            </NavLink>
          </div>

          {/* Middle Row: Slogan and Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 pb-6 sm:pb-8">
            <div className="text-xs sm:text-sm text-(--text-color)/60 leading-relaxed font-medium">
              <p>Premium menswear for the relentless.</p>
              <p>No compromises, no excuses.</p>
            </div>

            {!isNavBarNormal && (
              <div className="flex flex-wrap text-xs sm:text-sm gap-x-6 gap-y-3 font-semibold text-(--text-color)">
                <NavLink
                  to={"store/shirt"}
                  className="transition-all duration-300 opacity-60 hover:opacity-100 hover:text-(--bg-accent)"
                >
                  Store
                </NavLink>
                <NavLink
                  to={"/about"}
                  className="transition-all duration-300 opacity-60 hover:opacity-100 hover:text-(--bg-accent)"
                >
                  About
                </NavLink>
                <NavLink
                  to={"/contact"}
                  className="transition-all duration-300 opacity-60 hover:opacity-100 hover:text-(--bg-accent)"
                >
                  Contact
                </NavLink>
                <NavLink
                  to={!isLoggedIn ? "/login" : "/dashboard"}
                  className="transition-all duration-300 opacity-60 hover:opacity-100 hover:text-(--bg-accent)"
                >
                  {!isLoggedIn ? "Login" : "Dashboard"}
                </NavLink>
              </div>
            )}
          </div>

          {/* Bottom Row: Legal & Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-(--text-color)/10 text-[10px] sm:text-xs font-semibold tracking-wider text-(--text-color)/40">
            <p>© 2026 FORGEWEAR ALL RIGHTS RESERVED</p>
            <p className="hover:text-(--bg-accent) transition-colors cursor-pointer">
              TERMS & POLICIES
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
