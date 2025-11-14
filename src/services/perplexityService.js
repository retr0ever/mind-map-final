/**
 * Perplexity API Service
 * Fetches relevant educational links about brain regions and parts
 */

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

/**
 * Fetch relevant links for a brain region or part using Perplexity API
 * @param {string} regionName - Name of the brain region or part
 * @param {string} description - Description of the region/part
 * @returns {Promise<Array>} Array of link objects with title and url
 */
export async function fetchRelevantLinks(regionName, description) {
  try {
    const prompt = `Find exactly 3 high-quality educational resources about the ${regionName} in the human brain. ${description}

Return ONLY a JSON array with exactly 3 objects, each with 'title' and 'url' fields. The URLs must be real, working educational resources from reputable sources like:
- Scientific journals (Nature, Science, PubMed)
- Educational institutions (universities, medical schools)
- Medical organizations (NIH, Mayo Clinic, Cleveland Clinic)
- Educational sites (Khan Academy, Wikipedia)

Format your response as valid JSON only, nothing else:
[
  {"title": "Resource Title 1", "url": "https://example.com/article1"},
  {"title": "Resource Title 2", "url": "https://example.com/article2"},
  {"title": "Resource Title 3", "url": "https://example.com/article3"}
]`;

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that returns only valid JSON arrays of educational resources. Never include explanatory text, only JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in Perplexity response');
    }

    // Parse the JSON response
    const links = JSON.parse(content);

    // Validate the response
    if (!Array.isArray(links) || links.length === 0) {
      throw new Error('Invalid response format');
    }

    // Ensure we have valid links
    const validLinks = links.filter(link =>
      link.title && link.url && link.url.startsWith('http')
    ).slice(0, 3);

    return validLinks;

  } catch (error) {
    console.error('Error fetching links from Perplexity:', error);

    // Return fallback links if API fails
    return getFallbackLinks(regionName);
  }
}

/**
 * Fallback links in case API fails
 */
function getFallbackLinks(regionName) {
  const searchQuery = encodeURIComponent(`${regionName} brain anatomy function`);

  return [
    {
      title: `${regionName} - Wikipedia`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(regionName.replace(/\s+/g, '_'))}`
    },
    {
      title: `${regionName} Research - PubMed`,
      url: `https://pubmed.ncbi.nlm.nih.gov/?term=${searchQuery}`
    },
    {
      title: `${regionName} Information - Google Scholar`,
      url: `https://scholar.google.com/scholar?q=${searchQuery}`
    }
  ];
}

export default fetchRelevantLinks;
