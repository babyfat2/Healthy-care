import { Test, TestingModule } from '@nestjs/testing';
import { PateintController } from './pateint.controller';
import { PateintService } from './pateint.service';

describe('PateintController', () => {
  let controller: PateintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PateintController],
      providers: [PateintService],
    }).compile();

    controller = module.get<PateintController>(PateintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
