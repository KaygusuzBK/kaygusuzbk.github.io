import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Projelerim | Berkan Kaygusuz',
    description: 'Berkan Kaygusuz\'un GitHub üzerinde yer alan projeleri.',
};

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
}

async function getGithubRepos(): Promise<Repo[]> {
    try {
        const res = await fetch('https://api.github.com/users/KaygusuzBK/repos?sort=updated&direction=desc', {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Failed to fetch repos: ${res.status} ${res.statusText} - ${errorData.message}`);
        }

        const repos = await res.json();
        return repos;
    } catch (error) {
        console.error('GitHub API error:', error);
        return [];
    }
}

const ProjectsPage = async () => {
    const repos = await getGithubRepos();

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                Projelerim
            </h1>

            {repos.length === 0 ? (
                <p className="text-center text-gray-400">Projeler yüklenemedi veya hiç proje bulunmuyor.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {repos.map((repo) => (
                        <Link href={repo.html_url} key={repo.id} target="_blank" rel="noopener noreferrer">
                            <div className="bg-white/5 dark:bg-black/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 h-full flex flex-col hover:border-blue-400 transition-colors duration-300">
                                <h3 className="text-2xl font-bold mb-2">{repo.name}</h3>
                                <p className="text-gray-400 dark:text-gray-300 mb-4 flex-grow">
                                    {repo.description || 'Açıklama bulunmuyor.'}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span className="px-2 py-1 bg-gray-700/50 rounded-md">{repo.language || 'N/A'}</span>
                                    <div className="flex items-center gap-4">
                                        <span>⭐ {repo.stargazers_count}</span>
                                        <span>🍴 {repo.forks_count}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsPage; 