import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { LocationService } from './location/location.service';
import { CityService } from './city/city.service';

@Module({
    controllers: [PropertiesController],
    providers: [PropertiesService, LocationService, CityService]
})
export class PropertiesModule {}
