'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';

import Image from 'next/image';

interface App {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  bgColor: string;
}

const apps: App[] = [
  {
    name: 'Swift Revise',
    description: '不動産資格のシンプルな一問一答アプリです。',
    url: 'https://swift-revise.vercel.app/',
    imageUrl: '/images/appview_quiz.png',
    bgColor: '#FAFAFA',
  },
  {
    name: 'Drunk Scheduler',
    description: '飲み会のスケジュール調整を簡単にするためのWebアプリです。',
    url: 'https://drunk-scheduler.onrender.com/',
    imageUrl: '/images/appview_drunk.png',
    bgColor: '#FFECCE',
  },
  {
    name: 'Multi AI Chat',
    description: '複数のAIキャラクターと同時にチャットができるWebアプリです。',
    url: 'https://ai-simulation-one.vercel.app/',
    imageUrl: '/images/appview_chat.png',
    bgColor: '#212121',
  },
  {
    name: 'Portfolio Site',
    description: '私のポートフォリオサイトです。',
    url: 'https://portfolio-site-ver1.vercel.app/',
    imageUrl: '/images/webview_portfolio.png',
    bgColor: '#008877',
  },
  {
    name: 'UT architecture pavilion',
    description: '学生時代に設計・施工したパビリオンのウェブサイトです。',
    url: 'https://utarchipavilion202.wixsite.com/website',
    imageUrl: '/images/webview_pavilion.png',
    bgColor: '#DBC9BF',
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
          <Link href={app.url} key={app.name} target="_blank" rel="noopener noreferrer" className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
            <div
              className="relative h-56 w-full"
              style={{ backgroundColor: app.bgColor }}
            >
              <Image
                src={app.imageUrl}
                alt={app.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{app.name}</h2>
                <p className="text-gray-600 mb-4">{app.description}</p>
              </div>
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
