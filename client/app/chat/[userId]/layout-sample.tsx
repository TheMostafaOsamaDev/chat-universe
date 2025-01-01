import React from "react";

const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header - User info */}
      <div className="flex items-center p-4 bg-white border-b">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="ml-3">
          <div className="font-medium">User Name</div>
          <div className="text-sm text-gray-500">Online</div>
        </div>
      </div>

      {/* Chat messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Example messages to demonstrate scrolling */}
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`max-w-[70%] mb-4 p-3 rounded-lg ${
                i % 2 === 0
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {`Message ${
                i + 1
              }: This is a sample message to demonstrate the scrollable chat area.`}
            </div>
          ))}
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
