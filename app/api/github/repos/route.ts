import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // GitHub username - environment variable'dan al veya varsayılan olarak kullan
    const username = process.env.GITHUB_USERNAME || 'kaygusuzbk';
    const token = process.env.GITHUB_TOKEN;
    
    // GitHub API headers
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Token varsa ekle (rate limit artırır)
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    // GitHub API'den repos çek
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=all`,
      {
        headers,
        next: { revalidate: 3600 }, // 1 saat cache
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Sadece gerekli bilgileri filtrele
    const projects = repos
      .filter((repo: any) => !repo.fork && repo.name !== username) // Fork'ları ve kendi repo'sunu filtrele
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'Açıklama yok',
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        topics: repo.topics || [],
      }))
      .slice(0, 8); // En fazla 8 proje

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects', projects: [] },
      { status: 500 }
    );
  }
}

