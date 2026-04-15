import { useState } from "react";

type Message = {
  from: "bot" | "user";
  text: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const handleOnSend = () => {
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: inputText,
      },
    ]);

    // Simulasi
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Haloooo",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold">My Chat Bot</h1>

      <h2 className="text-center mt-4 mb-4">Riwayat pesan</h2>

      {/* List chat */}
      <div className="shadow-lg border border-gray-200 space-y-2 p-4">
        {messages.map((message) => {
          /* Bot */
          if (message.from === "bot") {
            return (
              <div className="border w-max bg-green-800 text-white p-4 py-2 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
                {message.text}
              </div>
            );
          }

          /* User */
          return (
            <div className="border w-max ml-auto bg-green-400 p-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl">
              {message.text}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="inset-x-6 flex gap-4 fixed bottom-6">
        <input
          type="text"
          className="shadow-lg flex-1 p-4 border"
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
