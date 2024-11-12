import { ApiProperty } from '@nestjs/swagger';

export class InvoiceCreatedDto {
  @ApiProperty()
  url: string;
}
