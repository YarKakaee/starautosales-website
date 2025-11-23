'use client';

import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactUs() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section id="contact" className="py-32 bg-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div
					className={`text-center mb-16 transition-all duration-1000 ${
						mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
					}`}
				>
					<p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
						Get in Touch
					</p>
					<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dblue mb-4">
						Contact Us
					</h2>
					<div className="w-24 h-0.5 bg-dblue mx-auto mb-6" />
					<p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed font-light">
						We would love to hear from you! Fill out the form below to get in
						touch.
					</p>
				</div>

				{/* Contact Form */}
				<div
					className={`max-w-2xl mx-auto transition-all duration-1000 ${
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-10'
					}`}
					style={{ transitionDelay: '200ms' }}
				>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
