'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function WeeklySpecial() {
	const [car, setCar] = useState(null);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const sectionRef = useRef(null);

	useEffect(() => {
		async function fetchWeeklySpecial() {
			try {
				const response = await axios.get('/api/findWeeklySpecial');
				setCar(response.data.car);
			} catch (error) {
				console.error('Error fetching weekly special:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchWeeklySpecial();
	}, []);

	useEffect(() => {
		if (!sectionRef.current || loading || !car) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.05 },
		);
		observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, [loading, car]);

	if (loading || !car || !car.image1) return null;

	const specs = [
		`${car.mileage.toLocaleString()} km`,
		car.transmission,
		car.fuel,
	].filter(Boolean);

	return (
		<section
			ref={sectionRef}
			className="relative overflow-hidden bg-[#060608]"
		>
			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 md:pt-32 pb-20 md:pb-28">
				{/* Label */}
				<div
					className={`text-center mb-10 md:mb-14 transition-all duration-700 ease-out ${
						visible
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-3'
					}`}
				>
					<div className="flex items-center justify-center gap-4 mb-3">
						<div className="w-8 h-px bg-white/[0.12]" />
						<p className="text-[14px] font-medium tracking-[0.3em] uppercase text-white/40">
							Weekly Special
						</p>
						<div className="w-8 h-px bg-white/[0.12]" />
					</div>
				</div>

				{/* Image with underglow */}
				<Link
					href={`/vehicles/${car.listingId}`}
					className={`group/img relative block cursor-pointer transition-all duration-[1.4s] ease-out ${
						visible
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-[0.97]'
					}`}
					style={{ transitionDelay: '150ms' }}
				>
					{/* White underglow — intensifies on hover */}
					<div
						className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[80%] h-[120px] pointer-events-none transition-all duration-700 ease-out group-hover/img:h-[160px] group-hover/img:w-[85%]"
						style={{
							background:
								'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)',
							filter: 'blur(40px)',
						}}
					/>
					<div
						className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[60%] h-[80px] pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 ease-out"
						style={{
							background:
								'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
							filter: 'blur(50px)',
						}}
					/>

					<div className="relative w-full aspect-[16/9] md:aspect-[2.2/1] rounded-2xl md:rounded-3xl overflow-hidden">
						<Image
							src={car.image1}
							alt={`${car.year} ${car.make} ${car.model}`}
							fill
							className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
							priority
							quality={90}
						/>

						{/* Subtle bottom vignette */}
						<div
							className="absolute inset-0"
							style={{
								background:
									'linear-gradient(to top, rgba(6,6,8,0.05) 0%, transparent 40%)',
							}}
						/>
					</div>
				</Link>

				{/* Info */}
				<div
					className={`mt-10 md:mt-14 transition-all duration-700 ease-out ${
						visible
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-6'
					}`}
					style={{ transitionDelay: '400ms' }}
				>
					{/* Desktop */}
					<div className="hidden md:flex items-end justify-between gap-8">
						<div className="min-w-0">
							<h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
								{car.year} {car.make}{' '}
								<span className="font-light text-white/45">
									{car.model}
								</span>
							</h2>
						</div>

						<div className="flex items-center gap-3 text-[13px] text-white/30 font-light shrink-0">
							{specs.map((spec, i) => (
								<span
									key={spec}
									className="flex items-center gap-3"
								>
									{i > 0 && (
										<span className="w-px h-3 bg-white/[0.08]" />
									)}
									<span>{spec}</span>
								</span>
							))}
						</div>

						<div className="flex items-center gap-8 shrink-0">
							<p className="text-3xl lg:text-4xl font-semibold text-white tracking-tight">
								${car.price.toLocaleString()}
								<span className="text-sm font-normal text-white/20 ml-1.5">
									+HST
								</span>
							</p>
							<Link
								href={`/vehicles/${car.listingId}`}
								className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.12] text-sm font-medium text-white/80 hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300"
							>
								View
								<svg
									className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
						</div>
					</div>

					{/* Mobile */}
					<div className="md:hidden space-y-5">
						<h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
							{car.year} {car.make}{' '}
							<span className="font-light text-white/45">
								{car.model}
							</span>
						</h2>

						<div className="flex items-center gap-3 text-[13px] text-white/30 font-light">
							{specs.map((spec, i) => (
								<span
									key={spec}
									className="flex items-center gap-3"
								>
									{i > 0 && (
										<span className="w-px h-3 bg-white/[0.08]" />
									)}
									<span>{spec}</span>
								</span>
							))}
						</div>

						<div className="flex items-center justify-between">
							<p className="text-3xl font-semibold text-white tracking-tight">
								${car.price.toLocaleString()}
								<span className="text-sm font-normal text-white/20 ml-1.5">
									+HST
								</span>
							</p>
							<Link
								href={`/vehicles/${car.listingId}`}
								className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.12] text-sm font-medium text-white/80 hover:text-white hover:border-white/25 transition-all duration-300"
							>
								View
								<svg
									className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
