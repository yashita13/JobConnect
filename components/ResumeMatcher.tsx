"use client";
import {useState} from "react";
import ReactMarkdown from "react-markdown";
import { Target, FileText, Lightbulb, Search } from "lucide-react";

export default function ResumeMatcher() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jdText, setJdText] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("");

    const analyzeResume = async (type: string) => {
        if (!resumeFile || !jdText) {
            alert("Please upload a resume and paste the job description first!");
            return;
        }

        setLoading(true);
        setSelectedType(type);

        try {
            const formData = new FormData();
            formData.append("resume", resumeFile);
            formData.append("jobDescription", jdText);
            formData.append("userId", "demo-user");
            formData.append("type", type);

            const response = await fetch("/api/match", {method: "POST", body: formData});

            if (!response.ok) {
                const text = await response.text();
                console.error("API Error Response:", text);
                throw new Error("API returned an error");
            }

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (err) {
            console.error("Analyze Resume Error:", err);
            alert("Analysis failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="relative z-10 w-full m-6 px-4">

                {/* Heading */}
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
                        Resume-JD Matcher
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl">
                        Upload your resume and paste the job description to instantly analyze compatibility and improve
                        your chances of getting shortlisted.
                    </p>
                </div>

                {/* Upload and JD Input */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Resume Upload */}
                    <div className="bg-gradient-to-br from-[#1a1a1d] to-[#0f0f0f] border border-[#27272a] rounded-2xl p-6 shadow-xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Upload Your Resume</h3>

                        {/* Hidden input */}
                        <input
                            id="resumeUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />

                        {/* Readonly input displaying file name */}
                        <input
                            type="text"
                            value={resumeFile ? resumeFile.name : ""}
                            readOnly
                            placeholder="No file selected..."
                            className="w-full bg-black border border-gray-600 rounded-xl p-3 text-white mb-4"
                        />

                        {/* Button to open file picker */}
                        <label
                            htmlFor="resumeUpload"
                            className="inline-block cursor-pointer px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition"
                        >
                            Choose File
                        </label>
                    </div>

                    {/* JD Paste */}
                    <div className="bg-gradient-to-br from-[#1a1a1d] to-[#0f0f0f] border border-[#27272a] rounded-2xl p-6 shadow-xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Job Description</h3>
                        <textarea
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                            placeholder="Paste the job description here..."
                            className="w-full h-48 bg-black border border-gray-600 rounded-xl p-3 text-white resize-none no-scrollbar focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                </div>

                {/* Analysis Type Cards */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            type: "matchPercentage",
                            icon: <Target className="h-10 w-10 text-purple-400 mx-auto" />,
                            title: "Match %",
                            desc: "How well you match"
                        },
                        {
                            type: "resumeAnalyzer",
                            icon: <FileText className="h-10 w-10 text-purple-400 mx-auto" />,
                            title: "Analyzer",
                            desc: "Detailed analysis"
                        },
                        {
                            type: "improvementSuggestions",
                            icon: <Lightbulb className="h-10 w-10 text-purple-400 mx-auto" />,
                            title: "Suggestions",
                            desc: "What to improve"
                        },
                        {
                            type: "missingKeywords",
                            icon: <Search className="h-10 w-10 text-purple-400 mx-auto" />,
                            title: "Missing Keywords",
                            desc: "Important terms"
                        }


                    ]
                        .map((card) => (
                            <div
                                key={card.type}
                                onClick={() => analyzeResume(card.type)}
                                className="cursor-pointer bg-gradient-to-br from-[#1f1f22] to-[#27272a] hover:scale-[1.03] hover:shadow-lg hover:border-purple-500 border border-[#333] rounded-2xl p-6 text-center shadow-md transition duration-200"
                            >
                                <div className="text-3xl mb-3">{card.icon}</div>
                                <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                                <p className="text-gray-400 text-sm">{card.desc}</p>
                            </div>
                        ))}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center mt-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500"></div>
                        <p className="ml-4 text-lg text-white">Analyzing your resume...</p>
                    </div>
                )}

                {/* Analysis Result */}
                {analysis && (
                    <div className="mt-12 max-w-5xl mx-auto bg-gradient-to-br from-[#1a1a1d] to-[#0f0f0f] border border-[#27272a] rounded-2xl p-6 space-y-6 shadow-xl">
                        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            {selectedType
                                .replace(/([A-Z])/g, " $1")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </h2>

                        {typeof analysis === "string" ? (
                            <div className="prose prose-invert prose-lg sm:prose-xl lg:prose-2xl prose-p:leading-relaxed prose-p:mb-6 max-w-none text-gray-100 space-y-4">
                                <ReactMarkdown
                                    components={{
                                        ul: ({ node, ...props }) => <ul className="list-disc list-inside pl-5" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside pl-5" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                                        p: ({ node, ...props }) => <p className="text-lg sm:text-xl leading-8" {...props} />,
                                    }}
                                >
                                    {analysis}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            Object.entries(analysis).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 space-y-4 shadow-lg"
                                    >
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                            {key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (c) => c.toUpperCase())}
                                        </h3>

                                        {typeof value === "string" ? (
                                            <div className="prose prose-invert prose-lg sm:prose-xl lg:prose-2xl max-w-none text-gray-200 space-y-4">
                                                <ReactMarkdown
                                                    components={{
                                                        ul: ({ node, ...props }) => (
                                                            <ul className="list-disc list-inside pl-5" {...props} />
                                                        ),
                                                        ol: ({ node, ...props }) => (
                                                            <ol className="list-decimal list-inside pl-5" {...props} />
                                                        ),
                                                        li: ({ node, ...props }) => (
                                                            <li className="mb-2" {...props} />
                                                        ),
                                                        p: ({ node, ...props }) => (
                                                            <p className="text-lg sm:text-xl leading-8" {...props} />
                                                        ),
                                                    }}
                                                >
                                                    {value}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <div className="prose prose-invert prose-lg sm:prose-xl lg:prose-2xl max-w-none text-gray-200 space-y-4">
                                                <ReactMarkdown>
                                                    {Object.values(value)
                                                        .map((v) => cleanLabelPrefix(v))
                                                        .join("\n\n")}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                ))

                        )}

                    </div>
                )}
            </section>
        </>


    );
}