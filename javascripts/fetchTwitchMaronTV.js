function mainFunction() {
  return JSON.stringify({
    Type: "HTTPRequestNeeded",
    Result: "https://pwn.sh/tools/streamapi.py?url=https://www.twitch.tv/maron_tv"
  });
}

// Function to handle HTTP request result
function functionWithHTTPResult(result) {
  try {
    // Parse response JSON
    var responseJson = JSON.parse(result || "{}");
    if (!responseJson.success || !responseJson.urls) {
      throw new Error("Invalid API response");
    }

    // Extract the highest quality .m3u8 URL
    const urls = responseJson.urls;
    const maxQualityUrl = getMaxQualityM3U8(urls);

    return JSON.stringify({
      Type: "Direct",
      Result: maxQualityUrl,
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

// Function to get the highest quality .m3u8 URL
function getMaxQualityM3U8(urls) {
  let bestQuality = "audio_only";
  let bestUrl = urls[bestQuality];

  for (let quality in urls) {
    if (quality.includes("p") && parseInt(quality) > parseInt(bestQuality)) {
      bestQuality = quality;
      bestUrl = urls[quality];
    }
  }
  return bestUrl;
}
