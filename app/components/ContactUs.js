'use client';

import ContactForm from './ContactForm';

export default function ContactUs() {
	return (
		<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 p-14 pb-20 bg-lwhite text-dblue">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h2 className="text-center text-4xl mb-8 sm:text-4xl md:text-5xl font-black">
						Contact Us
					</h2>
					<p className="text-lg">
						We would love to hear from you! Fill out the form below
						to get in touch.
					</p>
				</div>
				<div className="mt-12 mx-auto">
					<ContactForm />
				</div>
			</div>
		</section>
	);
}

