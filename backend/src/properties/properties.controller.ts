import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Property } from '@prisma/client';
import { GetUser } from 'src/auth/decorater';
import { ReqUser } from 'src/auth/dto';
import { ReqPropertyDto, UpdatePropertyDto } from './dto';
import { LocationService } from './location/location.service';
import { PropertiesService } from './properties.service';
import { LocationDto } from './location/dto/location.dto';
import { CityService } from './city/city.service';
import { CityQueryDto } from './city/dto';
import { StatsService } from './stats/stats.service';
import { StatsDto } from './stats/dto';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';

@Controller('properties')
@UseGuards(AuthenticatedGuard)
export class PropertiesController {
    constructor(private readonly propertiesService: PropertiesService,
        private readonly locationService : LocationService,
        private readonly cityService : CityService,
        private readonly statsService : StatsService){}
    
    @Get()
    getAll(): Promise<Property[]> {
        return this.propertiesService.getAll();
    }

    @Get('stats/:city')
    getStats(@Param('city') statsReq : StatsDto) {
        return this.statsService.getStats(statsReq);
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

    @Get('city/:city')
    getAtCity(@Param('city') city : string, @Query() cityQuery : CityQueryDto, @GetUser() reqUser : ReqUser) {
        return this.cityService.getAtCity(city, reqUser, cityQuery);
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
