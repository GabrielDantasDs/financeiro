import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Request } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UnauthorizedExceptionFilter } from '../filters/exceptions/http/http-unauthorized.filter';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async get(@Request() req: any) {
    const id_user = req.user.id;

    return this.dashboardService
      .getDashboardData(id_user)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  @Get('/client/:id')
  async getDashboardClient(@Param('id') id: string) {
    const id_number = parseInt(id);

    return this.dashboardService
      .getDashboardClientData(id_number)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
}
