/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import CreatePersonesDto from '../dto/create/create-persones.dto';
import { PersonesService } from './persones.service';
import UpdatePersonesDto from '../dto/update/update-persone.dto';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
@Controller('persones')
export class PersonesController {

  constructor(
    private readonly personesServis: PersonesService,
    private readonly authService: AuthService

  ) { }

  @Post()
  postPersone(@Body() personDto: CreatePersonesDto) {
    return this.personesServis.create(personDto)
  }
  @Patch(':id')
  update(@Body() dataToUpdate: UpdatePersonesDto, @Param('id') _id: number) {
    return this.personesServis.update(dataToUpdate, _id);
  }

  @Get()
  getAll() {
    return this.personesServis.getAll();
  }

  @Get(':id')
  getPersone(@Param('id') _id: number) {
    return this.personesServis.getById(_id)
  }

  @Get('project/:id')
  getByProject(@Param('id') _id: number) {
    return this.personesServis.getByProject(_id);
  }

  @Get('skill/:id')
  getBySkill(@Param('id') _id: number) {
    return this.personesServis.getBySkill(_id);
  }

  @Get('managers/:id')
  getByManager(@Param('id') _id: number) {
    return this.personesServis.getByManager(_id)
  }

  @Delete(':id')
  deletePersone(@Param('id') _id: number) {
    return this.personesServis.deletePersone(_id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.persone)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.persone
  }

  // @Post('/login')
  // async login(@Body() loginDto: LoginPersonesDto): Promise<PersoneRO> {

  //   const _persone = this.personesServis.findOne(loginDto)
  //   const err = { Persone: 'User not found' };

  //   if (!_persone) throw new HttpException({ err }, 401)

  //   const token = await this.personesServis.generateJWT(_persone);

  //   const {
  //     firstName,
  //     age,
  //     nameOnProject,
  //     englishLvl,
  //     startDate,
  //     endDate
  //   } = _persone

  //   const persone = {
  //     firstName,
  //     age,
  //     nameOnProject,
  //     englishLvl,
  //     startDate,
  //     endDate,
  //     token
  //   }

  //   return { persone };
  // }
}
