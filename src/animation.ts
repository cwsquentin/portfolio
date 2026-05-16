import type { Variants } from "motion/react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.7, 0, 0.2, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.7, 0, 0.2, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.7, 0, 0.2, 1] },
  },
};

export const itemVariants = {
  fromBottom: fadeUp,
  fromLeft: fadeLeft,
  fromRight: fadeRight,
};
