import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class CreateInvoiceDto {
  @ApiProperty({ required: true })
  @IsMongoId()
  gift: string;
}
