import { PartialType } from '@nestjs/mapped-types';
import { CreateCostCenterDto } from './create-cost_center.dto';

export class UpdateCostCenterDto extends PartialType(CreateCostCenterDto) {}
