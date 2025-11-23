import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Hero from './components/Hero';
import NewArrivals from './components/NewArrivals';

export default function Home() {
	return (
		<main>
			<Hero />
			<NewArrivals />
			<AboutUs />
			<ContactUs />
		</main>
	);
}
