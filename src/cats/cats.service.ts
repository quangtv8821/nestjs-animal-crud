import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from './interface/cats.interface';
import { Cat } from './entities/cat.entity';

@Injectable()
/*
export class CatsService {
  private cats: Cats[] = []

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto)

    return {message: 'Creat cat success'}
  }

  findAll(): Cats[] {
    return this.cats
  }

  findOne(id: number) {
    return this.cats.map(item => (item.id == id) ? item : {message: "Cat doesn't exist"})[0]
  }

  update(id: number, updateCatDto: UpdateCatDto ) {
    this.cats = this.cats.map(item => (item.id == id) ? (item = updateCatDto) : item)

    return {message: `Update cat ${id} success`}
  }

  remove(id: number) {
    this.cats = this.cats.filter(item => item.id != id)
    
    return {message: `Delete cat ${id} success`}
  }
}
*/
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find()
  }

  async findOne(id: number): Promise<Cat> {
    return await this.catRepository.findOne(id)
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this.catRepository.save({
      ...updateCatDto, id: Number(id)
    })
  }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id)
  }
}
