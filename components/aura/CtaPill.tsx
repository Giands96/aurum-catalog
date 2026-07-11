"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";

type Props = HTMLMotionProps<"button"> & {
  label: string;
  variant?: "light" | "ghost";
};

export const CtaPill = forwardRef<HTMLButtonElement, Props>(function CtaPill(
  { label, variant = "light", className, ...rest },
  ref
) {
  const isLight = variant === "light";
  return (
    <motion.button
      ref={ref}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={`group relative inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-medium transition-colors ${
        isLight
          ? "bg-primary text-primary-foreground"
          : "bg-transparent border border-line text-text-primary hover:bg-surface-alt/40"
      } ${className ?? ""}`}
      {...rest}
    >
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: -2 } }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.span>
      <motion.span
        variants={{ rest: { scale: 1 }, hover: { scale: 1.12, rotate: -8 } }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`w-9 h-9 rounded-full flex items-center justify-center ${
          isLight ? "bg-background text-text-primary" : "bg-primary text-primary-foreground"
        }`}
      >
        <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
      </motion.span>
    </motion.button>
  );
});
