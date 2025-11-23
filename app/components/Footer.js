'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-dblue text-white py-8 border-t border-white/10">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="relative flex flex-col md:flex-row items-center gap-6">
					{/* Powered by Asterra - Left */}
					<a
						href="https://asterra.ca"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 order-3 md:order-1 md:flex-1 md:justify-start"
					>
						<Image
							src="/assets/asterra.png"
							alt="Asterra"
							width={568}
							height={89}
							className="h-7 w-auto transition-opacity duration-200 hover:opacity-80"
						/>
					</a>

					{/* Copyright - Middle - Always Centered */}
					<div className="text-sm text-white/60 order-1 md:order-2 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
						<p>© 2025 Star Auto Sales. All rights reserved.</p>
					</div>

					{/* Privacy & Terms - Right */}
					<div className="flex items-center gap-4 text-sm order-2 md:order-3 md:flex-1 md:justify-end">
						<Link
							href="/privacy"
							className="text-white/60 hover:text-white transition-colors duration-300"
						>
							Privacy Policy
						</Link>

						<Link
							href="/terms"
							className="text-white/60 hover:text-white transition-colors duration-300"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
