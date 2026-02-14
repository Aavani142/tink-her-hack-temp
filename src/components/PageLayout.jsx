import Navbar from "./Navbar";

export default function PageLayout({ children, hero, heroText }) {
  return (
    <div className="bg-[#F5F2EC] min-h-screen">

      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#3F4F1F] text-white py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold">{hero}</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            {heroText}
          </p>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[#F5F2EC] rounded-t-[60%]"></div>
      </section>

      {children}

    </div>
  );
}
