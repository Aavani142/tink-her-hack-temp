import PageLayout from "../components/PageLayout";
import ModeCard from "../components/ModeCard";

export default function Home() {
  return (
    <PageLayout
      hero="The Bridge Between Sign and Speech"
      heroText="SignBridge enables real-time two-way communication between sign language users and non-sign users."
    >

      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">

        <ModeCard
          title="Sign to Text"
          description="Capture gestures and convert them into readable language instantly."
          link="/sign-to-text"
        />

        <ModeCard
          title="Text to Sign Avatar"
          description="Transform written words into expressive sign language animation."
          link="/text-to-sign"
        />

      </section>

      <section className="bg-[#D9CFE8] py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Communication Should Be Universal
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700">
          SignBridge removes communication barriers using AI-powered
          gesture recognition and avatar-based signing.
        </p>
      </section>

    </PageLayout>
  );
}
