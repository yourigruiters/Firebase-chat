import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoomModal({
  isOpen,
  onClose,
}: CreateRoomModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [password, setPassword] = useState("");
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !user) return;

    try {
      await addDoc(collection(db, "rooms"), {
        name: name.trim(),
        type,
        password: type === "private" ? password : null,
        createdAt: Date.now(),
        createdBy: user.uid,
      });
      onClose();
      setName("");
      setPassword("");
      setType("public");
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room. Check console/config.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Create New Room</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter room name"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="public"
                  checked={type === "public"}
                  onChange={() => setType("public")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="private"
                  checked={type === "private"}
                  onChange={() => setType("private")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Private</span>
              </label>
            </div>
          </div>
          {type === "private" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Set a password"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
