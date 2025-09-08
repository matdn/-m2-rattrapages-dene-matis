export type ForecastSlot = {
    time: string;
    swellHeightM: number;
    periodS: number;
    windKts: number;
    windDir: number;
    tide: string;
    rating: number;
};


export type Spot = {
    id: string;
    name: string;
    region: string;
    forecast: ForecastSlot[];
};

export const SPOTS: Spot[] = [
    {
        id: 'biarritz-grande-plage',
        name: 'Biarritz — Grande Plage',
        region: 'Pays Basque',
        forecast: [
            { time: 'Matin', swellHeightM: 1.2, periodS: 11, windKts: 6, windDir: 45, tide: 'montante', rating: 3 },
            { time: 'Après-midi', swellHeightM: 1.5, periodS: 12, windKts: 10, windDir: 310, tide: 'haute', rating: 4 },
            { time: 'Soir', swellHeightM: 1.3, periodS: 10, windKts: 4, windDir: 20, tide: 'descendante', rating: 3 },
        ],
    },
    {
        id: 'hossegor-la-nord',
        name: 'Hossegor — La Nord',
        region: 'Landes',
        forecast: [
            { time: 'Matin', swellHeightM: 2.1, periodS: 14, windKts: 8, windDir: 80, tide: 'mi-marée', rating: 5 },
            { time: 'Après-midi', swellHeightM: 1.8, periodS: 13, windKts: 14, windDir: 270, tide: 'basse', rating: 3 },
            { time: 'Soir', swellHeightM: 1.6, periodS: 12, windKts: 6, windDir: 40, tide: 'montante', rating: 4 },
        ],
    },
    {
        id: 'lacanau',
        name: 'Lacanau',
        region: 'Gironde',
        forecast: [
            { time: 'Matin', swellHeightM: 1.0, periodS: 9, windKts: 2, windDir: 10, tide: 'basse', rating: 2 },
            { time: 'Après-midi', swellHeightM: 1.3, periodS: 10, windKts: 12, windDir: 200, tide: 'montante', rating: 2 },
            { time: 'Soir', swellHeightM: 1.1, periodS: 9, windKts: 5, windDir: 160, tide: 'haute', rating: 3 },
        ],
    },
];


export function summarizeSpot(spot: Spot) {
    const best = [...spot.forecast].sort((a, b) => b.rating - a.rating)[0];
    return { id: spot.id, name: spot.name, region: spot.region, best } as const;
}