'use client';

import React, { useState, useRef } from 'react';
import Sketch from 'react-p5';
import type p5 from 'p5';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import InterestTopic from './InterestTopic'; // Import the new component

// --- p5.js Particle System Logic (remains the same) ---
let particles: Particle[] = [];
let flowfield: p5.Vector[];

class Particle {
  pos: p5.Vector; vel: p5.Vector; acc: p5.Vector; p: p5;
  constructor(p: p5) { this.p = p; this.pos = p.createVector(p.random(p.width), p.random(p.height)); this.vel = p.createVector(0, 0); this.acc = p.createVector(0, 0); }
  update() { this.vel.add(this.acc); this.vel.limit(1); this.pos.add(this.vel); this.acc.mult(0); }
  follow(vectors: p5.Vector[]) { const x = Math.floor(this.pos.x / 20); const y = Math.floor(this.pos.y / 20); const index = x + y * Math.floor(this.p.width / 20); const force = vectors[index]; if(force) this.applyForce(force); }
  applyForce(force: p5.Vector) { this.acc.add(force); }
  show() { this.p.stroke(255, 25); this.p.strokeWeight(1.5); this.p.point(this.pos.x, this.pos.y); }
  edges() { if (this.pos.x > this.p.width) { this.pos.x = 0; } if (this.pos.x < 0) { this.pos.x = this.p.width; } if (this.pos.y > this.p.height) { this.pos.y = 0; } if (this.pos.y < 0) { this.pos.y = this.p.height; } }
}

// --- React Component ---

interface InteractiveInterestsProps {
  interests: any;
  works: any[];
}

const interestTopics = [
  { key: 'spaceAndCreation', title: '空間と創造', categories: ['建築', 'デザイン', '研究'] },
  { key: 'cultureAndExploration', title: '文化と探求', categories: ['アート', '写真'] },
  { key: 'digital', title: 'デジタル・開発', categories: ['プログラミング'] },
];

const InteractiveInterests: React.FC<InteractiveInterestsProps> = ({ interests, works }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [selectedTopic, setSelectedTopic] = useState<{ key: string; title: string; categories: string[] } | null>(null);

  const setup = (p: p5, canvasParentRef: Element) => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(canvasParentRef);
    p.noiseDetail(1, 0.5);
    const cols = Math.floor(p.width / 20);
    const rows = Math.floor(p.height / 20);
    flowfield = new Array(cols * rows);
    particles = [];
    for (let i = 0; i < 200; i++) {
      particles[i] = new Particle(p);
    }
  };

  const draw = (p: p5) => {
    p.background(16, 24, 32, 25);
    // ... draw logic remains the same
    const cols = Math.floor(p.width / 20); const rows = Math.floor(p.height / 20); let yoff = 0;
    for (let y = 0; y < rows; y++) { let xoff = 0; for (let x = 0; x < cols; x++) { const index = x + y * cols; const angle = p.noise(xoff, yoff, p.frameCount * 0.0005) * p.TWO_PI * 2; const v = p5.Vector.fromAngle(angle); v.setMag(0.1); flowfield[index] = v; xoff += 0.1; } yoff += 0.1; }
    for (let i = 0; i < particles.length; i++) { particles[i].follow(flowfield); particles[i].update(); particles[i].edges(); particles[i].show(); }
    if (p.mouseIsPressed) { const mouseVec = p.createVector(p.mouseX - p.width / 2, p.mouseY - p.height / 2); for (let i = 0; i < particles.length; i++) { const d = mouseVec.dist(particles[i].pos); if (d < 100) { const repel = p5.Vector.sub(particles[i].pos, mouseVec); repel.setMag(5 / (d + 1)); particles[i].applyForce(repel); } } }
  };

  const windowResized = (p: p5) => { p.resizeCanvas(p.windowWidth, p.windowHeight); };

  const handleTopicClick = (topic: typeof interestTopics[0]) => {
    const progress = scrollYProgress.get();
    const start = interestTopics.indexOf(topic) / interestTopics.length;
    const end = (interestTopics.indexOf(topic) + 1) / interestTopics.length;

    if (progress > start && progress < end) {
      setSelectedTopic(topic);
    }
  };

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-dark-charcoal text-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Sketch setup={setup} draw={draw} windowResized={windowResized} className="absolute inset-0 -z-10" />
        <div className="relative z-10 h-full">
          {interestTopics.map((topic, i) => (
            <InterestTopic
              key={topic.key}
              topic={topic}
              index={i}
              totalTopics={interestTopics.length}
              scrollYProgress={scrollYProgress}
              onClick={() => handleTopicClick(topic)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedTopic && (
            <motion.div
              layoutId={`topic-container-${selectedTopic.key}`}
              className="absolute inset-0 bg-dark-charcoal/80 backdrop-blur-lg p-8 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2 layoutId={`topic-title-${selectedTopic.key}`} className="text-6xl md:text-9xl font-black text-center leading-tight mb-16">
                  {selectedTopic.title}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {works.filter(work => selectedTopic.categories.includes(work.category)).map(work => (
                    <motion.div key={work.id} className="bg-white/10 p-4 rounded-lg">
                       <div className="relative h-56 mb-4 overflow-hidden rounded-lg">
                         <Image src={work.imageUrl} alt={work.title} fill className="object-cover" loading="lazy" />
                       </div>
                       <h3 className="text-xl font-bold">{work.title}</h3>
                       <p className="text-sm opacity-80">{work.description}</p>
                    </motion.div>
                  ))}
                </div>
                <button onClick={() => setSelectedTopic(null)} className="absolute top-8 right-8 text-4xl">&times;</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveInterests;
