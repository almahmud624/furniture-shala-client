import React from "react";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
const Animation = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
const Animate = ({ children, animate }) => {
  return (
    <>
      <Animation
        animate={animate}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        display={"inline-block"}
      >
        {children}
      </Animation>
    </>
  );
};

export default Animate;
