"use client";
import React, { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className=" fixed bottom-4 right-4 z-50">
      {/* Chatbox */}
      {isChatOpen && (
        <div className="bg-default w-80 md:w-96 bg-white rounded-lg shadow-lg border border-gray-300 fixed bottom-16 right-4">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 text-white p-3 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <FaRegSmile size={24} />
              <h2 className="text-sm font-semibold">
                ブックオフ公式オンラインストア FAQ
              </h2>
            </div>
            <button onClick={toggleChat} className="text-white">
              <IoClose size={20} />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4">
            <p className="text-gray-700 text-sm mb-2">
              ブックオフ公式オンラインストアに関する質問に何でもお答えします。以下のよくある質問から選択していただくかお問合せ内容をご入力ください。
            </p>
            <p className="text-xs text-gray-500 mb-4">
              ※個人情報の入力はお控えください
            </p>

            {/* FAQ Options */}
            <div className="space-y-2">
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-left px-3 text-sm text-gray-700">
                オンラインストアの注文履歴どこから見れますか
              </button>
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-left px-3 text-sm text-gray-700">
                送料や手数料について教えてください
              </button>
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-left px-3 text-sm text-gray-700">
                マイページを確認するには
              </button>
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-left px-3 text-sm text-gray-700">
                店舗受取サービスの商品を期限内に受け取れない
              </button>
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-left px-3 text-sm text-gray-700">
                エラーや不具合でサイトが利用できない
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <button
        onClick={toggleChat}
        className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <FaRegSmile size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
