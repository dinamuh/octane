import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecommentationDto {
  @IsNumber()
  @IsNotEmpty()
  userId;

  @IsNumber()
  @IsNotEmpty()
  bookId;

  @IsNumber()
  @IsNotEmpty()
  startPage;

  @IsNumber()
  @IsNotEmpty()
  endPage;
}
