'use client';

export default function ContactForm() {
	// Placeholder for now - will need to integrate formspree or similar later
	return (
		<div className="max-w-2xl mx-auto rounded-md drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] bg-white p-5">
			<form>
				<input
					type="text"
					placeholder="Name *"
					name="name"
					required
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
				/>
				<input
					type="email"
					placeholder="Email *"
					name="email"
					required
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
				/>
				<input
					type="text"
					placeholder="Phone"
					name="phone"
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
				/>
				<input
					type="text"
					placeholder="Subject"
					name="subject"
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue"
				/>
				<textarea
					placeholder="Your Message *"
					name="message"
					required
					className="w-full px-4 py-3 text-sm mb-4 border border-lwhite rounded-md focus:outline-dblue resize-none"
				></textarea>
				<button
					type="submit"
					className="bg-lred text-lwhite py-3 px-6 rounded-md text-base font-semibold transition duration-300 uppercase drop-shadow-[1px_1px_20px_rgba(0,0,0,0.2)] hover:drop-shadow-[1px_1px_20px_rgba(0,0,0,0.5)] ease-out w-full"
				>
					Submit
				</button>
			</form>
		</div>
	);
}

