import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="container mx-auto px-4 text-center flex flex-col justify-center items-center flex-grow h-full">
      <div className="max-w-4xl py-16">
        <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-4 tracking-widest uppercase">
          Front-End Developer
        </h2>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Berkan Kaygusuz
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Yaratıcı ve sezgisel kullanıcı deneyimleri oluşturarak dijital dünyayı şekillendiriyorum.
        </p>

        <div className="flex justify-center items-center gap-6 mb-12">
          <Link
            href="/projects"
            className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold py-4 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            Projelerimi Gör
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white/50 text-white hover:bg-white hover:text-slate-950 font-bold py-4 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            İletişime Geç
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-8">
          <a href="https://github.com/KaygusuzBK" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/kaygusuzbk/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={28} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={28} />
          </a>
        </div>
      </div>
    </section>
  );
}
