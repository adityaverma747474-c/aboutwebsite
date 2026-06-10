import { useEffect, useRef } from "react";
import animationData from "@/assets/pro-animation.json";

interface Props { progress?: number; }

export default function BlueprintScene({ progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any;
    let isMounted = true;

    const startLottie = (lottie: any) => {
      if (!isMounted || !containerRef.current) return;
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    };

    const lottieScriptId = "lottie-cdn-script";
    let script = document.getElementById(lottieScriptId) as HTMLScriptElement;

    if ((window as any).lottie) {
      startLottie((window as any).lottie);
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = lottieScriptId;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
        script.async = true;
        document.body.appendChild(script);
      }

      const onLoad = () => {
        if ((window as any).lottie) {
          startLottie((window as any).lottie);
        }
      };

      script.addEventListener("load", onLoad);
      return () => {
        script.removeEventListener("load", onLoad);
        if (anim) anim.destroy();
        isMounted = false;
      };
    }

    return () => {
      if (anim) anim.destroy();
      isMounted = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center max-w-[150px] mx-auto"
      style={{ minHeight: "150px" }}
    />
  );
}
