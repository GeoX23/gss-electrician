const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function fetchAllReviews() {
  const allReviews = [];
  const totalPages = 11;

  // Start the Next.js development server first
  console.log(
    "Please make sure your Next.js development server is running (npm run dev)"
  );
  console.log("Waiting 5 seconds before starting...");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  for (let page = 1; page <= totalPages; page++) {
    try {
      console.log(`Fetching page ${page}...`);

      const response = await axios.get(
        `http://localhost:3000/api/reviews?page=${page}`
      );

      allReviews.push(response.data);
      console.log(`Successfully fetched page ${page}`);

      // Wait a bit between requests to be nice to the server
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error(
        `Error fetching page ${page}:`,
        error.message || "Unknown error"
      );
      if (error.message.includes("ECONNREFUSED")) {
        console.error(
          "Make sure your Next.js development server is running (npm run dev)"
        );
        process.exit(1);
      }
    }
  }

  if (allReviews.length === 0) {
    console.error("No reviews were fetched. Exiting...");
    process.exit(1);
  }

  // Create the data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Save all reviews to a JSON file with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dataDir, `reviews-backup-${timestamp}.json`);

  fs.writeFileSync(filePath, JSON.stringify(allReviews, null, 2));
  console.log(`Reviews saved to ${filePath}`);
}

// Run the script
fetchAllReviews();
