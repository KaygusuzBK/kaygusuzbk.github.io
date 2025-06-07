const Footer = () => {
    return (
        <footer className="bg-transparent text-gray-500 dark:text-gray-400">
            <div className="container mx-auto px-6 py-4 text-center">
                <div className="mb-4">
                    {/* Social media links will go here */}
                    <a href="https://github.com/KaygusuzBK" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-black dark:hover:text-white transition-colors">GH</a>
                    <a href="https://www.linkedin.com/in/kaygusuzbk/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-black dark:hover:text-white transition-colors">LI</a>
                    <a href="#" className="mx-2 hover:text-black dark:hover:text-white transition-colors">TW</a>
                </div>
                <p className="text-sm">
                    © {new Date().getFullYear()} Berkan Kaygusuz. Tüm hakları saklıdır.
                </p>
            </div>
        </footer>
    );
};

export default Footer; 