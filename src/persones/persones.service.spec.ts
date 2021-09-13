import { Test, TestingModule } from '@nestjs/testing';
import { PersonesService } from './persones.service';

describe('PersonesService', () => {
  let service: PersonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonesService],
    }).compile();

    service = module.get<PersonesService>(PersonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
