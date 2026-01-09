import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Send, ArrowLeft, Lock } from "lucide-react";
import type { Room, Message } from "../types";

export default function ChatRoom() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchRoom() {
      if (!roomId) return;
      const roomRef = doc(db, "rooms", roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const roomData = { id: roomSnap.id, ...roomSnap.data() } as Room;
        setRoom(roomData);
        if (roomData.type === "public") {
          setIsAuthorized(true);
        }
      } else {
        navigate("/");
      }
      setLoading(false);
    }
    fetchRoom();
  }, [roomId, navigate]);

  useEffect(() => {
    if (!roomId || !isAuthorized) return;

    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);
      scrollToBottom();
    });

    return unsubscribe;
  }, [roomId, isAuthorized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room?.password === password) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !roomId) return;

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: newMessage.trim(),
        senderId: user.uid,
        senderName: user.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      }); // serverTimestamp is better for ordering but local state uses number. Types might conflict.
      // Adjusting type to allow generic or converting.
      // For simplicity in this demo, trusting firestore timestamp and casting.
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (!room) return null;

  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-100 p-3">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="mb-2 text-center text-xl font-bold text-gray-800">
            Private Room
          </h2>
          <p className="mb-6 text-center text-gray-500">
            Enter password to join {room.name}
          </p>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
              autoFocus
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Unlock Room
            </button>
          </form>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="bg-white px-4 py-4 shadow sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{room.name}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto flex h-full max-w-4xl flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === user?.uid;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                      isMe ? "bg-blue-600 text-white" : "bg-white text-gray-900"
                    }`}
                  >
                    {!isMe && (
                      <p className="mb-1 text-xs font-medium text-gray-500 opacity-75">
                        {msg.senderName}
                      </p>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white p-4 shadow-lg">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="flex items-center justify-center rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
