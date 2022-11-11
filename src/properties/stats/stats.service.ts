import { Injectable } from '@nestjs/common';
import { Property } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatsDto, StatsResponse } from './dto';


@Injectable()
export class StatsService {
    constructor(private readonly prismaService : PrismaService) {}
    async getStats(statsReq : StatsDto) {
        const { city } = statsReq;
        let ret : StatsResponse = {};

        let allProperties = await this.prismaService.property.findMany({
            where: {
                city: city
            }
        });

        // (mean, median, standard deviation) for the rental cost
        ret.rent = this.getStatsForProp(allProperties, 'rent');
        ret.deposit = this.getStatsForProp(allProperties, 'deposit');
        ret.areaSq = this.getStatsForProp(allProperties, 'areaSq');
        return ret;
    }

    getStatsForProp(allProperties : Property[], key : keyof Property) {
        let mean = 0;
        let median = 0;
        let standardDeviation = 0;

        // calculate mean
        for (let property of allProperties) {
            let val = property[key];
            if (typeof val === 'number') {
                mean += val;
            }
        }
        mean /= allProperties.length;

        function sortFunc(a : any, b : any) {
            if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                return a[key] - b[key];
            }
            return 0;
        }

        // calculate median
        allProperties.sort(sortFunc);

        if (allProperties.length % 2 === 0) {
            let val = allProperties[allProperties.length / 2][key];
            let val1 = allProperties[allProperties.length / 2 - 1][key];
            if (typeof val === 'number' && typeof val1 === 'number') {
                median = (val + val1) / 2;
            }
        } else {
            let val = allProperties[Math.floor(allProperties.length / 2)][key];
            if (typeof val === 'number') {
                median = val;
            }
        }
        // calculate standard deviation
        for (let property of allProperties) {
            let val = property[key];
            if (typeof val === 'number') {
                standardDeviation += Math.pow(val - mean, 2);
            }
        }
        standardDeviation /= allProperties.length;
        standardDeviation = Math.sqrt(standardDeviation);

        return {
            mean: mean,
            median: median,
            standardDeviation: standardDeviation
        }
    }
}
