'use client';
import {
  HomeIcon,
} from 'lucide-react';
import Link from 'next/link';

const links = [
    {
        name: 'Home',
        ref: '/',
        icon: HomeIcon,
    },
];

export default function SideNav() {
    return (
        <div className="">
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href= {link.ref}
                        className=""
                        >
                            <LinkIcon className="w-6" />
                            <p className="hidden md:block">{Link.name}</p>
                        </Link>
                );
            })}
        </div>
    );
}
