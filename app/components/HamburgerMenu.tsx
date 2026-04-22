import { RxHamburgerMenu } from "react-icons/rx";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useHamburgerMenu } from "../hooks/useHamburgerMenu";
import { FaXmark } from "react-icons/fa6";

export default function HamburgerMenu() {
  const { open, toggle } = useHamburgerMenu();

  return (
    <div
      className="pl-3 cursor-pointer"
      onClick={toggle}
      style={{
        position: "relative",
        width: "24px",
        height: "24px",
      }}
    >
      <div
        style={{
          position: "absolute",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: open ? 0 : 1,
          transform: open
            ? "rotate(180deg) scale(0.8)"
            : "rotate(0deg) scale(1)",
          pointerEvents: open ? "none" : "auto",
        }}
      >
        <RxHamburgerMenu size={24} />
      </div>
      <div
        style={{
          position: "absolute",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: open ? 1 : 0,
          transform: open
            ? "rotate(0deg) scale(1)"
            : "rotate(-180deg) scale(0.8)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <FaXmark size={24} />
      </div>
    </div>
  );
}
