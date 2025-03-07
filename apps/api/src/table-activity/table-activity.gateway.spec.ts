import { Test, TestingModule } from '@nestjs/testing';
import { TableActivityGateway } from './table-activity.gateway';

describe('TableActivityGateway', () => {
  let gateway: TableActivityGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableActivityGateway],
    }).compile();

    gateway = module.get<TableActivityGateway>(TableActivityGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
