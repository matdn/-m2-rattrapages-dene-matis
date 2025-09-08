import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabsLayout() {
  const scheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: scheme === 'dark' ? '#000' : '#000' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#1A1A1A' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8A8A8A',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Surf' }} />
    </Tabs>
  );
}