"use client";

import React from "react";
import { IconCloud } from "@/registry/magicui/icon-cloud";

// Frontend skills
const frontendSlugs = [
  "react",
  "vuejs",
  "nextdotjs",
  "typescript",
  "javascript",
  "react",
  "redux",
  "html5",
  "css3",
  "tailwindcss",
  "sass",
  "bootstrap",
];

// Backend & Database skills
const backendSlugs = [
  "nodedotjs",
  "python",
  "mongodb",
  "firebase",
  "graphql",
  "c",
  "csharp",
];

// Tools, DevOps & Others
const toolsSlugs = [
  "git",
  "docker",
  "amazonaws",
  "linux",
  "figma",
  "postman",
  "cypress",
  "rabbitmq",
];

export function FrontendIconCloud() {
  const images = frontendSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-6">
      <IconCloud images={images} className="size-[280px] sm:size-[320px]" />
    </div>
  );
}

export function BackendIconCloud() {
  const images = backendSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-6">
      <IconCloud images={images} className="size-[280px] sm:size-[320px]" />
    </div>
  );
}

export function ToolsIconCloud() {
  const images = toolsSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-6">
      <IconCloud images={images} className="size-[280px] sm:size-[320px]" />
    </div>
  );
}

// Legacy export for backwards compatibility
export function IconCloudDemo() {
  const allSlugs = [...frontendSlugs, ...backendSlugs, ...toolsSlugs];
  const images = allSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-4">
      <IconCloud images={images} className="size-[260px] sm:size-[300px]" />
    </div>
  );
}

export default IconCloudDemo;
