import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { LocationService } from './location/location.service';
import { CityService } from './city/city.service';
import { StatsService } from './stats/stats.service';

@Module({
    controllers: [PropertiesController],
    providers: [PropertiesService, LocationService, CityService, StatsService]
})
export class PropertiesModule {}
