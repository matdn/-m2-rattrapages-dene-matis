import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { mono } from '../theme/colors';


export type SortMode = 'rating' | 'swell' | 'wind';


export default function SortBar({ mode, onChange }: { mode: SortMode; onChange: (m: SortMode) => void; }) {
    return (
        <View style={styles.row}>
            <Pill label="Meilleure note" active={mode === 'rating'} onPress={() => onChange('rating')} />
            <Pill label="+ Houle" active={mode === 'swell'} onPress={() => onChange('swell')} />
            <Pill label="- Vent" active={mode === 'wind'} onPress={() => onChange('wind')} />
        </View>
    );
}


function Pill({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void; }) {
    return (
        <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}>
            <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 8, marginTop: 12 },
    pill: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: mono.pill,
        borderWidth: 1,
        borderColor: mono.border,
    },
    pillActive: { backgroundColor: '#0F0F0F', borderColor: '#2A2A2A' },
    pillText: { color: '#B5B5B5', fontWeight: '600' },
    pillTextActive: { color: mono.text },
});