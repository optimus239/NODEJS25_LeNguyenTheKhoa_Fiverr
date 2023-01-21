import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ma_cong_viec',
    type: Number,
  })
  ma_cong_viec: number;

  @ApiProperty({
    description: 'ma_nguoi_binh_luan',
    type: Number,
  })
  ma_nguoi_binh_luan: number;

  @ApiProperty({
    description: 'ngay_binh_luan',
    type: Date,
  })
  ngay_binh_luan: Date;

  @ApiProperty({
    description: 'noi_dung',
    type: String,
  })
  noi_dung: string;

  @ApiProperty({
    description: 'sao_binh_luan',
    type: Number,
  })
  sao_binh_luan: number;
}

export class ResponseCommentDto {
  content: CommentDto[];
}
