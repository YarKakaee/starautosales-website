'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	view,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	const handlePageChange = (pageNumber) => {
		onPageChange(pageNumber);

		if (view === 'admin')
			window.scrollTo({ top: 0, behavior: 'smooth' });
		else window.scrollTo({ top: 880, behavior: 'smooth' });
	};

	return (
		<div className="mx-auto lg:mx-0 flex items-center justify-between">
			<div className="flex flex-1 items-center justify-between">
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md drop-shadow-lg"
						aria-label="Pagination"
					>
						<button
							className={`rounded-l-md relative items-center px-4 py-3 text-sm font-semibold text-dblue bg-white transition ring-inset ring-1 ring-lwhite ease-out ${
								currentPage === 1
									? 'opacity-50'
									: 'cursor-pointer hover:bg-lwhite'
							}`}
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}
						>
							<ChevronLeftIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</button>
						{pageNumbers.map((pageNumber) => (
							<button
								key={pageNumber}
								className={`relative items-center px-5 py-3 text-sm font-semibold transition ring-inset ring-1 ring-lwhite ease-out cursor-pointer ${
									pageNumber === currentPage
										? 'bg-dblue text-lwhite'
										: 'bg-white text-dblue hover:bg-lwhite'
								}`}
								onClick={() => handlePageChange(pageNumber)}
							>
								{pageNumber}
							</button>
						))}
						<button
							className={`rounded-r-md relative items-center px-4 py-3 text-sm font-semibold text-dblue bg-white transition ring-inset ring-1 ring-lwhite ease-out ${
								currentPage === totalPages
									? 'opacity-50'
									: 'cursor-pointer hover:bg-lwhite'
							}`}
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
						>
							<ChevronRightIcon
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
}

