import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UnauthorizedExceptionFilter } from '../filters/exceptions/http/http-unauthorized.filter';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  findAll() {
    return this.dashboardService.find().then(data => {
      return data
    }).catch(error => {
      return error;
    })
  }
}
