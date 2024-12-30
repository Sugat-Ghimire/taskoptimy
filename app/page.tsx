"use client";

import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/landingPage/Hero";

const Features = dynamic(() =>
  import("@/components/landingPage/Features").then((mod) => mod.Features)
);
const HowItWorks = dynamic(() =>
  import("@/components/landingPage/HowItWorks").then((mod) => mod.HowItWorks)
);
const EisenhowerMatrix = dynamic(() =>
  import("@/components/landingPage/EisenhowerMatrix").then(
    (mod) => mod.EisenhowerMatrix
  )
);
const Footer = dynamic(() =>
  import("@/components/landingPage/Footer").then((mod) => mod.Footer)
);

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  useEffect(() => {
    // Implement smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Hero />
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection>
        <EisenhowerMatrix />
      </AnimatedSection>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </main>
  );
}
