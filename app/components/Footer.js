'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 p-14 pb-16 bg-dblue text-lwhite">
			<div className="flex flex-wrap justify-between text-center sm:text-start">
				<div className="w-full sm:w-1/2 md:w-auto mb-8 md:mb-0">
					<h2 className="text-xl font-bold mb-6">Quick Links</h2>
					<ul className="list-none flex flex-col items-center sm:items-start gap-4">
						<Link href={'/about'}>
							<li className="relative group">
								<h3 className="font-normal duration-300">
									About Us
								</h3>
								<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
							</li>
						</Link>
						<Link href={'/contact'}>
							<li className="relative group">
								<h3 className="font-normal duration-300">
									Contact Us
								</h3>
								<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
							</li>
						</Link>
						<Link href={'/vehicles'}>
							<li className="relative group">
								<h3 className="font-normal duration-300">
									Explore our Inventory
								</h3>
								<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
							</li>
						</Link>
					</ul>
				</div>
				<div className="w-full sm:w-1/2 md:w-auto mb-8 md:mb-0">
					<h2 className="text-xl font-bold mb-6">Reach Us</h2>
					<ul className="list-none flex flex-col items-center sm:items-start gap-4">
						<li className="relative group">
							<h3 className="font-normal duration-300">
								(519) 701-2378
							</h3>
							<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0"></div>
						</li>
						<li className="relative group">
							<h3 className="font-normal duration-300">
								starautosalesinfo@gmail.com
							</h3>
							<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0"></div>
						</li>
						<li className="relative group">
							<h3 className="font-normal duration-300">
								2271 Dundas Street, London, ON
							</h3>
							<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0"></div>
						</li>
					</ul>
				</div>
				<div className="w-full sm:w-1/2 md:w-auto mb-8 md:mb-0">
					<h2 className="text-xl font-bold mb-6">Legal</h2>
					<ul className="list-none flex flex-col items-center sm:items-start gap-4">
						<Link href={'/legal/privacy'}>
							<li className="relative group">
								<h3 className="font-normal duration-300">
									Privacy Policy
								</h3>
								<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
							</li>
						</Link>
						<Link href={'/legal/terms'}>
							<li className="relative group">
								<h3 className="font-normal duration-300">
									Terms & Conditions
								</h3>
								<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
							</li>
						</Link>
						<Link href={'/legal/accessibility'}>
							<li className="relative group">
								<h3 className="font-normal duration-300">
									Accessibility Statement
								</h3>
								<div className="absolute w-full bg-lwhite h-0.5 top-6 left-0 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
							</li>
						</Link>
					</ul>
				</div>
				<div className="w-full sm:w-1/2 md:w-auto items-center flex flex-col">
					<Image
						width={225}
						height={225}
						className="-mt-5"
						src="/assets/logo.png"
						alt="logo"
					/>
					<p className="text-sm font-normal mb-2 text-center">
						© 2025 | All Rights Reserved
					</p>
					<p className="text-sm font-bold text-center">
						<Link href="https://www.linkedin.com/in/yar-kakaee/">
							Developed by Yar Kakaee
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}

