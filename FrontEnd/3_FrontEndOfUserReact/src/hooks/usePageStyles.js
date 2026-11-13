import { useEffect } from "react";
import {
  carts,
  createAccount,
  homeFooter,
  homeHeader,
  homeSectionOne,
  homeSectionThree,
  homeSectionTwo,
  introduce,
  loginClient,
  news,
  newsList,
  orderList,
  phone,
  profile,
} from "../lib/styleUrls.js";

const styles = {
  "Carts.css": carts,
  "CreateAccout.css": createAccount,
  "Home_footer.css": homeFooter,
  "Home_header.css": homeHeader,
  "Home_section_one.css": homeSectionOne,
  "Home_section_three.css": homeSectionThree,
  "Home_section_two.css": homeSectionTwo,
  "Introduce.css": introduce,
  "LoginClient.css": loginClient,
  "News.css": news,
  "NewsList.css": newsList,
  "OrderList.css": orderList,
  "Phone.css": phone,
  "Profile.css": profile,
};

export default function usePageStyles(names) {
  const styleKey = names.join("|");
  useEffect(() => {
    const links = names.map((name) => {
      const href = styles[name];
      if (!href) {
        throw new Error(`Không tìm thấy stylesheet: ${name}`);
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((link) => link.remove());
  }, [styleKey]);
}
