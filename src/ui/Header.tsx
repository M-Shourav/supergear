import { useEffect, useState } from "react";
import { logo } from "../assets";
import Container from "./Components/Container";
import { IoClose, IoSearch } from "react-icons/io5";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { FaChevronDown, FaRegStar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BottomHeader } from "../constants";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import { categoryProps } from "../../type";

const Header = () => {
  const [SearchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/categories", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Data fetching error" + response?.statusText);
      }
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="h-20">
        <Container className="flex items-center justify-between h-full gap-7">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-44" />
          </Link>
          <div className="hidden md:inline-flex flex-1 relative">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search Products"
              value={SearchText}
              className="w-full outline-none rounded-full py-2 pr-10 pl-5 border-0 ring-1 ring-inset
            ring-gray-300 placeholder:text-base placeholder:text-gray-400 sm:text-sm focus:ring-2 focus:ring-darkText"
            />
            {SearchText ? (
              <span
                onClick={() => setSearchText("")}
                className="absolute top-1.5 right-5 text-2xl cursor-pointer hover:text-red-500 duration-200"
              >
                <IoClose />
              </span>
            ) : (
              <span className="absolute top-1.5 right-5 text-2xl cursor-pointer">
                <IoSearch />
              </span>
            )}
          </div>
          <div className="flex items-center gap-5 text-2xl cursor-pointer">
            <Link to={"/profile"} className=" hover:text-skyText duration-200">
              <FiUser />
            </Link>
            <div className="relative hover:text-skyText duration-200">
              <Link to={"/favorite"}>
                <FaRegStar />
              </Link>
              <span
                className="absolute -top-1.5 -right-2 w-4 h-4 bg-themeRed text-white rounded-full text-xs
            flex items-center justify-center"
              >
                0
              </span>
            </div>
            <div className="relative hover:text-skyText duration-200">
              <Link to={"/cart"}>
                <FiShoppingBag />
              </Link>
              <span
                className="absolute -top-1.5 -right-2 w-4 h-4 bg-themeRed text-white rounded-full text-xs
            flex items-center justify-center"
              >
                0
              </span>
            </div>
          </div>
        </Container>
      </div>
      <div className="w-full bg-black text-white">
        <Container className="max-w-4xl py-2 flex items-center justify-between gap-5">
          <Menu>
            <MenuButton
              className="inline-flex items-center gap-2 text-sm font-semibold border border-gray-400 rounded-md px-3 py-1.5
            text-gray-300 hover:text-whiteText hover:border-white duration-200"
            >
              Select Catagories <FaChevronDown />
            </MenuButton>
            <Transition>
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border
                 border-white/5 bg-darkText p-1 text-sm/6 text-gray-300 
                 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] 
                 focus:outline-none hover:text-whiteText z-50"
              >
                {categories?.map((item: categoryProps) => (
                  <MenuItem key={item?._id}>
                    <Link
                      to={`/category/${item?._base}`}
                      className="w-full flex items-center gap-2 px-3 py-2
                     data-[focus]:bg-white/20 rounded-lg tracking-wide"
                    >
                      <img
                        src={item?.image}
                        alt="image"
                        className="w-6 h-6 rounded-md"
                      />
                      {item?.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>

          {BottomHeader?.map(({ title, link }) => (
            <Link
              to={link}
              key={title}
              className={`uppercase hidden md:inline-flex text-sm font-semibold 
               hover:text-whiteText duration-200 group relative overflow-hidden ${
                 pathName === link
                   ? "text-themeRed hover:text-themeRed"
                   : "text-whiteText/90"
               }`}
            >
              {title}
              <span
                className="absolute bottom-0 left-0 w-full  h-[1px] inline-flex bg-whiteText 
               transform -translate-x-[105%] group-hover:translate-x-0 duration-300  "
              />
            </Link>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Header;
