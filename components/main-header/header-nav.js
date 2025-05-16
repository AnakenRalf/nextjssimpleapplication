'use client';

import Link from "next/link";
import Image from "next/image";


import logoImage from '@/assets/logo.png'
import styles from "./header-nav.module.css"
import MainHeaderBackground from "./main-header-background";
import { usePathname } from "next/navigation";
import NavLink from "./nav-link";

export default function HeaderNav() {
    const path = usePathname();

    return <>
    <MainHeaderBackground />
    <header className={styles.header}>
        <Link className={styles.logo} href="/">
            <Image src={logoImage} alt="A plate with food" priority />
            NextLevel Food App
        </Link>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink href="/meals">Brows Meals</NavLink>                    
                </li>
                <li>
                    <NavLink href="/community">Foof Community</NavLink>
                </li>
            </ul>
           
        </nav>
    </header>
    </>
}