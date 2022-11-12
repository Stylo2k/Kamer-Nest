class StatsDto {
    city: string;
}

interface Stats {
    mean: number;
    median: number;
    standardDeviation: number;
}

interface StatsResponse {
    [key: string] : Stats
}

export {
    StatsDto,
    StatsResponse
}