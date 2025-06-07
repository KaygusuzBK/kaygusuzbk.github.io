import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-lg">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                    BK
                </Link>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                            Ana Sayfa
                        </Link>
                        <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                            Hakkımda
                        </Link>
                        <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                            Projeler
                        </Link>
                        <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                            İletişim
                        </Link>
                    </div>
                    <ThemeSwitcher />
                </div>
                {/* Mobile menu button will go here */}
            </div>
        </nav>
    );
};

export default Navbar; 