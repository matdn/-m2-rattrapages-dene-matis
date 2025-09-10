import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SPOTS } from '../../../constants/spots';

type SpotComment = {
  text: string;
  image: string | null;
};

export default function SpotDetail() {
  const { id } = useLocalSearchParams();
  const spotId = Array.isArray(id) ? id[0] : id;
  const spot = SPOTS.find((s) => s.id === spotId);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [comments, setComments] = useState<SpotComment[]>([]);

  const handleAddComment = async () => {
    if (!comment && !image) return;
    setComments([...comments, { text: comment, image }]);
    setComment('');
    setImage(null);
  };
  console.log('SpotDetail render', { id, spot });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!spot) return <Text>Spot non trouvé</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      {/* Header Spot */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: '#e0e0e0' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 4 }}>{spot.name}</Text>
        <Text style={{ fontSize: 16, color: '#444', marginBottom: 8 }}>{spot.region}</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 8 }}>Prévisions</Text>
        {spot.forecast.map((f, idx) => (
          <View key={idx} style={{ backgroundColor: '#fafafa', borderRadius: 10, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#e0e0e0' }}>
            <Text style={{ color: '#111', fontWeight: 'bold' }}>{f.time}</Text>
            <Text style={{ color: '#222' }}>🌊 Houle : <Text style={{ fontWeight: 'bold' }}>{f.swellHeightM} m</Text> • {f.periodS} s</Text>
            <Text style={{ color: '#222' }}>💨 Vent : <Text style={{ fontWeight: 'bold' }}>{f.windKts} kts</Text> ({f.windDir}°)</Text>
            <Text style={{ color: '#222' }}>🌙 Marée : <Text style={{ fontWeight: 'bold' }}>{f.tide}</Text></Text>
            <Text style={{ color: '#111', fontWeight: 'bold' }}>⭐ {f.rating}/5</Text>
          </View>
        ))}
      </View>

      {/* Formulaire d'ajout de commentaire et image */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 18, borderWidth: 1, borderColor: '#e0e0e0' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 8 }}>Ajouter un commentaire</Text>
        <TextInput
          placeholder="Ajouter un commentaire..."
          value={comment}
          onChangeText={setComment}
          style={{ borderWidth: 1, borderColor: '#bbb', padding: 8, borderRadius: 8, marginBottom: 8, backgroundColor: '#fafafa', color: '#111' }}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 8, borderRadius: 8 }} />
        )}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button title="Choisir une image" onPress={pickImage} color="#222" />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Ajouter" onPress={handleAddComment} color="#111" />
          </View>
        </View>
      </View>

      {/* Liste des commentaires */}
      <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e0e0e0' }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111', marginBottom: 12 }}>Commentaires</Text>
        {comments.length === 0 && <Text style={{ color: '#888' }}>Aucun commentaire pour ce spot.</Text>}
        {comments.map((c, idx) => (
          <View key={idx} style={{ marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 12 }}>
            {c.image && <Image source={{ uri: c.image }} style={{ width: 80, height: 80, borderRadius: 8, marginBottom: 6 }} />}
            <Text style={{ color: '#111' }}>{c.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}