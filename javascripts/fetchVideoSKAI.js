// Function to get the URL for a given channel name
function mainFunction() {
  return JSON.stringify({
            Type: "HTTPRequestNeeded",
            Result: "https://www.skai.gr/tv/live"
        });
}

// Function to handle HTTP request result
function functionWithHTTPResult(result) {
    try {
        // Ensure we are working with a string and check if it contains ".m3u8"
        var m3u8Url = result || null;

        if (typeof m3u8Url !== 'string') {
            return JSON.stringify({
                Type: "Error",
                Result: "Input is not a valid string",
                enabledDRM: false,
                requiredHeaders: false
            });
        }

        // Find the index of ".m3u8"
        const m3u8Index = m3u8Url.indexOf(".m3u8");

        if (m3u8Index === -1) {
            return JSON.stringify({
                Type: "Error",
                Result: "No .m3u8 found",
                enabledDRM: false,
                requiredHeaders: false
            });
        }

        // Find the last '"' before ".m3u8"
        const lastQuoteBeforeM3U8 = m3u8Url.lastIndexOf('"', m3u8Index);

        // If there is no '"' before, return an error
        if (lastQuoteBeforeM3U8 === -1) {
            return JSON.stringify({
                Type: "Error",
                Result: "No quote before .m3u8 found",
                enabledDRM: false,
                requiredHeaders: false
            });
        }

        // Find the first '"' after ".m3u8"
        const firstQuoteAfterM3U8 = m3u8Url.indexOf('"', m3u8Index + 5); // 5 is the length of ".m3u8"

        // If there is no '"' after, return an error
        if (firstQuoteAfterM3U8 === -1) {
            return JSON.stringify({
                Type: "Error",
                Result: "No quote after .m3u8 found",
                enabledDRM: false,
                requiredHeaders: false
            });
        }

        // Extract the substring between these indices
        const extracted = m3u8Url.substring(lastQuoteBeforeM3U8 + 1, firstQuoteAfterM3U8);

        return JSON.stringify({
            Type: "Direct",
            Result: extracted,  // Return the extracted m3u8 URL
            enabledDRM: false,
            requiredHeaders: false
        });

    } catch (error) {
        return JSON.stringify({
            Type: "Error",
            Result: "Invalid response format: " + error,
            enabledDRM: false,
            requiredHeaders: false
        });
    }
}
