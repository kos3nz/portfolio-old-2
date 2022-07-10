/** Dependencies
 * "framer-motion": "^6.3.16",
 */

import { motion, Variants } from "framer-motion";

const Bounce: React.FunctionComponent<{}> = ({}) => {
  return (
    <motion.div
      className="flex items-center gap-1"
      variants={parent}
      initial="initial"
      animate="animate"
    >
      <motion.span
        className="inline-flex h-2 w-2 rounded-full bg-red-400"
        variants={child}
      />
      <motion.span
        className="inline-flex h-2 w-2 rounded-full bg-yellow-400"
        variants={child}
      />
      <motion.span
        className="inline-flex h-2 w-2 rounded-full bg-green-400"
        variants={child}
      />
    </motion.div>
  );
};

export default Bounce;

/* Variants */

const parent: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child: Variants = {
  initial: { y: 0 },
  animate: {
    y: -6,
    transition: {
      duration: 0.5,
      // ease: [0.5, 0.05, 1, 0.5],
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};
