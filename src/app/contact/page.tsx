"use client";
import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Clipboard, Check } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

// export const metadata: Metadata = {
//   title: 'İletişim | Berkan Kaygusuz',
//   description: 'Berkan Kaygusuz ile iletişime geçin.',
// };

const ContactPage = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'berkankaygusuz41@outlook.com',
            href: 'mailto:berkankaygusuz41@outlook.com',
        },
        {
            icon: Phone,
            label: 'Telefon',
            value: '+90 545 564 65 41',
            href: 'tel:+905455646541',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'KaygusuzBK',
            href: 'https://github.com/KaygusuzBK',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'Berkan Kaygusuz',
            href: 'https://www.linkedin.com/in/kaygusuzbk/',
        },
    ];

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(label);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                İletişime Geçin
            </h1>
            <p className="text-center text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Aşağıdaki bilgilerden bana ulaşabilir veya formu doldurarak doğrudan mesaj gönderebilirsiniz.
            </p>
            <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contactInfo.map((item) => (
                        <div key={item.label} className="bg-white/5 dark:bg-black/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 flex items-center space-x-4">
                            <item.icon className="w-8 h-8 text-blue-400" />
                            <div className="flex-1">
                                <p className="font-semibold text-lg">{item.label}</p>
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white break-all">
                                    {item.value}
                                </a>
                            </div>
                            {(item.label === 'Email' || item.label === 'Telefon') && (
                                <button onClick={() => copyToClipboard(item.value, item.label)} className="p-2 rounded-full hover:bg-gray-700">
                                    {copied === item.label ? <Check className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5" />}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-w-2xl mx-auto">
                <ContactForm />
            </div>
        </div>
    );
};

export default ContactPage; 