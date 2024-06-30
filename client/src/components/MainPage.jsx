import { useState, useRef } from "react";
import { ThreeDots } from 'react-loader-spinner';

function MainPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [takeaways, setTakeaways] = useState("");
  const [angle, setAngle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keywordHelp, setKeywordHelp] = useState("No");
  const [format, setFormat] = useState("");
  const [tone, setTone] = useState("");
  const [sources, setSources] = useState("");
  const [credibility, setCredibility] = useState("");
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const articleRef = useRef(null);

  const handleGenerateArticle = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: `
          Create me an article with the following details:
          1. Topic: ${topic}
          2. Target Audience: ${audience}
          3. Goal: ${goal}
          4. Key Takeaways: ${takeaways}
          5. Unique Angle: ${angle}
          6. Keywords: ${keywords ? keywords : "No specific keywords, need help with keyword research"}
          7. Format: ${format}
          8. Tone: ${tone}
          9. Sources: ${sources ? "Yes, will provide links later" : "No"}
          10. Crucial Information for Credibility: ${credibility ? "Yes, will provide details later" : "No"}
        `,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/completions", options);
      const data = await response.json();
      setArticle(data.choices[0].message);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to generate article:", error);
      setIsLoading(false);
    }
  };

  const handleCopyArticle = async () => {
    if (articleRef.current) {
      const el = articleRef.current;
      try {
        await navigator.clipboard.writeText(el.innerText);
        alert("Article Copied to Clipboard!")
      } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center pt-32 md:pt-56">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[80%]">
        <h1 className="text-4xl font-bold text-center ">
          ⭐ Article Creation Assistant ⭐ 
        </h1>
        <h2 className="mb-6 text-lg font-light ">powered by ChatGPT</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">What is the main topic of your article?</label>
          <input
            className="input-large bg-gray-200 rounded-lg w-1/2 shadow-sm resize-y"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Who are you writing this article for?</label>
          <input
            className="input-large bg-gray-200 rounded-lg shadow-sm w-1/2 resize-y"
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">What is the main goal of your article?</label>
          <input
            className="input-large bg-gray-200 rounded-lg shadow-sm w-1/2 resize-y"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">What key takeaway(s) do you want readers to get?</label>
          <input
            className="input-large bg-gray-200 rounded-lg shadow-sm resize-y h-24 w-3/4"
            type="text"
            value={takeaways}
            onChange={(e) => setTakeaways(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">What is your unique angle or approach (optional)?</label>
          <input
            className="input-large bg-gray-200 rounded-lg w-3/4 shadow-sm resize-y h-24"
            type="text"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Do you have any keywords in mind?</label>
          <input
            className="input-large bg-gray-200 w-3/4 rounded-lg shadow-sm resize-y h-24"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <div className="mt-2">
            <label className="block font-medium mb-2">If no, select one:</label>
            <select
              className="input-large bg-gray-200 rounded-lg shadow-sm"
              value={keywordHelp}
              onChange={(e) => setKeywordHelp(e.target.value)}
            >
              <option value="No">No, I need help with keyword research</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">What format would you like?</label>
          <select
            className="input-large bg-gray-200 rounded-lg shadow-sm"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="Listicle">Listicle (e.g., Top 10 Tips)</option>
            <option value="Step-by-Step Guide">Step-by-Step Guide</option>
            <option value="In-depth Analysis">In-depth Analysis</option>
            <option value="Other">Other (Specify)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">What tone do you want to use?</label>
          <select
            className="input-large bg-gray-200 rounded-lg shadow-sm"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Humorous">Humorous</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Do you have any sources you want to reference?</label>
          <select
            className="input-large bg-gray-200 rounded-lg shadow-sm"
            value={sources}
            onChange={(e) => setSources(e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes, will provide links later</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Is there any specific information you think is crucial for credibility?</label>
          <select
            className="input-large bg-gray-200 rounded-lg shadow-sm"
            value={credibility}
            onChange={(e) => setCredibility(e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes, will provide details later</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full font-medium text-center w-3/4"
          onClick={handleGenerateArticle}
        >
          Generate Article
        </button>
        {isLoading && (
          <div className="flex items-center mt-4">
            <ThreeDots
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
              className="mr-2"
            />
            <p>Loading...</p>
          </div>
        )}
        <h2 className="text-2xl font-semibold mt-6">Generated Article:</h2>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="border p-4 mt-2 rounded-xl shadow-xl w-3/4 flex flex-col justify-center items-center relative">
            <div className="h-full flex flex-col overflow-y-auto justify-center items-center">
              <div className="flex-grow p-8">
                <p ref={articleRef}>{article.content}</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <button
                  className="bg-green-500 text-white hover:bg-green-600 py-2 px-6 rounded-full font-medium"
                  onClick={handleCopyArticle}
                >
                  Copy
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <button
                  className="bg-green-500 text-white hover:bg-green-600 py-2 px-6 rounded-full font-medium"
                  onClick={handleGenerateArticle}
                >
                  Generate New
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-red-400 pt-8 text-center">
          Please note that there is a rough 750-word character limit on the full response of this form (the total of all fields). 
          <br />
          Response time is based on OpenAI's ChatGPT network speed. 
          <br />
          * If the "Generate Article" button does not return a response, it is because your prompt is too long, or ChatGPT is too busy to perform a request at this time.
        </p>
      </div>
    </div>
  );
}

export default MainPage;
