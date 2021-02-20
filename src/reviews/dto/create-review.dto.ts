import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 'asdaly12hbldahbsdl21bekd',
    description: 'User Id (UUID)',
  })
  userId: number;

  @ApiProperty({
    example: 'D-047',
    description: 'Destination Id',
  })
  destinationId: number;

  @ApiProperty({
    example: 'Very GOod Experience',
    description: 'Review Title',
  })
  title: string;

  @ApiProperty({
    example: '5',
    description: 'rating from 1 to 5',
  })
  rating: number;

  @ApiProperty({
    example: 'Very good experience',
    description: 'Review Body',
  })
  content: string;

  @ApiProperty({
    example: 'Defautls to Pending',
    description: 'Pending',
  })
  status: string;

  @ApiProperty({
    example:
      'Image Urls as a json : https://cdn.hellomunnar.in/userContent/image.png',
    description:
      'send image urls as a json object if user uploads multiple images',
  })
  imageUrls: any;
}
