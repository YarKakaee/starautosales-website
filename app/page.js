'use client';

import { useEffect } from 'react';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Hero from './components/Hero';
import WeeklySpecial from './components/WeeklySpecial';
import NewArrivals from './components/NewArrivals';

export default function Home() {
	useEffect(() => {
		// Handle hash navigation on page load
		const hash = window.location.hash;
		if (hash === '#about' || hash === '#contact') {
			// Wait for page to fully render, especially when navigating from another page
			const scrollToSection = (retries = 0) => {
				const section = document.getElementById(hash.substring(1));
				if (section) {
					// Use multiple requestAnimationFrame calls to ensure layout is complete
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							// Get the position after all layouts are complete
							const rect = section.getBoundingClientRect();
							const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
							const offsetTop = rect.top + scrollTop - 80; // Account for fixed navbar
							
							window.scrollTo({
								top: offsetTop,
								behavior: 'smooth',
							});
						});
					});
				} else if (retries < 10) {
					// Retry if section not found yet (for slow page loads)
					setTimeout(() => scrollToSection(retries + 1), 100);
				}
			};

			// Wait a bit longer when navigating from another page
			setTimeout(() => {
				scrollToSection();
			}, 300);
		}
	}, []);

	return (
		<main>
			<Hero />
			<WeeklySpecial />
			<NewArrivals />
			<AboutUs />
			<ContactUs />
		</main>
	);
}
