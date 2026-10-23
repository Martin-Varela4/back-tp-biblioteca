import { AppDataSource } from "../../config/data-source.js";
import { Saga } from "./saga.entity.js";

const ormRepository = AppDataSource.getRepository(Saga);

export type CreateSagaData = {
  name: string;
  description?: string;
};

export type UpdateSagaData = Partial<CreateSagaData>;

export const sagaRepository = {
  async findAll() {
    return await ormRepository.find({
      order: { id: "ASC" },
    });
  },

  async findById(id: number) {
    return await ormRepository.findOneBy({ id });
  },

  async findByName(name: string) {
    return await ormRepository.findOneBy({ name });
  },

  async create(data: CreateSagaData) {
    const newSaga = ormRepository.create(data);
    return await ormRepository.save(newSaga);
  },

  async update(id: number, data: UpdateSagaData) {
    const saga = await ormRepository.findOneBy({ id });

    if (!saga) {
      return null;
    }

    ormRepository.merge(saga, data);

    return await ormRepository.save(saga);
  },

  async delete(id: number) {
    return await ormRepository.delete(id);
  },
};
