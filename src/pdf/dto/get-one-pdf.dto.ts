import { IsBoolean, IsNotEmpty } from 'class-validator';

export class GetOnePdfDto {
  @IsNotEmpty()
  @IsBoolean()
  force: boolean;

  @IsNotEmpty()
  @IsBoolean()
  cancelReason: boolean;

  @IsNotEmpty()
  @IsBoolean()
  petCare: boolean;

  @IsNotEmpty()
  @IsBoolean()
  rentalCarCare: boolean;
}
