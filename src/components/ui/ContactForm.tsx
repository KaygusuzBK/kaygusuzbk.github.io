'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Mesajınız gönderiliyor...');

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, message }),
            });

            if (res.ok) {
                toast.success('Mesajınız başarıyla gönderildi!', { id: toastId });
                setEmail('');
                setMessage('');
            } else {
                const data = await res.json();
                throw new Error(data.error || 'Bir şeyler ters gitti.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.';
            toast.error(`Gönderim başarısız: ${errorMessage}`, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-12 bg-white/5 dark:bg-black/10 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/10">
            <h3 className="text-3xl font-bold text-center mb-6">Bana Mesaj Gönderin</h3>
            <div className="space-y-6">
                <input
                    type="email"
                    placeholder="E-posta Adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 rounded-md bg-gray-700/50 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <textarea
                    placeholder="Mesajınız"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full p-3 rounded-md bg-gray-700/50 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm; 