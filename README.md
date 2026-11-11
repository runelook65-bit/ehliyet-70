# Ehliyet 70

Ehliyet sınavına hazırlık odaklı, mobil öncelikli Türkçe web uygulaması.

> **Durum: prototip.** Bu depo App Store yayını veya ücretli abonelik için hazır değildir. Test, soru bankası ve ödeme akışı yayın öncesi tamamlanmalıdır.

## Mevcut işlevler

- Ana sayfa, Konular, Öğren, Sınav, Gelişim sekmeleri
- Trafik ve Çevre, İlk Yardım, Araç Tekniği, Trafik Adabı alanlarında **53 özgün örnek soru**
- 2026 MEB sınav biçimine göre **50 soru, 45 dakika**, doğru kategori dağılımıyla benzersiz soru seçimi
- Kaynak kontrolüne dayanan sınav kuralları modülü ve test edilebilir puanlama (`js/exam-rules.js`)
- Yanlış tekrarları, öğrenme notları, aralıklı tekrar, yıldızlar ve yerel ilerleme
- **3 özgün animasyonlu trafik senaryosu**: yaya geçidi, kırmızı ışık ve takip mesafesi. SVG canlandırması, 4 seçenekli karar, açıklama ve yerel deneme kaydı ([çalıştır](traffic-scenarios.html))
- REA / Ghidra için [izinli analiz laboratuvarı yönergesi](docs/REA-GHIDRA-LAB.md) ve salt okunur [hazırlık kontrolü](scripts/rea-preflight.sh). **Üçüncü taraf uygulama ikili dosyası analiz edilmedi.**
- **Beta boyunca tüm özellikler ücretsiz**; ödeme, mağaza üyeliği ve güvenilir kullanıcı senkronizasyonu henüz yok
- Liderlik tablosu gerçek kullanıcı verisi değil, **açıkça etiketlenmiş örnek veridir**
- **iPhone ana ekrana ekleme ikonu:** Gönderilen 70 kadranlı görselin 180×180 PNG sürümü `assets/apple-touch-icon-180.png` içinde; HTML `<head>` bölümünde `apple-touch-icon` ve PWA manifestiyle bağlı. SVG ikon diğer platformlar için yedek olarak korunuyor.
- [İçerik doğrulama kaydı](CONTENT_AUDIT.md) ve [yol haritası](ROADMAP.md)

## Çalıştırma

Sıfır bağımlılıklı statik dağıtım:

```bash
python3 -m http.server 8080
```

Tarayıcıda http://localhost:8080 adresini açın. Bu HTML uygulamasında sunucu gerekmez, ancak dosya sistemi yerine HTTP üzerinden çalıştırmak ikon/manifest davranışını daha tutarlı hale getirir.

## Doğrulama

```bash
node tests/smoke.test.cjs
node tests/exam-rules.test.cjs
node tests/scenarios.test.cjs
```

Bu testler; belge, soru örnekleri, animasyonlu senaryoların cevap tutarlılığı, yerel ilerleme kaydı, manifest/SVG ikon dosyası ve JS sözdizimini denetler. Kapsamlı etkileşim, erişilebilirlik, iOS cihaz ve ödeme testlerinin yerini almaz.

## iOS ana ekran ikonu

Gönderilen beyaz, siyah ve kırmızı hız göstergeli özgün görselden 180×180 PNG hazırlandı ve GitHub'a eklendi: [assets/apple-touch-icon-180.png](assets/apple-touch-icon-180.png).

`index.html` ve `traffic-scenarios.html` içindeki `apple-touch-icon` etiketleri PNG dosyasını gösterir. `index.html` içindeki uygulama logosu da bu PNG'yi kullanır. `manifest.webmanifest` PNG ikon ve SVG yedek içerir. iPhone Safari'de **Paylaş → Ana Ekrana Ekle** üzerinden denenmelidir. Eski kısayollar ikon önbelleği nedeniyle yeniden eklenmelidir.

Daha büyük çözünürlükte PNG sürümleri ayrı bir sonraki geliştirme olarak kalır; iPhone cihaz/önbellek testi bu repodaki otomatik testlerle kanıtlanamaz.

## Kritik açıklar

1. **Soru içeriği:** 50 soruluk örnek deneme biçimi çalışıyor, ancak 53 sorunun her biri uzman tarafından doğrulanmadı. Soru tekrarı ve mevzuat güncelliği önemli risklerdir.
2. **Ticari ödeme:** Beta ücretsiz. Gösterilen Premium planları taslaktır; Apple IAP/StoreKit veya sunucu tarafı doğrulama bulunmuyor.
3. **Hesap ve senkronizasyon:** `localStorage` silinirse ilerleme kaybolabilir.
4. **Liderlik:** Diğer yarışmacılar örnek veridir; gerçek kişiler gibi sunulmaz.
5. **Mimari:** UI ve bankanın büyük kısmı tek HTML içinde. Modülerleşme, erişilebilirlik ve gerçek cihaz testi gerekli.
6. **İkonlar:** iPhone ana ekranı için 180×180 PNG gömüldü; 192/512/1024 PNG çıktılarının üretim kullanımına alınması ve gerçek iPhone'da doğrulama hâlâ bekliyor.

## Yayın stratejisi

- **Aşama 1:** Web/PWA beta, sınırlı gerçek kullanıcı ve kullanışlılık testi.
- **Aşama 2:** Soru bankası / açıklamalar / test güvenirliği; etkileşim ve erişilebilirlik regresyonları.
- **Aşama 3:** Hesap, veri senkronizasyonu, gizlilik ve iOS uyarlaması (Capacitor değerlendirmesi veya native UI).
- **Aşama 4:** Apple IAP / StoreKit 2, sunucu tarafı abonelik ve deneme durumunun doğrulanması, App Store değerlendirmesi.

Ayrıntılı iş sırası için [ROADMAP.md](ROADMAP.md) dosyasını inceleyin.

## Lisans

Yayınlama/lisans seçimi henüz belirtilmediği için otomatik olarak açık kaynak lisansı eklenmedi. GitHub'da görünürlük ayarlarken bu durumu dikkate alın.