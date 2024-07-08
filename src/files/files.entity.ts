import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column()
  imageUrl: string;
}

export { File };
