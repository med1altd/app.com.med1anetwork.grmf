// Function to get the URL for a given channel name
function mainFunction() {
  return JSON.stringify({
    Type: "HTTPRequestNeeded",
    Result: "https://pwn.sh/tools/streamapi.py?url=https://www.twitch.tv/livethess03"
  });
}

// Function to handle HTTP request result
function functionWithHTTPResult(result) {
  try {
    // Ensure we are working with a string
    var responseString = result || null;

    if (typeof responseString !== 'string') {
      return JSON.stringify({
        Type: "Error",
        Result: "Input is not a valid string",
        enabledDRM: false,
        requiredHeaders: false
      });
    }

    // Extract the .m3u8 URL
    const m3u8Url = extractUrl(responseString, ".m3u8");

    return JSON.stringify({
      Type: "Direct",
      Result: m3u8Url,  // .m3u8 URL
      enabledDRM: false, // DRM enabled if Widevine URL exists
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

// Helper function to extract a URL based on a keyword
function extractUrl(inputString, keyword) {
  const keywordIndex = inputString.lastIndexOf(keyword);

  if (keywordIndex === -1) {
    return null; // Keyword not found
  }

  // Find the last quote before the keyword
  const lastQuoteBefore = inputString.lastIndexOf('"', keywordIndex);
  if (lastQuoteBefore === -1) {
    return null;
  }

  // Find the first quote after the keyword
  const firstQuoteAfter = inputString.indexOf('"', keywordIndex + keyword.length);
  if (firstQuoteAfter === -1) {
    return null;
  }

  // Extract the substring between these indices
  return inputString.substring(lastQuoteBefore + 1, firstQuoteAfter);
}
