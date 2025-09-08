import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Badge from './ui/Badge';
import { degToArrow, ratingDots } from '../lib/format';
import { mono } from '../theme/colors';


export default function SpotCard({
    name,
    region,
    best,
}: {
    name: string;
    region: string;
    best: { swellHeightM: number; periodS: number; windKts: number; windDir: number; tide: string; rating: number; time: string; };
}) {
    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.spotName}>{name}</Text>
                    <Text style={styles.spotRegion}>{region}</Text>
                </View>
                <Text style={styles.rating} accessibilityLabel={`Note ${best.rating} sur 5`}>{ratingDots(best.rating)}</Text>
            </View>
            <View style={styles.row}>
                <Badge label={`${best.swellHeightM.toFixed(1)} m / ${best.periodS}s`} hint="Houle / Période" />
                <Badge label={`${best.windKts} nds ${degToArrow(best.windDir)}`} hint="Vent" />
                <Badge label={best.tide} hint="Marée" />
            </View>
            <Text style={styles.bestTime}>Meilleur créneau : {best.time}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        backgroundColor: mono.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: mono.border,
    },
    topRow: { flexDirection: 'row', justifyContent: 'space-between' },
    spotName: { color: mono.text, fontSize: 18, fontWeight: '700' },
    spotRegion: { color: mono.textSoft, marginTop: 2 },
    row: { flexDirection: 'row', gap: 8, marginTop: 12 },
    bestTime: { color: '#E5E5E5', marginTop: 12, fontStyle: 'italic' },
    rating: { color: mono.text, fontSize: 16, fontWeight: '700', letterSpacing: 1 },
});