"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between gap-10">
          <div className="space-y-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-3xl font-bold text-teal-400 font-heading"
            >
              <span>Contact Me !</span>
              <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <p className="max-w-xs text-sm text-slate-400">
              Got a project in mind? Let's build something amazing together !
            </p>
          </div>

          <div className="flex items-start gap-10">
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-1 text-sm font-medium text-slate-200 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pt-1">
              <a
                href="https://github.com/cwsquentin"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition hover:scale-110 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/quentin-petiteville/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition hover:scale-110 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
