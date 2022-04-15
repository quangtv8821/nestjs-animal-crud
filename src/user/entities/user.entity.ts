import {
    Entity,
    BeforeInsert,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
}
from 'typeorm'

import * as bcrypt from 'bcrypt'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    date_of_birth: Date

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8)
    }

    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password)
    }
}
