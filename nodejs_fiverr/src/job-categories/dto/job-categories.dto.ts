import { ApiProperty } from '@nestjs/swagger';

export class JobCategoriesDto {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ten_loai_cong_viec',
    type: String,
  })
  ten_loai_cong_viec: string;
}

export class ResponseAllJobCategoriesDto {
  content: JobCategoriesDto[];
}
