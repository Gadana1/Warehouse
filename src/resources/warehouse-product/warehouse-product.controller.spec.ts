import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseProductController } from './warehouse-product.controller';
import { WarehouseProductService } from './warehouse-product.service';

describe('WarehouseProductController', () => {
  let controller: WarehouseProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseProductController],
      providers: [WarehouseProductService],
    }).compile();

    controller = module.get<WarehouseProductController>(
      WarehouseProductController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
