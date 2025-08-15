'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AsanohaPattern from './AsanohaPattern';

const CultureSection = () => {
  return (
    <section className="relative py-20 px-8 bg-white text-[#232024] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <AsanohaPattern />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: '"Shippori Mincho", serif' }}>
            空間と創造の探求者
          </h2>
          <div className="w-24 h-px bg-[#232024] mx-auto mb-8"></div>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: '"Shippori Mincho", serif' }}>
            建築の美しさと技術の可能性を融合させ、新しい価値を創造することを目指しています。
            伝統的な和の精神と現代的な技術を組み合わせ、人々の暮らしを豊かにする空間を設計します。
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CultureSection;
