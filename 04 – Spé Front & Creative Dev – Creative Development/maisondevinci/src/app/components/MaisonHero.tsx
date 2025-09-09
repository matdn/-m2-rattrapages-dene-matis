"use client";
import { motion } from "framer-motion";
import React from "react";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] } })
};

export default function MaisonHero() {
  return (
    <section className="relative max-w-[100dvw] min-h-screen w-full bg-white text-black">
      <div className="pointer-events-none absolute left-0 right-0 top-6 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <motion.span
            className="text-[12px] font-semibold uppercase tracking-[0.18em]"
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
          >
            Maison DeVinci
          </motion.span>

          <motion.span
            className="text-[12px] font-semibold uppercase tracking-[0.18em]"
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
          >
            Menu
          </motion.span>

          <motion.span
            className="text-[12px] font-semibold uppercase tracking-[0.18em]"
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
          >
            Cart(0)
          </motion.span>
        </div>
      </div>

      <div className="mx-auto grid min-h-screen grid-cols-12 items-end justify-end gap-2 px-2">
        <div className="col-span-12 flex flex-col gap-6 md:col-span-7  absolute bottom-2 left-2">
          <div className="grid grid-cols-12 gap-2">
             <motion.figure
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              className="relative col-span-12 overflow-hidden md:col-span-6 w-[28dvw]"
            >
              <img
                src="./imageHero1.png"
                alt="Black & white crowd"
                className="h-[220px] w-full object-cover md:h-[280px]"
              />
            </motion.figure>
            <motion.figure
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              className="relative col-span-12  ring-black/5 md:col-span-6 w-[28dvw]"
            >
              <img
                src="./imageHero2.png"
                alt="Editorial nature cap"
                className="h-[220px] w-full object-cover md:h-[280px]"
              />
              <span className="pointer-events-none absolute -top-5 -left-1 -translate-x-1/2  -translate-y-1/2 select-none text-3xl">+</span>
            </motion.figure>

           
          </div>
        </div>

        <div className="col-span-12 md:col-span-12 w-full flex justify-end px-8">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={2}
            className="relative text-right"
          >
            <h1 className="text-[16vw] leading-none font-extrabold tracking-tight md:text-[8rem]">
              MAISON
            </h1>
            <div className="-mt-3 pl-6 md:-mt-6 md:pl-10">
              <span className="block text-[14vw] leading-[0.9] italic font-explora text-black/80 md:text-[7rem]">
                DEVINCI
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
