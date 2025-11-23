'use client';

import Image from 'next/image';

export default function AboutUs() {
	return (
		<section className="px-4 sm:px-6 md:px-24 lg:px-32 xl:px-48 2xl:px-64 p-14 pb-20 bg-dblue text-lwhite drop-shadow-[0px_6px_11px_rgba(0,0,0,0.5)]">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl mt-5 mb-6 md:my-4 font-bold 2xl:text-4xl">
						Welcome to
					</h1>
					<h1 className="text-4xl mb-10 md:mt-6 font-black 2xl:text-5xl">
						Star Auto Sales!
					</h1>
					<p className="text-base font-light">
						We are dedicated to providing exceptional pre-owned cars
						and outstanding customer service.
					</p>
				</div>
				<div className="mt-12 max-w-3xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
					<div className="flex flex-col">
						<div className="flex-shrink-0">
							<Image
								className="h-48 w-full object-cover rounded-md"
								src="/assets/abus1.png"
								alt="About Us Image 1"
								width={500}
								height={200}
							/>
						</div>
						<div className="mt-7">
							<h3 className="text-lg font-semibold text-center">
								Quality Selection
							</h3>
							<p className="mt-3 text-base font-light text-center">
								Our inventory consists of carefully selected
								pre-owned vehicles that meet our high standards
								for quality and reliability.
							</p>
						</div>
					</div>
					<div className="flex flex-col">
						<div className="flex-shrink-0">
							<Image
								className="h-48 w-full object-cover rounded-md"
								src="/assets/abus2.png"
								alt="About Us Image 2"
								width={500}
								height={200}
							/>
						</div>
						<div className="mt-7">
							<h3 className="text-lg font-semibold text-center">
								Exceptional Service
							</h3>
							<p className="mt-3 text-base font-light text-center">
								Our knowledgeable and friendly team is dedicated
								to providing you with a seamless car-buying
								experience.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

