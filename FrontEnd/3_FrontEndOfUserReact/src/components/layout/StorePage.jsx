import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import usePageStyles from "../../hooks/usePageStyles.js";

const sharedStyles = ["Home_header.css", "Home_section_three.css", "Home_footer.css"];

export default function StorePage({ children, pageStyles = [] }) {
  usePageStyles([...sharedStyles, ...pageStyles]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
