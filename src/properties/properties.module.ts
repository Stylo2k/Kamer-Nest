import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { LocationService } from './location/location.service';

@Module({
    controllers: [PropertiesController],
    providers: [PropertiesService, LocationService]
})
export class PropertiesModule {}
