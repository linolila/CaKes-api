import { Cakes } from '../entity/cake.entity';

export interface CreateCakeResponse {
  message: string;
  newCake: Cakes;
}
