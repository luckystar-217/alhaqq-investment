import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-investment.svg';
import calcImg from '../assets/calculator.svg';
import starterImg from '../assets/starter-plan.svg';
import growthImg from '../assets/growth-plan.svg';
import wealthImg from '../assets/wealth-plan.svg';
import diversificationImg from '../assets/advice-diversification.svg';
import riskImg from '../assets/advice-risk.svg';
import longtermImg from '../assets/advice-longterm.svg';
import familyImg from '../assets/family-plan.svg';
import halalImg from '../assets/halal-plan.svg';
import retirementImg from '../assets/retirement-plan.svg';

const plans = [
	{
		name: 'Starter',
		description:
			'Perfect for new investors. Low minimums, simple advice, and easy tracking.',
		features: [
			'No account fees',
			'Automated advice',
			'Flexible deposits',
		],
		min: 100,
		rate: 0.04,
		image: starterImg,
	},
	{
		name: 'Growth',
		description:
			'For growing portfolios. Diversified assets and tailored recommendations.',
		features: [
			'Personalized plans',
			'Portfolio rebalancing',
			'Priority support',
		],
		min: 1000,
		rate: 0.06,
		image: growthImg,
	},
	{
		name: 'Wealth',
		description:
			'Advanced strategies for serious investors. Dedicated advisor and premium tools.',
		features: [
			'Dedicated advisor',
			'Tax optimization',
			'Exclusive webinars',
		],
		min: 10000,
		rate: 0.08,
		image: wealthImg,
	},
	{
		name: 'Family',
		description:
			'Designed for families to invest together and reach shared goals.',
		features: [
			'Multiple account holders',
			'Family goal tracking',
			'Educational resources for kids',
		],
		min: 500,
		rate: 0.045,
		image: familyImg,
	},
	{
		name: 'Halal',
		description:
			'100% Shariah-compliant investments for ethical growth.',
		features: [
			'Certified halal assets',
			'Regular compliance audits',
			'Zakat calculator',
		],
		min: 250,
		rate: 0.042,
		image: halalImg,
	},
	{
		name: 'Retirement',
		description:
			'Secure your future with long-term, low-risk investments.',
		features: [
			'Tax-advantaged accounts',
			'Retirement goal tracking',
			'Automatic rebalancing',
		],
		min: 2000,
		rate: 0.055,
		image: retirementImg,
	},
];

function CryptoMarquee() {
	const [prices, setPrices] = useState([
		{ symbol: 'BTC', price: 'Loading...' },
		{ symbol: 'ETH', price: 'Loading...' },
		{ symbol: 'BNB', price: 'Loading...' },
		{ symbol: 'SOL', price: 'Loading...' },
	]);

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd'
		)
			.then((res) => res.json())
			.then((data) => {
				setPrices([
					{ symbol: 'BTC', price: `$${data.bitcoin.usd}` },
					{ symbol: 'ETH', price: `$${data.ethereum.usd}` },
					{ symbol: 'BNB', price: `$${data.binancecoin.usd}` },
					{ symbol: 'SOL', price: `$${data.solana.usd}` },
				]);
			});
	}, []);

	return (
		<div className="w-full bg-blue-100 dark:bg-gray-800 py-2 overflow-hidden">
			<div
				className="whitespace-nowrap animate-marquee text-blue-800 dark:text-blue-200 font-semibold"
				style={{ display: 'inline-block', minWidth: '100%' }}
				aria-label="Live crypto prices"
			>
				{prices.map((p) => `${p.symbol}: ${p.price}`).join('   |   ')}
			</div>
			<style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 18s linear infinite;
        }
      `}</style>
		</div>
	);
}

function AdvertBanner() {
	return (
		<div className="w-full bg-gradient-to-r from-yellow-200 via-pink-100 to-blue-100 dark:from-yellow-900 dark:via-pink-900 dark:to-blue-900 text-center py-3 mb-4 text-lg font-bold text-gray-800 dark:text-white shadow">
			🚀 Limited Time: Get a $25 bonus when you invest $500+ in your first month!{' '}
			<Link
				to="/register"
				className="underline text-blue-700 dark:text-blue-300 ml-2"
			>
				Sign up now
			</Link>
		</div>
	);
}

function InvestmentCalculator() {
	const [amount, setAmount] = useState(1000);
	const [years, setYears] = useState(5);
	const [plan, setPlan] = useState(plans[0]);
	const [result, setResult] = useState<number | null>(null);

	const calculate = () => {
		// Compound interest formula: A = P(1 + r)^t
		const final = amount * Math.pow(1 + plan.rate, years);
		setResult(Number(final.toFixed(2)));
	};

	return (
		<section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 my-8 max-w-xl mx-auto">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Investment Calculator
			</h2>
			<div className="flex flex-col gap-4">
				<label>
					Amount to invest ($):
					<input
						type="number"
						min={plan.min}
						className="ml-2 border rounded px-2 py-1"
						value={amount}
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
				</label>
				<label>
					Years:
					<input
						type="number"
						min={1}
						max={30}
						className="ml-2 border rounded px-2 py-1"
						value={years}
						onChange={(e) => setYears(Number(e.target.value))}
					/>
				</label>
				<label>
					Plan:
					<select
						className="ml-2 border rounded px-2 py-1"
						value={plan.name}
						onChange={(e) =>
							setPlan(plans.find((p) => p.name === e.target.value) || plans[0])
						}
					>
						{plans.map((p) => (
							<option key={p.name} value={p.name}>
								{p.name}
							</option>
						))}
					</select>
				</label>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					onClick={calculate}
				>
					Calculate
				</button>
				{result && (
					<div className="mt-4 text-center">
						<span className="text-lg font-semibold">
							Estimated Value: ${result}
						</span>
						<p className="text-sm text-gray-500">
							(Assumes annual compounding, no withdrawals)
						</p>
					</div>
				)}
			</div>
		</section>
	);
}

const Homepage: React.FC = () => (
	<main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start">
		<CryptoMarquee />
		<AdvertBanner />
		<header className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 py-12 px-4">
			<div className="flex-1">
				<h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800 dark:text-white">
					Welcome to Alhaqq Investment
				</h1>
				<p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-200">
					Grow your wealth with ethical, transparent, and smart investment plans.
					Start your journey today with expert advice and easy-to-use tools.
				</p>
				<div className="flex gap-4">
					<Link
						to="/register"
						className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
					>
						Get Started
					</Link>
					<Link
						to="/login"
						className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
					>
						Sign In
					</Link>
				</div>
			</div>
			<img
				src={heroImg}
				alt="Investment illustration"
				className="w-80 h-auto drop-shadow-xl"
			/>
		</header>

		<section className="w-full max-w-5xl mx-auto py-8 px-4">
			<h2 className="text-3xl font-bold text-center mb-8 text-blue-800 dark:text-white">
				Choose Your Investment Plan
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 flex flex-col items-center"
					>
						<img
							src={plan.image}
							alt={`${plan.name} plan illustration`}
							className="w-20 h-20 mb-4"
						/>
						<h3 className="text-xl font-bold mb-2">{plan.name}</h3>
						<p className="mb-2 text-gray-600 dark:text-gray-300">
							{plan.description}
						</p>
						<ul className="mb-4 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside">
							{plan.features.map((f) => (
								<li key={f}>{f}</li>
							))}
						</ul>
						<span className="font-semibold text-blue-700 dark:text-blue-300">
							Min: ${plan.min}
						</span>
						<span className="font-semibold text-green-700 dark:text-green-400">
							Est. Annual Return: {(plan.rate * 100).toFixed(1)}%
						</span>
					</div>
				))}
			</div>
		</section>

		<InvestmentCalculator />

		<section className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8 items-center">
			<img
				src={calcImg}
				alt="Calculator"
				className="w-40 h-40 md:order-2"
			/>
			<div className="flex-1">
				<h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-white">
					Why Use Our Calculator?
				</h2>
				<ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4">
					<li>
						See how your money can grow over time with different plans.
					</li>
					<li>
						Get personalized advice based on your goals and risk profile.
					</li>
					<li>Compare returns and make informed decisions.</li>
				</ul>
				<p className="text-gray-600 dark:text-gray-400">
					Ready to invest?{' '}
					<Link
						to="/register"
						className="text-blue-600 hover:underline"
					>
						Create an account
					</Link>{' '}
					and start building your wealth today!
				</p>
			</div>
		</section>

		<section className="w-full max-w-5xl mx-auto py-8 px-4">
			<h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-white">
				Investment Advice
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center">
					<img
						src={diversificationImg}
						alt="Diversification advice"
						className="w-16 h-16 mb-2"
					/>
					<h4 className="font-semibold mb-1">Diversify Your Portfolio</h4>
					<p className="text-sm text-gray-600 dark:text-gray-300 text-center">
						Spread your investments across different assets to reduce risk.
					</p>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center">
					<img src={riskImg} alt="Risk advice" className="w-16 h-16 mb-2" />
					<h4 className="font-semibold mb-1">Understand Your Risk</h4>
					<p className="text-sm text-gray-600 dark:text-gray-300 text-center">
						Choose plans that match your risk tolerance and financial goals.
					</p>
				</div>
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col items-center">
					<img
						src={longtermImg}
						alt="Long-term advice"
						className="w-16 h-16 mb-2"
					/>
					<h4 className="font-semibold mb-1">Invest for the Long Term</h4>
					<p className="text-sm text-gray-600 dark:text-gray-300 text-center">
						Stay invested and let your money grow over time for better returns.
					</p>
				</div>
			</div>
		</section>

		<footer className="w-full max-w-5xl mx-auto py-8 px-4 text-center">
			<p className="text-sm text-gray-500 dark:text-gray-400">
				&copy; 2023 Alhaqq Investment. All rights reserved.
			</p>
		</footer>
	</main>
);

export default Homepage;
