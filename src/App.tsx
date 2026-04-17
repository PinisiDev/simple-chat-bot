import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

type Message = {
  from: "bot" | "user";
  text: string;
};

const ai = new GoogleGenAI({
  apiKey: "",
});

async function getResponse(inputUser: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: inputUser,
  });

  return response.text;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const handleOnSend = async () => {
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: inputText,
      },
    ]);

    setInputText("");

    // Panggil API
    const responseText = await getResponse(inputText);

    // Masukkan data ke variabel messages
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: responseText,
      },
    ]);
  };

  return (
    <div className="p-6 pb-24">
      <h1 className="text-center text-2xl font-bold">My Chat Bot {10 * 2}</h1>

      <h2 className="text-center mt-4 mb-4">Riwayat pesan</h2>

      {/* List chat */}
      <div className="shadow-lg border border-gray-200 space-y-2 p-4">
        {messages.map((message) => {
          /* Bot */
          if (message.from === "bot") {
            return (
              <div className="border max-w-full w-max bg-green-800 text-white p-4 py-2 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
                <Markdown>{message.text}</Markdown>
              </div>
            );
          }

          /* User */
          return (
            <div className="border max-w-full w-max ml-auto bg-green-400 p-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl">
              <Markdown>{message.text}</Markdown>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="inset-x-6 flex gap-4 fixed bottom-6">
        <input
          type="text"
          className="shadow-lg flex-1 p-4 border bg-white"
          placeholder="Tulis pesan di sini..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleOnSend}
          className="bg-green-500 rounded-full size-14"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}

export default App;
