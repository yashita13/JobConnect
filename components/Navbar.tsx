"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName ?? user.email ?? "User");
            }
        });

        return () => unsubscribe();
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Interviews", href: "/interview" },
        { name: "Logout", href: "/logout", className: "text-red-400" },
    ];

    return (
        <>
            <nav className="w-full px-4 sm:px-6 md:px-12 py-4 flex justify-between items-center text-white shadow-md relative z-50 bg-[#0f0f0f]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-3xl font-extrabold text-purple-400">
                    <Image src="/logo.svg" alt="Logo" width={38} height={32} />
                    <span className="text-xl sm:text-2xl md:text-3xl text-primary-100">JobConnect</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-6 text-base font-medium">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className={`hover:text-purple-300 transition ${link.className || ""}`}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(true)} aria-label="Open menu">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Sidebar for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-64 h-full bg-[#1a1a1a] shadow-lg z-50 flex flex-col p-6 space-y-6"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-white text-lg font-bold">Menu</span>
                            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-4 mt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-white text-lg hover:text-purple-400 ${link.className || ""}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
