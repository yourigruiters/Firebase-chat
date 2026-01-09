import { User } from "lucide-react";

interface Participant {
  uid: string;
  displayName: string;
}

interface UserSidebarProps {
  participants?: Participant[];
  currentUserId?: string;
}

export default function UserSidebar({
  participants = [],
  currentUserId,
}: UserSidebarProps) {
  const currentUserParticipant = participants.find(
    (p) => p.uid === currentUserId
  );
  const otherParticipants = participants.filter((p) => p.uid !== currentUserId);

  return (
    <div className="hidden w-64 border-l border-gray-200 bg-white lg:block lg:w-72">
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-200 px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Participants</h2>
          <p className="text-sm text-gray-500">
            {participants.length} {participants.length === 1 ? "user" : "users"}{" "}
            chatted in this room
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {currentUserParticipant && (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  You
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="truncate text-sm font-medium text-gray-900">
                    {currentUserParticipant.displayName}
                  </span>
                </div>
              </div>
            )}

            {otherParticipants.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Other Participant{otherParticipants.length !== 1 && "s"}
                </h3>
                <ul className="space-y-4">
                  {otherParticipants.map((participant) => (
                    <li
                      key={participant.uid}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="truncate text-sm font-medium text-gray-900">
                        {participant.displayName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {participants.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              No participants yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
