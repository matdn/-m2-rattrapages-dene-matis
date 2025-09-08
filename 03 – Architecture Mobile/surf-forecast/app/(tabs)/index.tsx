import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, RefreshControl, SafeAreaView } from 'react-native';

const RAW_SPOTS = [
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

function summarizeSpot(spot: any) {
  const best = [...spot.forecast].sort((a, b) => b.rating - a.rating)[0];
  return { id: spot.id, name: spot.name, region: spot.region, best };
}
function degToArrow(deg: number) {
  const dirs = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
  const ix = Math.round(((deg % 360) / 45)) % 8;
  return dirs[ix];
}
function ratingToStars(r: number) {
  return '★'.repeat(r) + '☆'.repeat(5 - r);
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [sortMode, setSortMode] = useState<'rating' | 'swell' | 'wind'>('rating');

  const data = useMemo(() => {
    const summaries = RAW_SPOTS.map(summarizeSpot);
    return summaries.sort((a, b) => {
      if (sortMode === 'rating') return b.best.rating - a.best.rating;
      if (sortMode === 'swell') return b.best.swellHeightM - a.best.swellHeightM;
      if (sortMode === 'wind') return a.best.windKts - b.best.windKts;
      return 0;
    });
  }, [sortMode]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>🌊 Surf Prévisions</Text>
      <Text style={styles.subtitle}>Données simulées • Aujourd'hui</Text>
      <View style={styles.sortRow}>
        <SortButton label="Meilleure note" active={sortMode === 'rating'} onPress={() => setSortMode('rating')} />
        <SortButton label="+ Houle" active={sortMode === 'swell'} onPress={() => setSortMode('swell')} />
        <SortButton label="- Vent" active={sortMode === 'wind'} onPress={() => setSortMode('wind')} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        renderItem={({ item }) => (
          <Pressable onPress={() => console.log('Spot:', item.id)}>
            <SpotCard item={item} />
          </Pressable>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <Footer />
    </SafeAreaView>
  );
}

function SortButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void; }) {
  return (
    <Pressable onPress={onPress} style={[styles.sortBtn, active && styles.sortBtnActive]}>
      <Text style={[styles.sortBtnText, active && styles.sortBtnTextActive]}>{label}</Text>
    </Pressable>
  );
}

function SpotCard({ item }: { item: any; }) {
  const { name, region, best } = item;
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={styles.spotName}>{name}</Text>
          <Text style={styles.spotRegion}>{region}</Text>
        </View>
        <Text style={styles.rating}>{ratingToStars(best.rating)}</Text>
      </View>

      <View style={styles.row}>
        <Badge label={`${best.swellHeightM.toFixed(1)} m / ${best.periodS}s`} hint="Houle / Période" />
        <Badge label={`${best.windKts} nds ${degToArrow(best.windDir)}`} hint="Vent" />
        <Badge label={best.tide} hint="Marée" />
      </View>

      <Text style={styles.bestTime}>🎯 Meilleur créneau: {best.time}</Text>
    </View>
  );
}

function Badge({ label, hint }: { label: string; hint: string; }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeMain}>{label}</Text>
      <Text style={styles.badgeHint}>{hint}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Données factices — modifiez RAW_SPOTS dans index.tsx</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220' },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, backgroundColor: '#0b1220' },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#9fb3c8', marginTop: 2 },
  sortRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  sortBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#111a2e', borderWidth: 1, borderColor: '#1b2744' },
  sortBtnActive: { backgroundColor: '#1f2a44', borderColor: '#35518a' },
  sortBtnText: { color: '#b9c6d2', fontWeight: '600' },
  sortBtnTextActive: { color: 'white' },
  card: { marginHorizontal: 16, marginVertical: 8, padding: 14, backgroundColor: '#0f192f', borderRadius: 16, borderWidth: 1, borderColor: '#1b2744' },
  spotName: { color: 'white', fontSize: 18, fontWeight: '700' },
  spotRegion: { color: '#9fb3c8', marginTop: 2 },
  row: { flexDirection: 'row', gap: 8, marginTop: 12 },
  badge: { flex: 1, backgroundColor: '#121f3c', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: '#1e2c52' },
  badgeMain: { color: 'white', fontWeight: '700', textAlign: 'center' },
  badgeHint: { color: '#8aa0b8', fontSize: 12, textAlign: 'center', marginTop: 2 },
  bestTime: { color: '#d2e0f0', marginTop: 12, fontStyle: 'italic' },
  rating: { color: '#ffd36a', fontSize: 16, fontWeight: '700' },
  footer: { padding: 12, alignItems: 'center' },
  footerText: { color: '#6f89a6', fontSize: 12 },
});
