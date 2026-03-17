import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Day 1: 认识 OpenClaw — OpenClaw 101',
};

export default function LearnDay1Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 bg-gradient-to-br from-blue-500 to-blue-600">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              👋
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-white/90 bg-white/10 px-3 py-0.5 rounded-full">
                  第 1 天
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                认识 OpenClaw
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">OpenClaw 是什么</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              OpenClaw 是一个<strong className="font-semibold text-gray-900">全能型 AI 助手框架</strong>，
              它和 ChatGPT 的核心区别在于：<strong className="font-semibold text-gray-900">它能真正"动手做事"</strong>。
            </p>
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm">
              <code>{`npm install -g openclaw\nopenclaw --version`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-end items-center">
            <Link
              href="/learn/2"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>Day 2: 深度对话</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
