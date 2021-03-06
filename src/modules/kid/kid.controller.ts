import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { KidService } from './kid.service';
import { ReadKidDto } from './dto/read-kid.dto';
import { CreateKidDto } from './dto/create-kid.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateKidDto } from './dto/update-kid.dto';
import { ReadUserByKidDto } from '../user/dto';

@Controller('kid')
export class KidController {
  constructor(private readonly _kidService: KidService) {}

  
  @UseGuards(AuthGuard('jwt'))
  @Get(':idKid')
  getKid(@Param('idKid', ParseIntPipe) idKid: number): Promise<ReadKidDto> {
    return this._kidService.getKid(idKid);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('parent/:parentId')
  getKidByParent(
    @Param('parentId', ParseIntPipe) parentId: number,
  ): Promise<ReadKidDto[]> {
    console.log(parentId);
    return this._kidService.getKidbyParent(parentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getParent/:kidId')
  getParentByKid(
    @Param('kidId', ParseIntPipe) kidId: number,
  ): Promise<ReadUserByKidDto> {
    console.log(kidId);
    return this._kidService.getParentbyKid(kidId);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createKid(@Body() kid: Partial<CreateKidDto>): Promise<ReadKidDto> {
    console.log('MyKid', kid);
    return this._kidService.create(kid);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':idKid')
  async deleteKid(@Param('idKid', ParseIntPipe) idKid: number) {
    await this._kidService.delete(idKid);
    return true;
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put(':kidId')
  async updateUser(
    @Param('kidId',ParseIntPipe) kidId: number,
    @Body() kidUpdate: UpdateKidDto,
  ) {
   return this._kidService.update(kidId,kidUpdate);
  }
}
