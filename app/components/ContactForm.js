'use client';

import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
	const [state, handleSubmit] = useForm('mayzgavv');

	if (state.succeeded) {
		return (
			<div className="bg-white border border-gray-200 rounded-lg p-8 lg:p-10 shadow-sm">
				<p className="text-center text-lg sm:text-xl font-bold text-dblue">
					Thanks for reaching out!
				</p>
			</div>
		);
	}

	return (
		<div className="bg-white border border-gray-200 rounded-lg p-8 lg:p-10 shadow-sm">
			{state.submitting ? (
				<p className="text-center text-lg sm:text-xl font-bold text-dblue">
					Submitting...
				</p>
			) : (
				<div>
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<input
								type="text"
								placeholder="Name *"
								name="name"
								required
								className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-dblue focus:border-transparent transition-all duration-300 bg-white"
							/>
							<ValidationError
								prefix="Name"
								field="name"
								errors={state.errors}
								className="text-red-500 text-sm mt-1"
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
							<ValidationError
								prefix="Email"
								field="email"
								errors={state.errors}
								className="text-red-500 text-sm mt-1"
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
							<ValidationError
								prefix="Message"
								field="message"
								errors={state.errors}
								className="text-red-500 text-sm mt-1"
							/>
						</div>
						<button
							type="submit"
							disabled={state.submitting}
							className="w-full bg-lred text-white py-3 px-6 rounded-md text-base font-medium transition-all duration-300 hover:bg-lred/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							Send Message
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default ContactForm;
