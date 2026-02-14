import PageLayout from "../components/PageLayout";
import TeachableGestureCamera from "../components/TeachableGestureCamera";

export default function SignToText() {

  return (
    <PageLayout
      hero="Real-Time Hand Gesture Recognition"
      heroText="AI powered sign language detection using Teachable Machine"
    >
      <div className="py-20 flex justify-center">
        <TeachableGestureCamera />
      </div>
    </PageLayout>
  );
}
