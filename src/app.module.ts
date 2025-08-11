import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BooksModule, MongooseModule.forRoot('mongodb://localhost/books')],
  controllers: [],
  providers: [],
})
export class AppModule {}