import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function WelcomeAnimation() {
  return (
    <div className="flex justify-center items-center w-full">
      <DotLottieReact
        src="https://lottie.host/1a161062-3515-4a3a-bb73-bbd1a29c594e/cvfyahufh6.lottie"
        loop
        autoplay
        style={{ width: 350, height: 350 }}
      />
    </div>
  );
}
