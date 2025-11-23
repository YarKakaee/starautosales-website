'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
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
						mounted
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-10'
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
						We would love to hear from you! Fill out the form below
						to get in touch.
					</p>
				</div>

				{/* Main Content Container - Consistent Width */}
				<div className="max-w-6xl mx-auto">
					{/* Contact Information Cards */}
					<div
						className={`mb-12 transition-all duration-1000 ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: '100ms' }}
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Address */}
							<div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
								<div className="w-12 h-12 bg-dblue/10 rounded-full flex items-center justify-center mb-4">
									<FaMapMarkerAlt className="w-6 h-6 text-dblue" />
								</div>
								<h3 className="font-semibold text-dblue mb-2">
									Address
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed">
									2271 Dundas Street
									<br />
									London, ON
								</p>
							</div>

							{/* Email */}
							<div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
								<div className="w-12 h-12 bg-dblue/10 rounded-full flex items-center justify-center mb-4">
									<FaEnvelope className="w-6 h-6 text-dblue" />
								</div>
								<h3 className="font-semibold text-dblue mb-2">
									Email
								</h3>
								<a
									href="mailto:starautosalesinfo@gmail.com"
									className="text-gray-600 text-sm hover:text-dblue transition-colors break-all"
								>
									starautosalesinfo@gmail.com
								</a>
							</div>

							{/* Phone */}
							<div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
								<div className="w-12 h-12 bg-dblue/10 rounded-full flex items-center justify-center mb-4">
									<FaPhone className="w-6 h-6 text-dblue scale-x-[-1]" />
								</div>
								<h3 className="font-semibold text-dblue mb-2">
									Phone
								</h3>
								<a
									href="tel:+15197012378"
									className="text-gray-600 text-sm hover:text-dblue transition-colors"
								>
									(519) 701-2378
								</a>
							</div>
						</div>
					</div>

					{/* Map and Form Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
						{/* Google Maps */}
						<div
							className={`transition-all duration-1000 h-full ${
								mounted
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-10'
							}`}
							style={{ transitionDelay: '200ms' }}
						>
							<div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg h-full">
								<div className="relative w-full h-full min-h-[500px] lg:min-h-0">
									<iframe
										src="https://www.google.com/maps?q=2271+Dundas+Street,+London,+ON&output=embed&hl=en"
										width="100%"
										height="100%"
										style={{
											border: 0,
										}}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										title="Star Auto Sales Location - 2271 Dundas Street, London, ON"
										className="w-full h-full absolute inset-0"
									/>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<div
							className={`transition-all duration-1000 ${
								mounted
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-10'
							}`}
							style={{ transitionDelay: '300ms' }}
						>
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
