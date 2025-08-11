'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// p5を動的にインポートし、SSRを無効にする
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

interface WeatherAnimationProps {
  scrollProgress: number; // 0から1までのスクロール進行度
  weatherType: 'rain' | 'snow' | 'cherry_blossom' | 'leaves'; // 天候の種類
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ scrollProgress, weatherType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const newDimensions = {
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        };
        setDimensions(newDimensions);
        console.log('WeatherAnimation: Container dimensions updated:', newDimensions);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    console.log('WeatherAnimation: scrollProgress changed to', scrollProgress);
    console.log('WeatherAnimation: weatherType changed to', weatherType);
  }, [scrollProgress, weatherType]);

  const flakes: any[] = []; // 雪の粒子の配列
  const cherryBlossoms: any[] = []; // 桜の花びらの配列
  const leaves: any[] = []; // 落ち葉の配列

  const setup = (p5: any, canvasParentRef: Element) => {
    console.log('WeatherAnimation: setup called');
    if (dimensions.width > 0 && dimensions.height > 0) {
      p5.createCanvas(dimensions.width, dimensions.height).parent(canvasParentRef);
      p5.stroke(35, 32, 36, 150); // 濃いチャコールグレーに透明度
      p5.strokeWeight(1);
      p5.noStroke(); // 雪、桜、葉は線なし

      // 雪の初期化
      for (let i = 0; i < 200; i++) { // 最大200個の雪
        flakes.push({
          x: p5.random(dimensions.width),
          y: p5.random(dimensions.height),
          speed: p5.random(1, 3),
          size: p5.random(2, 5),
        });
      }

      // 桜の初期化
      for (let i = 0; i < 100; i++) { // 最大100個の桜の花びら
        cherryBlossoms.push({
          x: p5.random(dimensions.width),
          y: p5.random(-dimensions.height, 0), // 画面の上部外からスタート
          speed: p5.random(0.5, 1.5),
          size: p5.random(10, 20),
          angle: p5.random(p5.TWO_PI),
          rotationSpeed: p5.random(-0.05, 0.05),
        });
      }

      // 落ち葉の初期化
      for (let i = 0; i < 80; i++) { // 最大80個の落ち葉
        leaves.push({
          x: p5.random(dimensions.width),
          y: p5.random(dimensions.height),
          speed: p5.random(1, 2.5),
          size: p5.random(15, 30),
          angle: p5.random(p5.TWO_PI),
          rotationSpeed: p5.random(-0.08, 0.08),
          color: p5.color(p5.random(150, 200), p5.random(50, 100), p5.random(0, 50), 150), // 秋の色
        });
      }
    }
  };

  const draw = (p5: any) => {
    // console.log('WeatherAnimation: draw called'); // 頻繁すぎるためコメントアウト
    if (dimensions.width === 0 || dimensions.height === 0) return;

    p5.clear(); // フレームごとにクリア

    if (weatherType === 'rain') {
      p5.stroke(35, 32, 36, 150); // 濃いチャコールグレーに透明度
      p5.strokeWeight(1);
      p5.noFill(); // 雨は塗りつぶしなし
      // スクロール進行度に応じて雨の量を調整
      const rainIntensity = p5.map(scrollProgress, 0, 1, 0, 100); // スクロールで雨の量を増やす

      for (let i = 0; i < rainIntensity; i++) {
        const x = p5.random(dimensions.width);
        const y = p5.random(dimensions.height);
        const len = p5.random(10, 20);
        p5.line(x, y, x, y + len);
      }
    } else if (weatherType === 'snow') {
      p5.noStroke(); // 雪は線なし
      p5.fill(255, 255, 255, 150); // 雪は白に透明度

      // スクロール進行度に応じて雪の量を調整
      const snowIntensity = p5.map(scrollProgress, 0, 1, 0, 200); // スクロールで雪の量を増やす

      for (let i = 0; i < snowIntensity; i++) {
        const flake = flakes[i];
        if (!flake) continue; // 範囲外のインデックスをスキップ

        p5.ellipse(flake.x, flake.y, flake.size, flake.size);
        flake.y += flake.speed;
        if (flake.y > dimensions.height) {
          flake.y = 0;
          flake.x = p5.random(dimensions.width);
        }
      }
    } else if (weatherType === 'cherry_blossom') {
      p5.noStroke();
      p5.fill(255, 192, 203, 150); // 薄いピンクに透明度

      const blossomIntensity = p5.map(scrollProgress, 0, 1, 0, 100); // スクロールで花びらの量を増やす

      for (let i = 0; i < blossomIntensity; i++) {
        const blossom = cherryBlossoms[i];
        if (!blossom) continue;

        p5.push();
        p5.translate(blossom.x, blossom.y);
        p5.rotate(blossom.angle);
        p5.ellipse(0, 0, blossom.size * 0.6, blossom.size);
        p5.pop();

        blossom.y += blossom.speed;
        blossom.x += p5.sin(p5.frameCount * 0.02 + i) * 0.5; // 横方向の揺れ
        blossom.angle += blossom.rotationSpeed;

        if (blossom.y > dimensions.height) {
          blossom.y = 0;
          blossom.x = p5.random(dimensions.width);
        }
      }
    } else if (weatherType === 'leaves') {
      p5.noStroke();

      const leavesIntensity = p5.map(scrollProgress, 0, 1, 0, 80); // スクロールで落ち葉の量を増やす

      for (let i = 0; i < leavesIntensity; i++) {
        const leaf = leaves[i];
        if (!leaf) continue;

        p5.fill(leaf.color);
        p5.push();
        p5.translate(leaf.x, leaf.y);
        p5.rotate(leaf.angle);
        p5.rect(0, 0, leaf.size * 0.7, leaf.size * 0.5); // シンプルな四角形で表現
        p5.pop();

        leaf.y += leaf.speed;
        leaf.x += p5.sin(p5.frameCount * 0.03 + i) * 0.7; // 横方向の揺れ
        leaf.angle += leaf.rotationSpeed;

        if (leaf.y > dimensions.height) {
          leaf.y = 0;
          leaf.x = p5.random(dimensions.width);
        }
      }
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Sketch setup={setup} draw={draw} />
      )}
    </div>
  );
};

export default WeatherAnimation;
