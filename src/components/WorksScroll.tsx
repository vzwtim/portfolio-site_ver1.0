"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const works = [
  {
    id: 1,
    title: "建築プロジェクトA",
    description: "都市に開かれた、光と緑の集合住宅。",
    imageUrl: "/materials/images/top.jpg",
    link: "/works/project-a",
  },
  {
    id: 2,
    title: "研究：不良住宅",
    description: "都市の隙間に生まれる非公式な居住空間の研究。",
    imageUrl: "/materials/images/top.jpg",
    link: "/works/research-bad-housing",
  },
  {
    id: 3,
    title: "プロダクトデザイン",
    description: "ミニマルな生活に寄り添う家具のデザイン。",
    imageUrl: "/materials/images/top.jpg",
    link: "/works/product-design",
  },
  {
    id: 4,
    title: "書道アート",
    description: "伝統的な書と現代的な空間の融合。",
    imageUrl: "/materials/images/top.jpg",
    link: "/works/shodo-art",
  },
];

const WorksScroll = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-[#f7f7f7] text-[#232024]"
    >
      <h2 className="text-4xl font-medium pt-20 mb-16 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
        作品
      </h2>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {works.map((work) => {
            return (
              <div
                key={work.id}
                className="group relative h-[450px] w-[600px] overflow-hidden bg-neutral-200"
              >
                <div
                  style={{
                    backgroundImage: `url(${work.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
                ></div>
                <div className="absolute inset-0 z-10 grid place-content-center bg-black/50">
                  <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-4xl font-black uppercase text-white backdrop-blur-lg">
                    {work.title}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
            <Link href="/works">
                <span className="inline-block bg-[#232024] text-[#f7f7f7] px-12 py-4 hover:bg-[#b33953] transition-colors duration-300 cursor-pointer" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                全ての作品を見る
                </span>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default WorksScroll;