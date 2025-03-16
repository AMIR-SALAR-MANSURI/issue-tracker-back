import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  
  @Column('longblob')
    image: Buffer; // Use Buffe

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageName: string | null; 

  @Column()
  type: string;

   @Column()
  cost: number;

}
