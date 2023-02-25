export interface RequestType {
  _id: string;
  bookId: string;
  bookName: string;
  userName: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  status: string;
  endedAt?: Date;
  extendCount: number;
}

export interface BookType {
  _id: string;
  image?: string;
  name: string;
  amount: number;
  pages: number;
  language: string;
  type: string;
  author: string;
  publisher: string;
  publishYear: number;
  edition: number;
  borrowAmonut?: number;
  description: string;
}

export interface GetBookQuery {
  bookId: string;
}

export interface UserType {
  _id: string;
  image: string;
  name: string;
  ethnic: string;
  sex: string;
  language: string;
  cccd: string;
  dateCreatedCard: Date;
  dateOutCard: Date;
  birth: Date;
  class: string;
  location: string;
  email: string;
  role: number;
  like: string[];
}
