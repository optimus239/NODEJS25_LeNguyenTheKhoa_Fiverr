import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
  @ApiProperty({
    description: 'id',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ten_cong_viec',
    type: String,
  })
  ten_cong_viec: string;

  @ApiProperty({
    description: 'danh_gia',
    type: Number,
  })
  danh_gia: number;

  @ApiProperty({
    description: 'gia_tien',
    type: Number,
  })
  gia_tien: number;

  @ApiProperty({
    description: 'hinh_anh',
    type: String,
  })
  hinh_anh: string;

  @ApiProperty({
    description: 'mo_ta',
    type: String,
  })
  mo_ta: string;

  @ApiProperty({
    description: 'mo_ta_ngan',
    type: String,
  })
  mo_ta_ngan: string;

  @ApiProperty({
    description: 'sao_cong_viec',
    type: Number,
  })
  sao_cong_viec: number;

  @ApiProperty({
    description: 'ma_chi_tiet_loai',
    type: Number,
  })
  ma_chi_tiet_loai: number;

  @ApiProperty({
    description: 'nguoi_tao',
    type: Number,
  })
  nguoi_tao: number;
}

export class ResponseAllJobDto {
  content: JobDto[];
}
