'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
// import useRepelEffect from '@/hooks/useRepelEffect'; // useRepelEffect を削除

// 各花びらのアニメーションのプロパティをランダム化するためのヘルパー関数
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const SakuraPetal: React.FC<{ startDelay?: number }> = ({ startDelay }) => {
  const [animationProps, setAnimationProps] = useState<{
    xInitial: number;
    xFinal: number;
    yInitial: number;
    duration: number;
    delay: number;
    size: number;
    initialRotation: number;
    finalRotation: number;
  } | null>(null);
  const [petalSrc, setPetalSrc] = useState<string>('/images/sakura.svg'); // 花びらの画像パスを状態として追加

  useEffect(() => {
    // 花びらの色をランダムに決定
    const rand = Math.random();
    if (rand < 0.01) { // 1% (1/100) の確率で008877
      setPetalSrc('/images/sakura_008877.svg');
    } else if (rand < 0.1) { // 10% (1/10) の確率でbb5555 (0.01から0.1の範囲)
      setPetalSrc('/images/sakura_bb5555.svg');
    } else {
      setPetalSrc('/images/sakura.svg'); // デフォルトのピンク
    }

    setAnimationProps({
      xInitial: random(10, 20), // 木の左側からスタート
      xFinal: 110, // 画面の右外へ
      yInitial: random(0, 30), // 画面の上の方からスタート
      duration: random(20, 40), // アニメーション時間を遅く
      delay: (startDelay || 0), // 開始遅延をなくす
      size: random(5, 10), // 花びらのサイズを小さく
      initialRotation: random(0, 360),
      finalRotation: random(180, 360) * (Math.random() > 0.5 ? 1 : -1),
    });
  }, [startDelay]); // Re-run if startDelay changes

  if (!animationProps) return null; // Render nothing until animationProps are set on client

  const {
    xInitial,
    xFinal,
    yInitial,
    duration,
    delay,
    size,
    initialRotation,
    finalRotation,
  } = animationProps;

  // useRepelEffect の呼び出しを削除
  // const { elementRef, springX, springY } = useRepelEffect(xInitial, yInitial, {
  //   repelRadius: 30,
  //   repelStrength: 0.05,
  //   stiffness: 100,
  //   damping: 10,
  // });

  return (
    <motion.div
      // ref={elementRef} // ref を削除
      className="absolute"
      style={{
        top: `${yInitial}%`,
        left: `${xInitial}%`,
        width: size,
        height: size,
        zIndex: 5, // 動物たちより手前、フッターより奥
        // x: springX, // useRepelEffect からの x を削除
        // y: springY, // useRepelEffect からの y を削除
      }}
      initial={{
        x: 0, // x を元に戻す
        rotate: initialRotation,
        opacity: 1,
      }}
      animate={{
        x: `${xFinal}vw`,
        y: [yInitial, 100], // yInitial から開始
        rotate: finalRotation,
        opacity: 1,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: 5,
        
      }}
    >
      <Image
      src={petalSrc}
      alt="Sakura Petal"
      fill
      className="object-contain"
    />
    </motion.div>
  );
};

export default SakuraPetal;