import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

export enum UserType {
  USER = "user",
  TEACHER = "teacher",
  ADMIN = "admin",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  contactNumber: string;

  @Column()
  userType: string;

  @Column()
  activationStartDate: Date;

  @Column()
  activationEndDate: Date;

  //lenguajes asociados para teachers
}
