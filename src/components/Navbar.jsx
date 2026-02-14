import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#3F4F1F] text-white border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">

        <Link to="/" className="font-semibold tracking-wide">
          SIGNBRIDGE
        </Link>

        <div className="flex gap-8 text-sm">
          <span>Technology</span>
          <span>Impact</span>
          <span>About</span>
        </div>

      </div>
    </nav>
  );
}
