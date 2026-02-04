export interface SnowfallData {
  areaName: string;
  category: string;
  amount: string;
}

// Data from data-gen/nc-zipcodes.csv
export const ncSnowfallData: Record<string, SnowfallData> = {
  "28159": { areaName: "Spencer", category: "High (Orange)", amount: "12.0\"" },
  "28081": { areaName: "Kannapolis", category: "High (Orange)", amount: "14.5\"" },
  "28025": { areaName: "Concord", category: "High (Orange)", amount: "13.5\"" },
  "28075": { areaName: "Harrisburg", category: "High (Orange)", amount: "13.0\"" },
  "28115": { areaName: "Mooresville", category: "High (Orange)", amount: "11.5\"" },
  "28166": { areaName: "Troutman", category: "High (Orange)", amount: "12.0\"" },
  "28202": { areaName: "Uptown Charlotte", category: "Significant (Yellow)", amount: "11.0\"" },
  "28208": { areaName: "Charlotte Airport (CLT)", category: "Significant (Yellow)", amount: "11.4\"" },
  "28031": { areaName: "Cornelius", category: "Significant (Yellow)", amount: "9.5\"" },
  "28036": { areaName: "Davidson", category: "Significant (Yellow)", amount: "9.0\"" },
  "28078": { areaName: "Huntersville", category: "Significant (Yellow)", amount: "10.0\"" },
  "28105": { areaName: "Matthews", category: "Significant (Yellow)", amount: "9.5\"" },
};

export function getSnowfallData(zipCode: string): SnowfallData {
  // Return known NC data if available
  if (ncSnowfallData[zipCode]) {
    return ncSnowfallData[zipCode];
  }

  // Generate random snowfall for unknown zip codes
  const randomAmount = (Math.random() * 15).toFixed(1);
  const category = parseFloat(randomAmount) > 10 ? "High (Orange)" :
                   parseFloat(randomAmount) > 5 ? "Significant (Yellow)" :
                   "Moderate (Blue)";

  return {
    areaName: `Zip Code ${zipCode}`,
    category,
    amount: `${randomAmount}"`
  };
}

export function getCategoryColor(category: string): string {
  if (category.includes("High")) return "#ff6600";
  if (category.includes("Significant")) return "#ffcc00";
  return "#3399ff";
}
