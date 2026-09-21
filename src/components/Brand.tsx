import { Link } from "react-router-dom";
import "./Brand.css";

export default function Brand() {
  return (
    <Link to="/" className="brand">
      <span className="brand-name">María Ignacia Alcaíno</span>
      <img src="/works/asterisk.png" alt="" className="brand-asterisk" width={12} height={12} />
    </Link>
  );
}
