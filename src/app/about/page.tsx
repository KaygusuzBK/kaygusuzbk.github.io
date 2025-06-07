import type { Metadata } from 'next';
import { FaReact, FaVuejs, FaHtml5, FaJsSquare, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiRedux, SiPinia, SiTailwindcss, SiWebpack } from 'react-icons/si';

export const metadata: Metadata = {
    title: 'Hakkımda | Berkan Kaygusuz',
    description: 'Berkan Kaygusuz\'un profesyonel deneyimleri, eğitimi ve yetenekleri.',
};

const skills = [
    { name: 'React.js', icon: <FaReact size={40} className="text-cyan-400" /> },
    { name: 'Vue.js', icon: <FaVuejs size={40} className="text-green-500" /> },
    { name: 'TypeScript', icon: <SiTypescript size={40} className="text-blue-500" /> },
    { name: 'JavaScript', icon: <FaJsSquare size={40} className="text-yellow-400" /> },
    { name: 'Redux', icon: <SiRedux size={40} className="text-purple-500" /> },
    { name: 'Pinia', icon: <SiPinia size={40} className="text-yellow-500" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} className="text-cyan-500" /> },
    { name: 'HTML5', icon: <FaHtml5 size={40} className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt size={40} className="text-blue-600" /> },
    { name: 'Webpack', icon: <SiWebpack size={40} className="text-blue-400" /> },
];

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                Hakkımda
            </h1>

            <div className="glass-card p-8 mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-cyan-400">Ben Berkan Kaygusuz</h2>
                <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    React.js (Redux, Redux Toolkit) ve Vue.js (Pinia) ile modern web uygulamaları geliştiriyorum. REST API entegrasyonu, performans optimizasyonu ve kullanıcı dostu arayüz tasarımında Tailwind CSS, Ant Design ve Shadcn gibi framework'leri kullanarak deneyim kazandım. JSON veri doğrulama, JWT tabanlı güvenlik ve dijital satış odası (sales room) projelerinde modüler ve responsive çözümler ürettim. State yönetimi, temiz kod prensipleri ve ekip içi iş birliği konularında yetkinim.
                </p>
            </div>

            <div className="mb-12">
                <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Teknolojiler & Yetenekler</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center">
                    {skills.map((skill) => (
                        <div key={skill.name} className="glass-card p-4 flex flex-col items-center justify-center hover:border-cyan-400 transition-colors duration-300">
                            {skill.icon}
                            <p className="mt-2 text-sm font-medium">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Experience Section */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Deneyimlerim</h2>
                    <div className="glass-card p-6">
                        <h3 className="text-2xl font-bold">Front-End Developer</h3>
                        <p className="text-lg font-semibold text-cyan-400">Deal Forward (Remote - İngiltere)</p>
                        <p className="text-sm text-gray-400 mb-4">04/2024 – 12/2024</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Vue.js ile kullanıcı arayüzleri ve dijital satış odası (sales room) geliştirdim.</li>
                            <li>Pinia ile state yönetimi yaparak modüler bileşenler tasarladım.</li>
                            <li>REST API entegrasyonları ve JWT tabanlı güvenlik çözümleri üzerinde çalıştım.</li>
                        </ul>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="text-2xl font-bold">Front-End Developer</h3>
                        <p className="text-lg font-semibold text-cyan-400">Appac Software (Gebze, Turkey)</p>
                        <p className="text-sm text-gray-400 mb-4">01/2025 – 02/2025</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>React ve TypeScript kullanarak entegre bir ERP sistemi ve B2B satış uygulaması geliştirdim.</li>
                            <li>Redux Toolkit ile veri yönetimini optimize ettim.</li>
                            <li>Webpack ve lazy loading kullanarak uygulama performansını artırdım.</li>
                        </ul>
                    </div>
                </div>

                {/* Education Section */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Eğitim</h2>
                    <div className="glass-card p-6 text-center">
                        <h3 className="text-xl font-bold">Yönetim Bilişim Sistemleri</h3>
                        <p className="font-semibold text-cyan-400">Anadolu University</p>
                        <p className="text-sm text-gray-400">10/2022 - Devam Ediyor</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <h3 className="text-xl font-bold">Junior Developer</h3>
                        <p className="font-semibold text-cyan-400">42 Ecole</p>
                        <p className="text-sm text-gray-400">07/2022 – 10/2023</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <h3 className="text-xl font-bold">Bilgisayar Programcılığı</h3>
                        <p className="font-semibold text-cyan-400">Çanakkale Onsekiz Mart Üniversitesi</p>
                        <p className="text-sm text-gray-400">10/2020 – 07/2022</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage; 