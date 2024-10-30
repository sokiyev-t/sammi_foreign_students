import { Test, TestingModule } from '@nestjs/testing';
import { VisaTypeController } from './visa-type.controller';

describe('VisaTypeController', () => {
  let controller: VisaTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaTypeController],
    }).compile();

    controller = module.get<VisaTypeController>(VisaTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
