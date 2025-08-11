import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {

  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  create(createBookDto: CreateBookDto) {
    this.bookModel.create(createBookDto)

    return 'Livro Criado';
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException("Livro não encontrado");
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {new: true}).exec();
    if (!book){
      throw new NotFoundException("Livro não encontrado");
    }
    return book;
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookModel.findByIdAndDelete(id).exec();
    if (!book){
      throw new NotFoundException("Livro não encontrado");
    }
  }
}