import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mono } from '../../theme/colors';


export default function Badge({ label, hint }: { label: string; hint?: string; }) {
    return (
        <View style={styles.badge}>
            <Text style={styles.main} numberOfLines={1}>{label}</Text>
            {hint ? <Text style={styles.hint}>{hint}</Text> : null}
        </View>
    );
}


const styles = StyleSheet.create({
    badge: {
        flex: 1,
        backgroundColor: mono.pill,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: mono.border,
    },
    main: { color: mono.text, fontWeight: '700', textAlign: 'center' },
    hint: { color: mono.textSoft, fontSize: 12, textAlign: 'center', marginTop: 2 },
});