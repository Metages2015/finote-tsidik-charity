import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';

const copy = {
  en: {
    language: 'አማርኛ', title: 'Finote Tsidik Charity Association',
    subtitle: 'Beneficiary Management System',
    introTitle: 'Serving our community with care',
    intro: 'A secure platform for managing assistance, beneficiary records, and organizational teams.',
    signIn: 'Authorized user sign in', publicLinks: 'Connect with us',
    website: 'Website', social: 'Social media', video: 'Introduction video',
    api: 'Backend connection', checking: 'Checking…', connected: 'API reachable',
    failed: 'API not reachable', next: 'Phase 1 foundation',
    footer: 'Public information only. Beneficiary records are not displayed here.'
  },
  am: {
    language: 'English', title: 'የፍኖተ ፅድቅ በጎ አድራጎት ማኅበር',
    subtitle: 'የተጠቃሚዎች አስተዳደር ሥርዓት',
    introTitle: 'ማኅበረሰባችንን በእንክብካቤ ማገልገል',
    intro: 'የተረጂዎችን መረጃ፣ የድጋፍ አሰጣጥን እና የቡድኖችን አስተዳደር ለመደገፍ የተዘጋጀ ሥርዓት።',
    signIn: 'ለተፈቀደላቸው ተጠቃሚዎች መግቢያ', publicLinks: 'ከእኛ ጋር ይገናኙ',
    website: 'ድረ ገጽ', social: 'ማኅበራዊ ሚዲያ', video: 'የመግቢያ ቪዲዮ',
    api: 'ከአገልጋዩ ጋር ግንኙነት', checking: 'በመፈተሽ ላይ…', connected: 'API ተገናኝቷል',
    failed: 'API አልተገናኘም', next: 'የመጀመሪያ ደረጃ',
    footer: 'ይህ ገጽ ይፋዊ መረጃን ብቻ ያሳያል። የተረጂዎች መረጃ እዚህ አይታይም።'
  }
};

export default function HomeScreen() {
  const [lang, setLang] = useState<'en' | 'am'>('am');
  const [apiState, setApiState] = useState<'checking' | 'ok' | 'error'>('checking');
  const t = copy[lang];

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/health`)
      .then((r) => { if (!r.ok) throw new Error('API error'); return r.json(); })
      .then(() => { if (alive) setApiState('ok'); })
      .catch(() => { if (alive) setApiState('error'); });
    return () => { alive = false; };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.logo}><Text style={styles.logoText}>ፍ</Text></View>
          <Pressable accessibilityRole="button" onPress={() => setLang(lang === 'am' ? 'en' : 'am')} style={styles.langButton}>
            <Text style={styles.langText}>{t.language}</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>{t.title}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>

        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>FINOTE TSIDIK</Text>
          <Text style={styles.heroTitle}>{t.introTitle}</Text>
          <Text style={styles.heroBody}>{t.intro}</Text>
          <View style={styles.videoPlaceholder}>
            <Text style={styles.play}>▶</Text>
            <Text style={styles.videoText}>{t.video}</Text>
            <Text style={styles.smallMuted}>Video content can be configured by the System Admin in a later phase.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.publicLinks}</Text>
          <View style={styles.linkRow}>
            <View style={styles.linkPill}><Text style={styles.linkText}>🌐  {t.website}</Text></View>
            <View style={styles.linkPill}><Text style={styles.linkText}>🔗  {t.social}</Text></View>
          </View>
          <Text style={styles.smallMuted}>Public links will become administrator-managed settings in a later phase.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.api}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.dot, apiState === 'ok' ? styles.dotOk : apiState === 'error' ? styles.dotError : styles.dotPending]} />
            <Text style={styles.statusText}>{apiState === 'checking' ? t.checking : apiState === 'ok' ? t.connected : t.failed}</Text>
          </View>
          {apiState === 'error' && <Text style={styles.smallMuted}>Check backend startup and EXPO_PUBLIC_API_URL in mobile/.env.</Text>}
        </View>

        <Pressable accessibilityRole="button" onPress={() => { /* Login is implemented in Phase 2 */ }} style={styles.signIn}>
          <Text style={styles.signInText}>{t.signIn}  →</Text>
        </Pressable>
        <Text style={styles.footer}>{t.footer}</Text>
        <Text style={styles.version}>{t.next} · v0.1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F7FB' },
  container: { padding: 20, paddingBottom: 36, maxWidth: 680, width: '100%', alignSelf: 'center' },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  logo: { width: 52, height: 52, borderRadius: 17, backgroundColor: '#173B35', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  langButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#E3ECE8' },
  langText: { color: '#173B35', fontWeight: '700' },
  title: { color: '#172B28', fontSize: 25, fontWeight: '800', lineHeight: 34 },
  subtitle: { color: '#66736F', fontSize: 15, marginTop: 5, marginBottom: 22 },
  hero: { backgroundColor: '#173B35', borderRadius: 24, padding: 22, marginBottom: 16 },
  heroEyebrow: { color: '#B9D8CB', fontSize: 11, letterSpacing: 2, fontWeight: '800', marginBottom: 12 },
  heroTitle: { color: '#FFFFFF', fontSize: 25, lineHeight: 32, fontWeight: '800', marginBottom: 10 },
  heroBody: { color: '#E2ECE8', fontSize: 15, lineHeight: 23, marginBottom: 20 },
  videoPlaceholder: { backgroundColor: '#28534B', borderRadius: 16, padding: 18, alignItems: 'center' },
  play: { color: '#FFFFFF', fontSize: 28, marginBottom: 6 },
  videoText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  smallMuted: { color: '#7C8985', fontSize: 12, lineHeight: 18, marginTop: 8 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#E7ECE9' },
  cardTitle: { color: '#20352F', fontSize: 16, fontWeight: '800', marginBottom: 12 },
  linkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  linkPill: { backgroundColor: '#F0F5F2', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14 },
  linkText: { color: '#28534B', fontWeight: '700', fontSize: 13 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  dotOk: { backgroundColor: '#198754' },
  dotError: { backgroundColor: '#C43C35' },
  dotPending: { backgroundColor: '#D69E2E' },
  statusText: { color: '#34453F', fontSize: 14, fontWeight: '600' },
  signIn: { backgroundColor: '#D5A84F', borderRadius: 16, padding: 17, alignItems: 'center', marginTop: 2 },
  signInText: { color: '#172B28', fontWeight: '800', fontSize: 15 },
  footer: { color: '#687671', fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 20 },
  version: { color: '#8A9691', fontSize: 11, textAlign: 'center', marginTop: 10 }
});
