'use client';

import { useEffect, useState } from 'react';

export default function TermsAndConditions() {
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
							Terms and Conditions
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
								Please read these Terms and Conditions ("Terms", "Terms and
								Conditions") carefully before using the Star Auto Sales website
								(the "Service") operated by Star Auto Sales ("us", "we", or
								"our").
							</p>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Agreement to Terms
								</h2>
								<p>
									By accessing or using the Service, you agree to be bound by
									these Terms. If you disagree with any part of the Terms, then
									you may not access the Service.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Intellectual Property
								</h2>
								<p>
									The Service and its original content, features, and
									functionality are owned by Star Auto Sales and are protected by
									international copyright, trademark, patent, trade secret, and
									other intellectual property or proprietary rights laws.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Disclaimer
								</h2>
								<p>
									The Service is provided on an "as is" and "as available" basis
									without any warranties, expressed or implied. Star Auto Sales
									does not warrant that the Service will be uninterrupted,
									timely, secure, or error-free.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Limitation of Liability
								</h2>
								<p className="mb-4">
									In no event shall Star Auto Sales be liable for any indirect,
									incidental, special, consequential, or punitive damages,
									including without limitation, loss of profits, data, use,
									goodwill, or other intangible losses, resulting from:
								</p>
								<ul className="list-disc list-inside space-y-2 ml-4">
									<li>The use or inability to use the Service</li>
									<li>
										Any conduct or content of any third-party on the Service
									</li>
									<li>
										Unauthorized access, use, or alteration of your
										transmissions or content
									</li>
									<li>Any other matter relating to the Service</li>
								</ul>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Links to Other Websites
								</h2>
								<p>
									Our Service may contain links to third-party websites or
									services that are not owned or controlled by Star Auto Sales.
									We have no control over and assume no responsibility for the
									content, privacy policies, or practices of any third-party
									websites or services.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Governing Law
								</h2>
								<p>
									These Terms shall be governed and construed in accordance with
									the laws of Ontario, without regard to its conflict of law
									provisions.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Changes to Terms and Conditions
								</h2>
								<p>
									We reserve the right, at our sole discretion, to modify or
									replace these Terms at any time. If a revision is material, we
									will try to provide at least 30 days' notice prior to any new
									terms taking effect. What constitutes a material change will
									be determined at our sole discretion.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-bold text-dblue mb-4 mt-12">
									Contact Us
								</h2>
								<p className="mb-4">
									If you have any questions or suggestions about our Terms and
									Conditions, please contact us:
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

