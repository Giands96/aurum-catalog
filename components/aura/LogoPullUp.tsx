"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import AurumLogo from "@/public/images/logo-aurum.webp";

interface LogoPullUpProps {
  className?: string;
  delay?: number;
}

export function LogoPullUp({ className, delay = 0 }: LogoPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={className} aria-label="Logo Aurum">
      <span className="sr-only">Logo Aurum</span>
      <span aria-hidden="true" className="inline-block overflow-hidden align-middle">
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : { y: "110%" }}
          transition={{
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={AurumLogo}
            alt=""
            width={1200}
            height={350}
            className=" w-full h-auto"
            priority
          />
        </motion.span>
      </span>
    </div>
  );
}
