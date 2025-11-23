'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaPhone } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

export default function Navbar() {
	const currentPath = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [bannerVisible, setBannerVisible] = useState(false);
	const [bannerHeight, setBannerHeight] = useState(0);
	const bannerRef = useRef(null);

	useEffect(() => {
		// Check if banner was previously dismissed
		const bannerDismissed = localStorage.getItem('bannerDismissed');
		if (!bannerDismissed) {
			setBannerVisible(true);
		}
	}, []);

	useEffect(() => {
		// Measure banner height when it becomes visible
		if (bannerVisible && bannerRef.current) {
			// Use ResizeObserver for accurate measurement
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const height = entry.contentRect.height;
					setBannerHeight(height);
				}
			});

			resizeObserver.observe(bannerRef.current);

			// Also measure immediately with requestAnimationFrame for accurate measurement
			requestAnimationFrame(() => {
				if (bannerRef.current) {
					const height =
						bannerRef.current.getBoundingClientRect().height;
					if (height > 0) {
						setBannerHeight(height);
					}
				}
			});

			return () => {
				resizeObserver.disconnect();
			};
		} else {
			setBannerHeight(0);
		}
	}, [bannerVisible]);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleBannerDismiss = () => {
		setBannerVisible(false);
		localStorage.setItem('bannerDismissed', 'true');
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const handleAboutClick = (e) => {
		e.preventDefault();
		if (currentPath === '/') {
			// Smooth scroll to about section on homepage
			const aboutSection = document.getElementById('about');
			if (aboutSection) {
				const navbarOffset = 80; // Navbar height
				const bannerOffset = bannerHeight; // Banner height when visible
				const offsetTop =
					aboutSection.offsetTop - navbarOffset - bannerOffset;
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth',
				});
			}
		} else {
			// Navigate to homepage with hash
			window.location.href = '/#about';
		}
		setMenuOpen(false);
	};

	const handleContactClick = (e) => {
		e.preventDefault();
		if (currentPath === '/') {
			// Smooth scroll to contact section on homepage
			const contactSection = document.getElementById('contact');
			if (contactSection) {
				const navbarOffset = 80; // Navbar height
				const bannerOffset = bannerHeight; // Banner height when visible
				const offsetTop =
					contactSection.offsetTop - navbarOffset - bannerOffset;
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth',
				});
			}
		} else {
			// Navigate to homepage with hash
			window.location.href = '/#contact';
		}
		setMenuOpen(false);
	};

	const navLinks = [
		{ href: '/vehicles', label: 'Inventory' },
		{ href: '/#about', label: 'About', onClick: handleAboutClick },
		{ href: '/#contact', label: 'Contact', onClick: handleContactClick },
	];

	return (
		<>
			{/* Announcement Banner */}
			{bannerVisible && (
				<div
					ref={bannerRef}
					className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-black via-gray-900 to-black text-white m-0 p-0"
				>
					<div className="max-w-7xl mx-auto px-6 lg:px-8 m-0">
						<div className="flex items-center justify-center py-3 relative m-0">
							<p className="text-sm font-medium text-center px-8">
								<span className="font-semibold">🎉 New:</span>{' '}
								Financing now available on select cars!
							</p>
							<button
								onClick={handleBannerDismiss}
								className="absolute right-0 p-1.5 rounded-md hover:bg-white/20 transition-colors text-white/90"
								aria-label="Dismiss banner"
							>
								<FaX className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			)}

			<nav
				style={{
					top:
						bannerVisible && bannerHeight > 0
							? `${bannerHeight}px`
							: bannerVisible
							? '48px'
							: '0px',
					transition: 'background-color 0.5s, box-shadow 0.5s',
				}}
				className={`fixed left-0 right-0 z-50 ${
					scrolled ? 'bg-white shadow-md' : 'bg-transparent'
				}`}
			>
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<Link href="/" className="flex items-center group">
							<div className="relative transition-transform duration-300 group-hover:scale-105">
								<Image
									width={140}
									height={140}
									src="/assets/logo.png"
									alt="Star Auto Sales"
									className={`w-auto h-18 object-contain transition-opacity ${
										scrolled ? 'opacity-100' : 'opacity-100'
									}`}
									priority
								/>
							</div>
						</Link>

						{/* Desktop Navigation - More Spaced, Less Tech-y */}
						<ul className="hidden md:flex items-center space-x-8">
							{navLinks.map((link) => {
								return (
									<li key={link.href}>
										<Link
											href={link.href}
											onClick={link.onClick}
											className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
												scrolled
													? 'text-gray-700 hover:text-dblue'
													: 'text-white/90 hover:text-white'
											}`}
										>
											{link.label}
										</Link>
									</li>
								);
							})}
							{/* Phone Number */}
							<a
								href="tel:+15197012378"
								className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
									scrolled
										? 'bg-lred text-white hover:bg-lred/90'
										: 'bg-white/5 backdrop-blur-sm border border-white/20 text-white/90 hover:bg-white/10'
								}`}
							>
								<FaPhone className="w-3.5 h-3.5 scale-x-[-1]" />
								(519) 701-2378
							</a>
						</ul>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleMenu}
							className={`md:hidden p-2 rounded-lg transition-colors ${
								scrolled
									? 'text-dblue hover:bg-gray-100'
									: 'text-white hover:bg-white/10'
							}`}
							aria-label="Toggle menu"
						>
							{menuOpen ? (
								<svg
									className="w-6 h-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg
									className="w-6 h-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{menuOpen && (
					<div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
						<div className="px-6 py-4 space-y-1">
							{navLinks.map((link) => {
								return (
									<Link
										key={link.href}
										href={link.href}
										onClick={
											link.onClick ||
											(() => setMenuOpen(false))
										}
										className="block px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer text-gray-700 hover:bg-gray-50"
									>
										{link.label}
									</Link>
								);
							})}
							<a
								href="tel:+15197012378"
								className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg text-base font-semibold bg-lred text-white"
							>
								<FaPhone className="w-4 h-4 scale-x-[-1]" />
								(519) 701-2378
							</a>
						</div>
					</div>
				)}
			</nav>
		</>
	);
}
