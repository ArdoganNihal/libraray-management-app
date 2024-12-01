import  Loan  from './Loan';
import  Book  from './Book';

export interface IUser {
  id?: number;
  name: string;
  Loans?: Loan[];
}

export interface IBook {
  id?: number;
  name: string;
  score?: number;
  Loans?: ILoan[];

}

export interface ILoan {
  id?: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate?: Date;
  score?: number;
  status: 'active' | 'returned';
  Book?: Book;
  User?: IUser;

}
