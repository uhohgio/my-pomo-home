"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavButton() {
	const pathname = usePathname();
	const onDesignspace = pathname?.startsWith("/designspace");

	const href = onDesignspace ? "/workspace" : "/designspace";
	const label = onDesignspace ? "Go to Workspace" : "Go to Designspace";

	return (
		<Link href={href} className="page-swap-btn flex">
			{label}
		</Link>
	);
}
