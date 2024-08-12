import { IsNumberString } from 'class-validator';

export class SearchInputDTO {
  q?: string;

  @IsNumberString()
  page?: number;

  @IsNumberString()
  limit?: number;
}
