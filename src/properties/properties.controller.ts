import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Property } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { ReqUser } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ReqPropertyDto, UpdatePropertyDto } from './dto';
import { LocationService } from './location/location.service';
import { PropertiesService } from './properties.service';
import { LocationDto } from './location/dto/location.dto';

@Controller('properties')
@UseGuards(JwtGuard)
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService,
        private readonly locationService : LocationService){}
    
    @Get()
    getAll(): Promise<Property[]> {
        return this.propertiesService.getAll();
    }

    @Get('location')
    getAtCoordinates(@Query() coordinates: LocationDto, @GetUser() reqUser : ReqUser) {
        return this.locationService.getAtCoordinates(coordinates, reqUser);
    }

    @Patch('location')
    patchLocation(@Query() coordinates: LocationDto, @Body() propertyData : UpdatePropertyDto, @GetUser() reqUser : ReqUser) {
        return this.locationService.patchLocation(coordinates, propertyData, reqUser);
    }

    @Delete('location')
    deleteAtCoordinates(@Query() coordinates : LocationDto, @GetUser() reqUser : ReqUser) {
        return this.locationService.deleteAtCoordinates(coordinates, reqUser);
    }


    @Get('mine')
    getMine(@GetUser() user : ReqUser){
        return this.propertiesService.getMine(user);
    }

    @Get(':id')
    getOne(@Param('id') propertyId : number) {
        return this.propertiesService.getOne(propertyId);
    }

    @Post()
    create(@Body() propertyData : ReqPropertyDto, @GetUser() reqUser : ReqUser) {
        return this.propertiesService.create(reqUser, propertyData);
    }

    @Delete(':id')
    remove(@Param('id') propertyId : number, @GetUser() reqUser : ReqUser) {
        return this.propertiesService.remove(propertyId, reqUser);
    }

    @Patch(':id')
    patch(@Param('id') propertyId : number, @Body() propertyData : UpdatePropertyDto, @GetUser() reqUser : ReqUser) {
        return this.propertiesService.patch(propertyId, propertyData, reqUser);
    }
}
