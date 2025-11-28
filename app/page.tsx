'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  ArrowUpRight,
  FileText,
  MapPin,
  Star,
  GitFork,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import MobileDock from "./components/MobileDock";
import { FrontendSkillTree, BackendSkillTree, ToolsSkillTree } from "./components/SkillTree";
import { cn } from "../lib/utils";

interface GitHubProject {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage?: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

type Theme = "light" | "dark";

const frontendStack = [
  "React.js",
  "Vue.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "React Native",
  "Redux",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Sass",
  "Bootstrap",
];

const backendStack = [
  "Node.js",
  "Python",
  "MongoDB",
  "Firebase",
  "GraphQL",
  "C",
  "C#",
];

const toolsStack = [
  "Git",
  "Docker",
  "AWS",
  "Linux",
  "Figma",
  "Postman",
  "Cypress",
  "RabbitMQ",
];

export default function Home() {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");

  const isDark = theme === "dark";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        // Direct GitHub API call for static export compatibility
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'kaygusuzbk';
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };
        
        if (token) {
          headers['Authorization'] = `token ${token}`;
        }
        
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=all`,
          { headers }
        );
        
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        
        const repos = await res.json();
        const projects = repos
          .filter((repo: any) => !repo.fork && repo.name !== username)
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || '',
            url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.updated_at,
            topics: repo.topics || [],
          }))
          .slice(0, 4);
        
        setProjects(projects);
      } catch (e) {
        console.error('Error fetching projects:', e);
        setProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDark ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(260px,320px)_1fr]">
          {/* Left rail */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
              "flex flex-col justify-between rounded-3xl p-5 sm:p-6 lg:p-7 border",
              // Sticky only on md+ to avoid mobile overlap while scrolling
              "md:sticky md:top-4 md:h-[calc(100vh-3rem)]",
              isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
            )}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em]",
                    isDark
                      ? "border-white/20 text-white/70"
                      : "border-black/10 text-black/60",
                  )}
                >
                  Available for freelance
                </span>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                      Berkan
                      <br />
                      Kaygusuz
                    </h1>
                    <p
                      className={cn(
                        "mt-2 text-xs sm:text-sm",
                        isDark ? "text-white/60" : "text-black/60",
                      )}
                    >
                      Frontend developer crafting deliberate, minimal digital products.
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={toggleTheme}
                    aria-label="Tema değiştir"
                    className={cn(
                      "h-8 w-8 rounded-full border text-xs",
                      isDark
                        ? "border-white/40 bg-black text-white hover:bg-white hover:text-black"
                        : "border-black/20 bg-white text-black hover:bg-black hover:text-white",
                    )}
                  >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isDark ? "text-white/70" : "text-black/70",
                  )}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Istanbul, Türkiye</span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isDark ? "text-white/70" : "text-black/70",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-2 w-2 rounded-full",
                      isDark ? "bg-white" : "bg-black",
                    )}
                  />
                  <span>Open to remote & hybrid roles</span>
                </div>
              </div>

              <nav className="space-y-1 text-xs sm:text-sm">
                {[
                  { label: "Overview", href: "#top" },
                  { label: "Selected work", href: "#work" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2 transition-colors",
                      isDark
                        ? "text-white/70 hover:text-white hover:bg-white/5"
                        : "text-black/70 hover:text-black hover:bg-black/5",
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-6 space-y-3 text-xs sm:text-sm">
              <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "rounded-full px-4 py-2 h-8",
                      "bg-black text-white hover:bg-black/90",
                    )}
                  >
                    <Link href="/BerkanKaygusuz.pdf" target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-1.5 h-3.5 w-3.5" />
                      CV
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-full px-4 py-2 h-8 border",
                      isDark
                        ? "border-white text-white hover:bg-white hover:text-black"
                        : "border-black text-black hover:bg-black hover:text-white",
                    )}
                  >
                    <Link href="#contact">
                      <Mail className="mr-1.5 h-3.5 w-3.5" />
                      Contact
                    </Link>
                  </Button>
              </div>
              <div
                className={cn(
                  "flex items-center gap-3 text-[11px]",
                  isDark ? "text-white/50" : "text-black/50",
                )}
              >
                <Link
                  href="https://github.com/kaygusuzbk"
                  target="_blank"
                  className={cn(
                    "inline-flex items-center gap-1",
                    isDark ? "hover:text-white" : "hover:text-black",
                  )}
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </Link>
                <span>•</span>
                <span>{new Date().getFullYear()} © Kaygusuz</span>
              </div>
            </div>
          </motion.aside>

          {/* Right content */}
          <main
            id="top"
            className="space-y-12 sm:space-y-14 lg:space-y-16 pb-28 md:pb-0"
          >
            {/* Hero / Overview */}
            <section>
              <div className="grid gap-4 sm:gap-5 md:grid-cols-[1.4fr_minmax(0,1fr)]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className={cn(
                    "rounded-3xl border p-5 sm:p-6 md:p-7 relative overflow-hidden",
                    isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                  )}
                >
                  <div className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rotate-[18deg] border border-black/10" />
                  <div className="pointer-events-none absolute -bottom-24 -left-4 h-48 w-48 -rotate-[14deg] border border-black/10" />
                  <div className="relative space-y-4 sm:space-y-5">
                    <p
                      className={cn(
                        "text-[11px] uppercase tracking-[0.18em]",
                        isDark ? "text-white/50" : "text-black/50",
                      )}
                    >
                      Portfolio — 2025
                    </p>
                    <h2 className={cn("font-serif text-2xl sm:text-3xl md:text-4xl font-black leading-tight")}>
                      Minimal, intentional
                      <br />
                      interfaces for ambitious teams.
                    </h2>
                    <p
                      className={cn(
                        "text-sm sm:text-base max-w-xl",
                        isDark ? "text-white/65" : "text-black/65",
                      )}
                    >
                      I design and build calm, focused interfaces for products that care about details —
                      from landing pages to complex dashboards.
                    </p>
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-3 text-[11px] sm:text-xs",
                        isDark ? "text-white/60" : "text-black/55",
                      )}
                    >
                      {["Next.js · React", "TypeScript · Tailwind", "Framer Motion"].map((chip) => (
                        <span
                          key={chip}
                          className={cn(
                            "rounded-full border px-3 py-1",
                            isDark ? "border-white/25" : "border-black/15",
                          )}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  className="grid h-full grid-cols-2 gap-3 sm:gap-4"
                >
                  <Card
                    className={cn(
                      "col-span-2",
                      isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                    )}
                  >
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                      <div className="flex items-baseline justify-between">
                        <p
                          className={cn(
                            "text-[11px] uppercase tracking-[0.16em]",
                            isDark ? "text-white/50" : "text-black/50",
                          )}
                        >
                          Experience
                        </p>
                        <span className={cn("text-[11px]", isDark ? "text-white/45" : "text-black/45")}>
                          Since 2019
                        </span>
                      </div>
                      <p className="mt-3 font-serif text-3xl sm:text-4xl font-black">+5</p>
                      <p
                        className={cn(
                          "mt-1 text-xs sm:text-sm",
                          isDark ? "text-white/60" : "text-black/60",
                        )}
                      >
                        Years building interfaces and products.
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className={cn(
                      "",
                      isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                    )}
                  >
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Focus
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-xs sm:text-sm",
                          isDark ? "text-white/65" : "text-black/65",
                        )}
                      >
                        Product design, frontend architecture,
                        <br />
                        design systems.
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className={cn(
                      "",
                      isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                    )}
                  >
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Stack
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-xs sm:text-sm",
                          isDark ? "text-white/65" : "text-black/65",
                        )}
                      >
                        Next.js · React · TypeScript
                        <br />
                        Tailwind · Node · REST
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>

            {/* Selected work */}
            <motion.section
              id="work"
              className="space-y-4 sm:space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black">Selected work</h3>
                <span
                  className={cn(
                    "text-[11px] uppercase tracking-[0.16em]",
                    isDark ? "text-white/50" : "text-black/50",
                  )}
                >
                  GitHub · live projects
                </span>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {loadingProjects ? (
                  <p
                    className={cn(
                      "text-xs sm:text-sm",
                      isDark ? "text-white/60" : "text-black/60",
                    )}
                  >
                    Loading projects from GitHub…
                  </p>
                ) : projects.length === 0 ? (
                  <p
                    className={cn(
                      "text-xs sm:text-sm",
                      isDark ? "text-white/60" : "text-black/60",
                    )}
                  >
                    Şu anda öne çıkarılmış GitHub projesi bulunmuyor fakat yeni işler ekleniyor.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          className={cn(
                            "group overflow-hidden relative transition-all duration-300 hover:scale-[1.02]",
                            isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                          )}
                        >
                          {/* Hover preview overlay */}
                          <motion.div
                            className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            initial={false}
                          >
                            <div
                              className={cn(
                                "absolute inset-0 flex items-center justify-center",
                                isDark ? "bg-black/95" : "bg-white/95",
                              )}
                            >
                              <div className="text-center p-6 space-y-3">
                                <Github className={cn("h-12 w-12 mx-auto", isDark ? "text-white/40" : "text-black/40")} />
                                <p
                                  className={cn(
                                    "text-xs font-medium",
                                    isDark ? "text-white/60" : "text-black/60",
                                  )}
                                >
                                  {project.name}
                                </p>
                                <Link
                                  href={`/projects/${encodeURIComponent(project.name.toLowerCase().replace(/\s+/g, "-"))}`}
                                  className={cn(
                                    "inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-2 transition-colors",
                                    isDark
                                      ? "bg-white text-black hover:bg-white/90"
                                      : "bg-black text-white hover:bg-black/90",
                                  )}
                                >
                                  View details
                                  <ArrowUpRight className="h-3 w-3" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-3.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <CardTitle className="font-serif text-base sm:text-lg font-semibold truncate">
                                {project.name}
                              </CardTitle>
                              <CardDescription
                                className={cn(
                                  "mt-1 text-xs sm:text-sm line-clamp-2",
                                  isDark ? "text-white/60" : "text-black/60",
                                )}
                              >
                                {project.description || "Açıklama eklenmemiş."}
                              </CardDescription>
                            </div>
                            <Github
                              className={cn(
                                "h-4 w-4 transition-colors",
                                isDark
                                  ? "text-white/50 group-hover:text-white"
                                  : "text-black/40 group-hover:text-black",
                              )}
                            />
                          </div>
                        </CardHeader>
                        <CardContent
                          className={cn(
                            "p-4 sm:p-5 pt-2 sm:pt-2.5 flex flex-col gap-3 text-xs sm:text-[13px]",
                            isDark ? "text-white/60" : "text-black/60",
                          )}
                        >
                          <div className="flex flex-wrap items-center gap-3">
                            {project.language && (
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px]",
                                  isDark
                                    ? "border-white/30 bg-white/5 text-white/80"
                                    : "border-black/15 bg-black/5 text-black/80",
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    isDark ? "bg-white" : "bg-black",
                                  )}
                                />
                                <span>{project.language}</span>
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {project.stars}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              {project.forks}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={cn(
                                "text-[11px]",
                                isDark ? "text-white/50" : "text-black/50",
                              )}
                            >
                              Updated&nbsp;
                              {new Intl.DateTimeFormat("tr-TR", {
                                year: "numeric",
                                month: "short",
                              }).format(new Date(project.updatedAt))}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className={cn(
                                  "h-8 rounded-full border px-3",
                                  isDark
                                    ? "border-white text-white hover:bg-white hover:text-black"
                                    : "border-black text-black hover:bg-black hover:text-white",
                                )}
                              >
                                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                  Repo
                                  <ExternalLink className="ml-1.5 h-3 w-3" />
                                </Link>
                              </Button>
                              {project.homepage && (
                                <Button
                                  asChild
                                  size="sm"
                                  className="h-8 rounded-full bg-black text-white hover:bg-black/90 px-3"
                                >
                                  <Link href={project.homepage} target="_blank" rel="noopener noreferrer">
                                    Live
                                    <ArrowUpRight className="ml-1.5 h-3 w-3" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>

            {/* My Tech Stack / Skill Tree */}
            <motion.section
              id="stack"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card
                className={cn(
                  "overflow-hidden",
                  isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                )}
              >
                <CardContent className="p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-7">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div className="space-y-1.5">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        My Tech Stack
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black">
                        Skill tree of my daily tools.
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Frontend
                      </p>
                      <FrontendSkillTree />
                    </div>

                    <div className="space-y-2">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Backend &amp; Database
                      </p>
                      <BackendSkillTree />
                    </div>

                    <div className="space-y-2">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Tools, DevOps &amp; Others
                      </p>
                      <ToolsSkillTree />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* About / Skills snapshot */}
            <motion.section
              id="about"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="grid gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                {/* Sağ kart içeriğini sola aldık */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card
                    className={cn(
                      "",
                      isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                    )}
                  >
                    <CardContent className="p-5 sm:p-6 md:p-7 space-y-4">
                      <div className="space-y-2">
                        <p
                          className={cn(
                            "text-[11px] uppercase tracking-[0.16em]",
                            isDark ? "text-white/50" : "text-black/50",
                          )}
                        >
                          Teknolojiler &amp; Yetenekler
                        </p>
                        <div
                          className={cn(
                            "space-y-1.5 text-xs sm:text-sm",
                            isDark ? "text-white/70" : "text-black/70",
                          )}
                        >
                          <p>• React.js, Redux, Redux Toolkit</p>
                          <p>• Vue.js, Pinia</p>
                          <p>• TypeScript, JavaScript</p>
                          <p>• Tailwind CSS, Ant Design, shadcn</p>
                          <p>• HTML5, CSS3, Webpack</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p
                          className={cn(
                            "text-[11px] uppercase tracking-[0.16em]",
                            isDark ? "text-white/50" : "text-black/50",
                          )}
                        >
                          Deneyimlerim
                        </p>
                        <div
                          className={cn(
                            "space-y-1.5 text-xs sm:text-sm",
                            isDark ? "text-white/70" : "text-black/70",
                          )}
                        >
                          <p className="font-semibold">
                            Front-End Developer — Deal Forward (Remote, İngiltere) · 04/2024 – 12/2024
                          </p>
                          <p>• Vue.js ile dijital satış odası (sales room) ve kullanıcı arayüzleri geliştirdim.</p>
                          <p>• Pinia ile modüler state yönetimi ve yeniden kullanılabilir bileşenler tasarladım.</p>
                          <p>• REST API entegrasyonları ve JWT tabanlı güvenlik çözümleri üzerinde çalıştım.</p>
                          <p className="mt-2 font-semibold">
                            Front-End Developer — Appac Software (Gebze, Türkiye) · 01/2025 – 02/2025
                          </p>
                          <p>• React ve TypeScript ile entegre ERP ve B2B satış uygulamaları geliştirdim.</p>
                          <p>• Redux Toolkit ile veri yönetimini optimize ettim.</p>
                          <p>• Webpack ve lazy loading kullanarak performansı iyileştirdim.</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p
                          className={cn(
                            "text-[11px] uppercase tracking-[0.16em]",
                            isDark ? "text-white/50" : "text-black/50",
                          )}
                        >
                          Eğitim
                        </p>
                        <div
                          className={cn(
                            "space-y-1.5 text-xs sm:text-sm",
                            isDark ? "text-white/70" : "text-black/70",
                          )}
                        >
                          <p className="font-semibold">
                            Yönetim Bilişim Sistemleri — Anadolu Üniversitesi · 10/2022 – Devam Ediyor
                          </p>
                          <p className="font-semibold">
                            Junior Developer — 42 Ecole · 07/2022 – 10/2023
                          </p>
                          <p className="font-semibold">
                            Bilgisayar Programcılığı — Çanakkale Onsekiz Mart Üniversitesi · 10/2020 – 07/2022
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Hakkımda kartını sağ tarafa aldık */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card
                    className={cn(
                      "",
                      isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                    )}
                  >
                    <CardContent className="p-5 sm:p-6 md:p-7 space-y-3">
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Hakkımda
                      </p>
                      <p
                        className={cn(
                          "text-sm sm:text-base leading-relaxed",
                          isDark ? "text-white/70" : "text-black/70",
                        )}
                      >
                        Ben Berkan Kaygusuz. React.js (Redux, Redux Toolkit) ve Vue.js (Pinia) ile modern web
                        uygulamaları geliştiriyorum. REST API entegrasyonu, performans optimizasyonu ve kullanıcı
                        dostu arayüz tasarımında Tailwind CSS, Ant Design ve shadcn gibi araçlarla çalışıyorum.
                      </p>
                      <p
                        className={cn(
                          "text-sm sm:text-base leading-relaxed",
                          isDark ? "text-white/70" : "text-black/70",
                        )}
                      >
                        JSON veri doğrulama, JWT tabanlı güvenlik ve dijital satış odası (sales room) projelerinde
                        modüler ve responsive çözümler ürettim. State yönetimi, temiz kod prensipleri ve ekip içi iş
                        birliği konularında yetkinim.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section
              id="contact"
              className="pb-4 sm:pb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card
                className={cn(
                  "",
                  isDark ? "border-white/15 bg-black/90" : "border-black/10 bg-white",
                )}
              >
                <CardContent className="p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
                  <div className="flex flex-col gap-4 sm:gap-3">
                    <div>
                      <p
                        className={cn(
                          "text-[11px] uppercase tracking-[0.16em]",
                          isDark ? "text-white/50" : "text-black/50",
                        )}
                      >
                        Contact
                      </p>
                      <h3 className="mt-1 font-serif text-xl sm:text-2xl font-black">
                        Benimle iletişime geç.
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-xs sm:text-sm",
                          isDark ? "text-white/60" : "text-black/60",
                        )}
                      >
                        LinkedIn, WhatsApp veya e-posta üzerinden ulaşabilirsin. Kısa bir mesaj bırakman yeterli.
          </p>
        </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className={cn(
                          "rounded-full px-4 h-8 border text-xs sm:text-sm",
                          isDark
                            ? "border-white text-white hover:bg-white hover:text-black"
                            : "border-black text-black hover:bg-black hover:text-white",
                        )}
                      >
                        <Link
                          href="https://www.linkedin.com/in/kaygusuzbk"
            target="_blank"
            rel="noopener noreferrer"
          >
                          <span className="mr-1.5 text-[13px] font-semibold">in</span>
                          LinkedIn
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className={cn(
                          "rounded-full px-4 h-8 border text-xs sm:text-sm",
                          isDark
                            ? "border-white text-white hover:bg-white hover:text-black"
                            : "border-black text-black hover:bg-black hover:text-white",
                        )}
                      >
                        <Link
                          href="https://wa.me/905000000000"
            target="_blank"
            rel="noopener noreferrer"
          >
                          WhatsApp
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className={cn(
                          "rounded-full px-4 h-8 border text-xs sm:text-sm",
                          isDark
                            ? "border-white text-white hover:bg-white hover:text-black"
                            : "border-black text-black hover:bg-black hover:text-white",
                        )}
                      >
                        <Link href="mailto:mail@kaygusuzbk.dev">
                          <Mail className="mr-1.5 h-3.5 w-3.5" />
                          mail@kaygusuzbk.dev
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <form
                    className="grid gap-3 sm:gap-4 sm:grid-cols-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="space-y-1.5 sm:col-span-1">
                      <label
                        className={cn(
                          "text-xs sm:text-sm",
                          isDark ? "text-white/70" : "text-black/70",
                        )}
                      >
                        Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        className={cn(
                          "rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0",
                          isDark
                            ? "border-white/25 bg-black/70 text-white placeholder:text-white/40"
                            : "border-black/20 bg-white text-black placeholder:text-black/40",
                        )}
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-1">
                      <label
                        className={cn(
                          "text-xs sm:text-sm",
                          isDark ? "text-white/70" : "text-black/70",
                        )}
                      >
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className={cn(
                          "rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0",
                          isDark
                            ? "border-white/25 bg-black/70 text-white placeholder:text-white/40"
                            : "border-black/20 bg-white text-black placeholder:text-black/40",
                        )}
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label
                        className={cn(
                          "text-xs sm:text-sm",
                          isDark ? "text-white/70" : "text-black/70",
                        )}
                      >
                        Project / message
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="A few lines about what you’d like to build."
                        className={cn(
                          "rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 resize-none",
                          isDark
                            ? "border-white/25 bg-black/70 text-white placeholder:text-white/40"
                            : "border-black/20 bg-white text-black placeholder:text-black/40",
                        )}
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-between gap-3 pt-1">
                      <span
                        className={cn(
                          "text-[11px]",
                          isDark ? "text-white/45" : "text-black/45",
                        )}
                      >
                        No spam, no newsletter — just replies.
                      </span>
                      <Button
                        type="submit"
                        className="rounded-full bg-black text-white hover:bg-black/90 px-5 h-9 text-xs sm:text-sm"
                      >
                        Send message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.section>
          </main>
        </div>
      </div>
      <MobileDock />
    </div>
  );
}
