'use client';

import { useState } from 'react';

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		// TODO: Integrate form submission (Formspree, EmailJS, etc.)
		setTimeout(() => {
			setIsSubmitting(false);
			alert('Thank you for your message! We will get back to you soon.');
			e.target.reset();
		}, 1000);
	};

	return (
		<div className="bg-white border border-gray-200 rounded-lg p-8 lg:p-10 shadow-sm">
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
				<input
					type="text"
					placeholder="Name *"
					name="name"
					required
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-dblue focus:border-transparent transition-all duration-300 bg-white"
				/>
				</div>
				<div>
				<input
					type="email"
					placeholder="Email *"
					name="email"
					required
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-dblue focus:border-transparent transition-all duration-300 bg-white"
				/>
				</div>
				<div>
				<input
						type="tel"
					placeholder="Phone"
					name="phone"
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-dblue focus:border-transparent transition-all duration-300 bg-white"
				/>
				</div>
				<div>
				<input
					type="text"
					placeholder="Subject"
					name="subject"
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-dblue focus:border-transparent transition-all duration-300 bg-white"
				/>
				</div>
				<div>
				<textarea
					placeholder="Your Message *"
					name="message"
						rows={6}
					required
						className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-dblue focus:border-transparent transition-all duration-300 resize-none bg-white"
				></textarea>
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-lred text-white py-3 px-6 rounded-md text-base font-medium transition-all duration-300 hover:bg-lred/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		</div>
	);
}
