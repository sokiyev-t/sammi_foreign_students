import { Test, TestingModule } from '@nestjs/testing';
import { VisaTypeService } from './visa-type.service';

describe('VisaTypeService', () => {
  let service: VisaTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaTypeService],
    }).compile();

    service = module.get<VisaTypeService>(VisaTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
