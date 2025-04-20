import React, { useEffect, useState } from "react";

// Type definition for the donation data
interface Donor {
  name: string;
  donation: number;
}

// Mock function to simulate fetching donation data from an API (or Firebase)
const fetchDonationData = async (): Promise<Donor[]> => {
  // Simulating an API call to fetch data
  const response = await new Promise<Donor[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { name: "Ronit Paikray", donation: 5000 },
          { name: "Aarav Sharma", donation: 4200 },
          { name: "Ishita Verma", donation: 3500 },
          { name: "Kabir Mehra", donation: 3000 },
          { name: "Mehul Jain", donation: 2800 },
        ]),
      2000 // Simulating 2s delay (e.g., API response time)
    )
  );
  return response;
};

const DonationLeaderboardPage: React.FC = () => {
  const [donationData, setDonationData] = useState<Donor[]>([]);

  // Fetch data and update leaderboard on component mount
  useEffect(() => {
    const updateLeaderboard = async () => {
      const data = await fetchDonationData();
      setDonationData(data);
    };

    // Fetch leaderboard data every 10 seconds
    updateLeaderboard();
    const intervalId = setInterval(updateLeaderboard, 10000); // Every 10 seconds

    // Clear interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-teal-700 mb-8">💖 Donation Leaderboard</h1>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-teal-600 text-lg border-b-2 border-teal-300">
              <th className="pb-2">Rank</th>
              <th className="pb-2">Donor Name</th>
              <th className="pb-2">Donation Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {donationData.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-3 text-gray-500">
                  Loading leaderboard...
                </td>
              </tr>
            ) : (
              donationData.map((donor, index) => (
                <tr
                  key={index}
                  className="text-gray-700 hover:bg-teal-50 transition-all"
                >
                  <td className="py-3 font-semibold">{index + 1}</td>
                  <td className="py-3">{donor.name}</td>
                  <td className="py-3">₹ {donor.donation}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationLeaderboardPage;
