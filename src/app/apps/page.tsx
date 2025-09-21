'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';

interface App {
  name: string;
  description: string;
  url: string;
}

const apps: App[] = [
  {
    name: '一問一答アプリ',
    description: 'SwiftUI製のシンプルな一問一答アプリです。',
    url: 'https://swift-revise.vercel.app/',
  },
  {
    name: '飲み会専用調整さん',
    description: '飲み会のスケジュール調整を簡単にするためのWebアプリです。',
    url: 'https://drunk-scheduler.onrender.com/',
  },
  {
    name: 'AIハーレムちゃっと',
    description: '複数のAIキャラクターと同時にチャットができるWebアプリです。',
    url: 'https://ai-simulation-one.vercel.app/',
  },
];

const AppsPage: NextPage = () => {
  const { setBgColor, setTextColor } = useTheme();

  useEffect(() => {
    setBgColor('bg-white');
    setTextColor('text-gray-800');
    return () => {
      setBgColor('bg-white');
      setTextColor('text-[#008877]');
    };
  }, [setBgColor, setTextColor]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-900">My Apps & Sites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {apps.map((app) => (
          <Link href={app.url} key={app.name} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
            <div className="relative h-56 w-full bg-gray-200 flex items-center justify-center">
              {/* 画像プレースホルダー */}
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l.01.01"></path></svg>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{app.name}</h2>
              <p className="text-gray-600 mb-4">{app.description}</p>
              <div className="text-right text-teal-500 group-hover:text-teal-600 font-semibold transition-colors">
                Visit Site &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppsPage;
