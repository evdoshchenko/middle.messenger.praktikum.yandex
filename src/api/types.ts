export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type ChatsDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: string;
  last_message: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    display_name: string;
    login: string;
    phone: string;
  }
  time: string;
  content: string;
};

export const optionsFetch = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export type FileDTO = {
  id: number;
  user_id: string;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export class File {
  id: number;

  userId: string;

  path: string;

  contentType: string;

  uploadDate: string;

  filename: string;

  contentSize: number;

  constructor(dto: FileDTO) {
    this.id = dto.id;
    this.userId = dto.user_id;
    this.path = dto.path;
    this.contentType = dto.content_type;
    this.uploadDate = dto.upload_date;
    this.filename = dto.filename;
    this.contentSize = dto.content_size;
  }
}

export type MessageViewDTO = {
  id: number;
  chat_id?: number;
  content: string;
  file: Nullable<FileDTO>;
  is_read?: boolean;
  time: string;
  type: string;
  user_id: string;
};

export class MessageView {
  id: number;

  userId: string;

  chatId?: number;

  content: string;

  isRead?: boolean;

  time: Date;

  type: string;

  file: Nullable<File>;

  constructor(dto: MessageViewDTO) {
    this.id = dto.id;
    this.userId = dto.user_id;
    this.chatId = dto.chat_id;
    this.content = dto.content;
    this.isRead = dto.is_read;
    this.time = new Date(dto.time);
    this.type = dto.type;
    this.file = dto.file && new File(dto.file);
  }
}
