"use client";
import Link from "next/link";

const Card = ({ href, iconBg, icon, title, description }) => {
  return (
    <Link
      href={href}
      className="card bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col min-h-[160px] transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className={`icon-container ${iconBg} mr-4`}>{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
    </Link>
  );
};

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            href="/finances/suppliers"
            iconBg="bg-indigo-100"
            icon={
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            }
            title="Data Pemasok"
            description="Data Pemasok"
          />

          <Card
            href="finances/debts"
            iconBg="bg-green-100"
            icon={
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            }
            title="Hutang Pemasok"
            description="#"
          />

          <Card
            href="finances/debts"
            iconBg="bg-blue-100"
            icon={
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            }
            title="Reports"
            description="Generate financial reports"
          />
        </div>
      </div>
    </div>
  );
}
