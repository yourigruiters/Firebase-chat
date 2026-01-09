export interface Room {
  id: string;
  name: string;
  type: "public" | "private";
  password?: string;
  createdAt: number;
  createdBy: string;
  creatorName: string;
  participants?: { uid: string; displayName: string }[];
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: number;
}
