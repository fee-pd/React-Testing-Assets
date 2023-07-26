import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';
import { pizzas } from '../assets/pizzas.json';

@Injectable()
export class PizzasService {
  private pizzas: Pizza[] = pizzas;
  create(createPizzaDto: CreatePizzaDto) {
    return 'This action adds a new pizza';
  }

  findAll() {
    return this.pizzas;
  }

  findOne(id: string) {
    const pizza = this.pizzas.find((pizza) => pizza.id === id);

    if (!pizza) throw new NotFoundException(`Pizza with id: ${id} not found`);

    return pizza;
  }

  update(id: string, updatePizzaDto: UpdatePizzaDto) {
    return `This action updates a #${id} pizza`;
  }

  remove(id: string) {
    const pizza = this.findOne(id);

    this.pizzas = this.pizzas.filter((pizza) => pizza.id !== id);
    return pizza;
  }
}
