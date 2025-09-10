import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, RefreshControl, SafeAreaView } from 'react-native';
import { SPOTS, summarizeSpot } from '../../constants/spots';
import SortBar, { SortMode } from '../../components/SortBar';
import SpotCard from '../../components/SpotCard';
import { mono } from '../theme/colors';
import { useFavorites } from '../favorites/FavoritesContext';
import { useRouter } from 'expo-router';



export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('rating');
  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const { isFavorite, favorites } = useFavorites();

  const data = useMemo(() => {
    let summaries = SPOTS.map(summarizeSpot);
    if (showOnlyFav) {
      summaries = summaries.filter((s) => isFavorite(s.id));
    }
    return summaries.sort((a, b) => {
      if (sortMode === 'rating') return b.best.rating - a.best.rating;
      if (sortMode === 'swell') return b.best.swellHeightM - a.best.swellHeightM;
      if (sortMode === 'wind') return a.best.windKts - b.best.windKts;
      return 0;
    });
  }, [sortMode, showOnlyFav, favorites]);

  let summaries = SPOTS.map(summarizeSpot);
  if (showOnlyFav) {
    summaries = summaries.filter((s) => isFavorite(s.id));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);


  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>SURF</Text>
      <Text style={styles.subtitle}>Données simulées • Aujourd'hui</Text>
      <SortBar
        mode={sortMode}
        onChange={setSortMode}
        showOnlyFav={showOnlyFav}
        toggleOnlyFav={() => setShowOnlyFav((v) => !v)}
      />

    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/spot/${item.id}`)} accessibilityRole="button">
            <SpotCard id={item.id} name={item.name} region={item.region} best={item.best} />
          </Pressable>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mono.bg },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, backgroundColor: mono.bg },
  title: { color: mono.text, fontSize: 24, fontWeight: '800', letterSpacing: 2 },
  subtitle: { color: mono.muted, marginTop: 2 },
  footer: { padding: 12, alignItems: 'center' },
  footerText: { color: '#9A9A9A', fontSize: 12 },
});