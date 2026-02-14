import { Link } from "react-router-dom";

export default function ModeCard({ title, description, link }) {
  return (
    <Link to={link} className="bg-white border p-10 hover:shadow-lg transition">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
