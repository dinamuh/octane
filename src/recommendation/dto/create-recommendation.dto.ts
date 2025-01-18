import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecommentationDto {
  @IsNumber()
  @IsNotEmpty()
  user_id;

  @IsNumber()
  @IsNotEmpty()
  book_id;

  @IsNumber()
  @IsNotEmpty()
  start_page;

  @IsNumber()
  @IsNotEmpty()
  end_page;
}
