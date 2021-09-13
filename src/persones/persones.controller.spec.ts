import { Test, TestingModule } from '@nestjs/testing';
import { PersonesController } from './persones.controller';

describe('PersonesController', () => {
  let controller: PersonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonesController],
    }).compile();

    controller = module.get<PersonesController>(PersonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
