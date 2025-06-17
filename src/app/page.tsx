import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

import { motion } from "framer-motion";
import HeaderComponent from "./_components/Layout/Header";

const COIN_POSITIONS = [
  { top: "-20%", left: "10%" },
  { top: "-5%", left: "100%" },
  { top: "45%", left: "0%" },
  { top: "80%", left: "90%" },
];

const HOW_IT_WORKS_ITEMS = [
  {
    title: "Buy Tokens",
    description:
      "Investors purchase GARAM-RWA tokens via the official platform",
    highlight: "KYC verified, 100% escrow smart contract",
    image: "/factory1.svg",
  },
  {
    title: "Fund the Factory",
    description:
      "Funds are raised to build the salt factory in Tanah Laut, South Kalimantan",
    highlight: "Land and permits are already secured",
    image: "/factory2.svg",
  },
  {
    title: "Produce & Sell",
    description: "Sustainable production of food-grade salt",
    highlight: "LOI secured from national food & beverage industries",
    image: "/factory3.svg",
  },
  {
    title: "Distribute Profit",
    description:
      "Profits are distributed to investors in stablecoins or tokens",
    highlight: "Target: 20% annual return",
    image: "/factory4.svg",
  },
];

const Milestone = [
  {
    icon: "/asset/land.svg",
    title: "Land Acquired & LOI Signed",
    date: "Q2 2025",
    isCompleted: true,
  },
  {
    icon: "/asset/token.svg",
    title: "Tokenization & Fundraising",
    date: "Q3 2025",
  },
  {
    icon: "/asset/factory.svg",
    title: "Factory Construction Begins",
    date: "Q4 2025",
  },
  {
    icon: "/asset/production.svg",
    title: "Production Starts",
    date: "Q1 2026",
  },
  {
    icon: "/asset/profit.svg",
    title: "Profit Distribution to Investors",
    date: "Q2 2026",
  },
];

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
     <HeaderComponent></HeaderComponent>
      <div className="min-h-screen max-w-full overflow-x-hidden bg-[#080063]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-30">
          <div className="mx-auto mb-20 flex max-w-4xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Floating coins animation */}
              <div className="absolute inset-0">
                {COIN_POSITIONS.map((position, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={position}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400">
                      <div className="text-white-900 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500">
                        ▲
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold md:text-5xl">
                  Invest in Real-World Salt Production
                </h1>
                <h1 className="mb-6 text-3xl font-bold md:text-5xl">
                  via Tokenized Equity
                </h1>
              </div>
              <p className="mb-8 text-lg text-gray-300">
                Indonesia's first food-grade salt factory funded via blockchain.
                <br />
                Transparent. Sustainable. Profitable
              </p>
              <div className="flex justify-center gap-4">
                <button className="rounded-full border border-white/20 px-8 py-3 text-lg font-medium transition-colors hover:bg-white/10">
                  Download Whitepaper
                </button>
                <button className="rounded-full border border-white/20 px-8 py-3 text-lg font-medium transition-colors hover:bg-white/10">
                  Join Token Sale
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto max-w-full overflow-x-hidden px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-5xl font-bold">How it Works</h2>
          </motion.div>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {HOW_IT_WORKS_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex max-w-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-colors hover:bg-white/10"
              >
                <div className="relative mb-6 h-48 w-48">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  <div className="absolute inset-4 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mb-4 text-gray-300">{item.description}</p>
                <div className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                  {item.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Investment Snapshots Section */}
        <section className="container mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-12 text-center text-5xl font-bold">
            Investment Snapshots
          </h2>
          <div className="space-y-12">
            <div className="overflow-x-auto rounded-lg border border-blue-400/50">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-blue-400/80 text-white">
                    <th className="rounded-tl-lg px-6 py-3">Component</th>
                    <th className="rounded-tr-lg px-6 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-400/50">
                    <td className="px-6 py-4 font-semibold">Target Raise</td>
                    <td className="px-6 py-4">USD 3,000,000</td>
                  </tr>
                  <tr className="border-t border-blue-400/50 bg-blue-400/10">
                    <td className="px-6 py-4 font-semibold">Token Type</td>
                    <td className="px-6 py-4">
                      Tokenized Equity (RWA Backend)
                    </td>
                  </tr>
                  <tr className="border-t border-blue-400/50">
                    <td className="px-6 py-4 font-semibold">
                      Investor Allocation
                    </td>
                    <td className="px-6 py-4">30% Project Equity</td>
                  </tr>
                  <tr className="border-t border-blue-400/50 bg-blue-400/10">
                    <td className="px-6 py-4 font-semibold">
                      Projected Return
                    </td>
                    <td className="px-6 py-4">
                      20% Annually (Dividends + Token Appreciation)
                    </td>
                  </tr>
                  <tr className="border-t border-blue-400/50">
                    <td className="px-6 py-4 font-semibold">
                      Buyback Guarantee
                    </td>
                    <td className="px-6 py-4">
                      Optional, in Year 3 via smart contract
                    </td>
                  </tr>
                  <tr className="rounded-b-lg border-t border-blue-400/50 bg-blue-400/10">
                    <td className="px-6 py-4 font-semibold">
                      Minimum Investment
                    </td>
                    <td className="px-6 py-4">USD 100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Icons Row */}
            <div className="flex flex-wrap justify-center gap-12 pt-8 text-center text-white">
              <div className="flex flex-col items-center gap-2">
                <img src="/asset/roi.svg" alt="ROI" className="h-12 w-12" />
                <span className="font-semibold">ROI</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/asset/hourglass.svg"
                  alt="3-Year Timeline"
                  className="h-12 w-12"
                />
                <span className="font-semibold">3-Year Timeline</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/asset/lock.svg"
                  alt="Escrow Protected"
                  className="h-12 w-12"
                />
                <span className="font-semibold">Escrow Protected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/legal.svg"
                  alt="Legal Backed"
                  className="h-12 w-12"
                />
                <span className="font-semibold">Legal Backed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Milestones Section */}
        <section className="container mx-auto max-w-6xl px-4 py-20">
          <h2 className="mb-20 text-center text-5xl font-bold">
            Project Milestones
          </h2>

          <div className="relative">
            {/* Timeline items container */}
            <div className="relative z-10 grid grid-cols-5 gap-4">
              {Milestone.map((milestone, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  {/* Icon above circle */}
                  <div className="relative z-10 mb-2 h-24 w-24">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm" />
                    <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                    <img
                      src={milestone.icon}
                      alt={milestone.title}
                      className="absolute inset-0 h-full w-full object-contain p-5"
                    />
                  </div>

                  {/* Circle */}
                  <div className="relative z-10 my-4 h-8 w-8">
                    <div
                      className={`absolute h-8 w-8 rounded-full ${
                        milestone.isCompleted ? "bg-blue-500" : "bg-blue-600"
                      } flex items-center justify-center border-4 border-white/20`}
                    >
                      {milestone.isCompleted && (
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Text below */}
                  <div className="mt-2 text-center">
                    <p className="mb-1 text-lg font-semibold">
                      {milestone.date}
                    </p>
                    <p className="mx-auto max-w-xs text-sm text-gray-300">
                      {milestone.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal line aligned with center of circles */}
            <div
              className="absolute top-[135px] right-[10%] left-[10%] z-0 h-1 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899, #F59E0B, #10B981)",
              }}
            />
          </div>
        </section>

        {/* Token Distribution & Mechanics Section */}
        <section className="container mx-auto max-w-6xl rounded-3xl bg-[#080063] px-4 py-20 text-white">
          <h2 className="mb-12 text-center text-5xl font-bold">
            Token Distribution & Mechanics
          </h2>
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
            {/* Pie Chart */}
            <div className="relative h-72 w-72">
              <img
                src="/asset/token-distribution-pie.svg"
                alt="Token Distribution Pie Chart"
                className="h-full w-full object-contain"
              />
              {/* Overlay text labels */}
              <div className="absolute top-8 left-8 text-left">
                <p>
                  <span className="text-2xl font-bold text-cyan-400">40%</span>{" "}
                  Treasury
                </p>
                <p className="text-sm text-gray-300">Future Expansion & DAO</p>
              </div>
              <div className="absolute top-8 right-8 text-right">
                <p>
                  <span className="text-2xl font-bold text-yellow-400">
                    40%
                  </span>{" "}
                  Founding
                </p>
                <p className="text-sm text-gray-300">3-Years Vesting</p>
              </div>
              <div className="absolute bottom-20 left-8 text-left">
                <p>
                  <span className="text-2xl font-bold text-blue-600">30%</span>{" "}
                  Investors
                </p>
                <p className="text-sm text-gray-300">Public & Private Sale</p>
              </div>
              <div className="absolute right-8 bottom-20 text-right">
                <p>
                  <span className="text-2xl font-bold text-orange-500">
                    10%
                  </span>{" "}
                  Strategic Partners & Advisors
                </p>
              </div>
            </div>

            {/* Smart Contract Terms */}
            <div className="max-w-md">
              <h3 className="mb-6 text-3xl font-semibold">
                Smart Contract Terms
              </h3>
              <ul className="list-inside list-disc space-y-3 text-lg">
                <li>100% Escrow Wallet (Audited)</li>
                <li>3-Year Linear Vesting for Team</li>
                <li>Buyback Option in Year 3</li>
                <li>Fully Transparent on BSC/ERC</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </HydrateClient>
  );
}
