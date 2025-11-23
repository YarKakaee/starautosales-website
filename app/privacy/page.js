'use client';

import { useEffect, useState } from 'react';

export default function PrivacyPolicy() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Header */}
			<section className="pt-32 pb-16 bg-dblue text-white relative overflow-hidden">
				{/* Gradient overlays */}
				<div className="absolute inset-0 bg-gradient-to-b from-dblue via-dblue to-dblue/95" />
				<div className="absolute inset-0 bg-gradient-to-r from-dblue/90 via-transparent to-dblue/80" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1),transparent_70%)]" />

				<div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
					<div
						className={`transition-all duration-1000 ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
							Privacy Policy
						</h1>
						<p className="text-lg text-white/80">
							Last updated: {new Date().toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					</div>
				</div>
				{/* Curved transition */}
				<div className="absolute bottom-0 left-0 right-0 h-12">
					<svg
						className="absolute bottom-0 w-full h-full"
						viewBox="0 0 1440 120"
						preserveAspectRatio="none"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z"
							fill="white"
						/>
					</svg>
				</div>
			</section>

			{/* Content */}
			<section className="py-16 bg-white">
				<div className="max-w-4xl mx-auto px-6 lg:px-8">
					<div
						className={`prose prose-lg max-w-none transition-all duration-1000 ${
							mounted
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: '200ms' }}
					>
						<div className="space-y-8 text-gray-700 leading-relaxed">
							<p className="text-lg">
								At Star Auto Sales, we are committed to protecting the privacy
								and security of our customers' personal information. This Privacy
								Policy outlines how we collect, use, disclose, and protect the
								information you provide to us through our website, services, and
								interactions. By using our website and services, you consent to
								the practices described in this policy.
							</p>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Information We Collect
								</h2>
								<p className="mb-4">
									We may collect personal information from you when you visit our
									website, fill out forms, make purchases, contact our customer
									support, or engage in other activities on our site. The types
									of personal information we may collect include:
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>Contact information (e.g., name, email address, phone number)</li>
									<li>Demographic information (e.g., age, gender)</li>
									<li>Vehicle preferences and purchase history</li>
									<li>Payment information</li>
									<li>Other information you provide to us voluntarily</li>
								</ul>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									How We Use Your Information
								</h2>
								<p className="mb-4">
									We may use the information we collect from you for various
									purposes, including:
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>Providing and personalizing our services</li>
									<li>Processing and fulfilling your orders</li>
									<li>Improving our website and services</li>
									<li>
										Communicating with you, including responding to your
										inquiries and providing customer support
									</li>
									<li>
										Sending promotional emails and newsletters (you may opt-out
										at any time)
									</li>
									<li>Conducting research and analysis</li>
									<li>Complying with legal obligations</li>
								</ul>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Information Sharing and Disclosure
								</h2>
								<p className="mb-4">
									We may share your personal information with third parties in
									the following situations:
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>With your consent</li>
									<li>
										With service providers who help us with our business
										operations (e.g., payment processors, shipping companies)
									</li>
									<li>
										To comply with applicable laws, regulations, or legal
										processes
									</li>
									<li>
										To protect our rights, property, or safety, and that of our
										users and others
									</li>
									<li>
										In connection with a business transaction, such as a merger,
										acquisition, or sale of assets
									</li>
								</ul>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Data Security
								</h2>
								<p>
									We take reasonable measures to protect the confidentiality,
									integrity, and security of your personal information. However,
									please note that no method of transmission over the internet or
									electronic storage is completely secure, and we cannot
									guarantee absolute security.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Your Rights and Choices
								</h2>
								<p>
									You have the right to access, update, and correct your personal
									information. You may also have the right to request the
									deletion of your personal information or object to its
									processing. To exercise these rights, please contact us using
									the contact information provided below.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Changes to This Privacy Policy
								</h2>
								<p>
									We may update this Privacy Policy from time to time to reflect
									changes in our practices or applicable laws. We encourage you
									to review this page periodically for any updates.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Contact Us
								</h2>
								<p className="mb-4">
									If you have any questions or concerns about this Privacy
									Policy or our privacy practices, please contact us:
								</p>
								<div className="space-y-2">
									<p>
										<strong>Email:</strong>{' '}
										<a
											href="mailto:starautosalesinfo@gmail.com"
											className="text-dblue hover:text-dblue/80 transition-colors"
										>
											starautosalesinfo@gmail.com
										</a>
									</p>
									<p>
										<strong>Phone:</strong>{' '}
										<a
											href="tel:+15197012378"
											className="text-dblue hover:text-dblue/80 transition-colors"
										>
											(519) 701-2378
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

