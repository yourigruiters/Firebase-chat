import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { LogOut, Plus, Lock, Hash } from "lucide-react";
import CreateRoomModal from "../components/CreateRoomModal";
import type { Room } from "../types";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Room[];
      setRooms(roomsData);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Chat Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.displayName}
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Available Rooms</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Room</span>
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/room/${room.id}`}
              className="group block rounded-xl bg-white p-6 shadow transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {room.type === "private" ? (
                    <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                  ) : (
                    <Hash className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {room.name}
                  </h3>
                </div>
                {room.type === "private" && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    Private
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Created by{" "}
                {room.createdBy === user?.uid ? "You" : room.creatorName}
              </p>
            </Link>
          ))}
          {rooms.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500">
                No rooms available. Create one to get started!
              </p>
            </div>
          )}
        </div>
      </main>

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
