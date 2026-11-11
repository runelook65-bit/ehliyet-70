# Ehliyet 70

Ehliyet sınavına hazırlık odaklı, mobil öncelikli Türkçe web uygulaması.

> **Durum: prototip.** Bu depo App Store yayını veya ücretli abonelik için hazır değildir. Test, soru bankası ve ödeme akışı yayın öncesi tamamlanmalıdır.

## Mevcut işlevler

- Ana sayfa, Konular, Öğren, Sınav, Gelişim sekmeleri
- Dört alan: Trafik ve Çevre, İlk Yardım, Motor ve Araç Tekniği, Trafik Adabı
- 45 örnek soru ve cevap açıklamaları
- 20 soruluk / 25 dakikalık **prototip** deneme sınavı
- Günlük soru, yanlışlar, öğrenme notları ve aralıklı tekrar
- Yerel cihazda ilerleme, oyunlaştırma ve profil oluşturma
- Premium paket **arayüzü ve demo erişim anahtarı** (gerçek ödeme yok)
- Yeni beyaz/kırmızı/siyah ikon; Apple Touch Icon ve PWA manifest

## Çalıştırma

Sıfır bağımlılıklı statik dağıtım:

```bash
python3 -m http.server 8080
```

Tarayıcıda http://localhost:8080 adresini açın. Bu HTML uygulamasında sunucu gerekmez, ancak dosya sistemi yerine HTTP üzerinden çalıştırmak ikon/manifest davranışını daha tutarlı hale getirir.

## Doğrulama

```bash
node tests/smoke.test.cjs
```

Bu test; belge, soru örnekleri, manifest/ikon dosyaları ve JS sözdizimini denetler. Kapsamlı etkileşim, erişilebilirlik, iOS cihaz ve ödeme testlerinin yerini almaz.

## Kritik açıklar

1. **Resmî sınav simülasyonu değil:** Uygulama şu an 20 soru / 25 dakika ve toplam 45 örnek soru içeriyor. Resmî uygulama formatını ve içerik dağılımını kaynak üzerinden doğrulayın, ardından 50 soru / 45 dakika hedefi için bankayı yeterince büyütün. Bugünkü sınavı 'resmî deneme' diye pazarlamayın.
2. **Ödeme yapılmıyor:** 7 günlük deneme ve Premium geçişi localStorage üzerinde demo olarak kurgulanmış. `ppro` eylemi herhangi bir gerçek makbuz doğrulaması yapmadan `S.pro.plan` değiştiriyor. Sunucu ve StoreKit 2/Apple In-App Purchase olmadan gelir modeli açılmamalı.
3. **Kalıcı hesap ve senkronizasyon yok:** `localStorage` silinirse ilerleme kaybolabilir.
4. **Liderlik verisi örnek:** `RIVALS` dizisi sabit kullanıcıları içeriyor. Gerçek kullanıcı sıralaması olarak sunulmamalı.
5. **İçerik doğrulaması:** Soruların güncelliği, özellikle mevzuat / ilk yardım bilgileri, konu uzmanı kontrolünden geçmeli. Sorular resmî MEB çıkmış sorular gibi sunulmamalı.
6. **Tek dosyalı mimari:** Soru bankası, UI, CSS, state ve ödeme önizlemesi tek dosyada; modülerleştirilmeli.

## Yayın stratejisi

- **Aşama 1:** Web/PWA beta, sınırlı gerçek kullanıcı ve kullanışlılık testi.
- **Aşama 2:** Soru bankası / açıklamalar / test güvenirliği; etkileşim ve erişilebilirlik regresyonları.
- **Aşama 3:** Hesap, veri senkronizasyonu, gizlilik ve iOS uyarlaması (Capacitor değerlendirmesi veya native UI).
- **Aşama 4:** Apple IAP / StoreKit 2, sunucu tarafı abonelik ve deneme durumunun doğrulanması, App Store değerlendirmesi.

Ayrıntılı iş sırası için [ROADMAP.md](ROADMAP.md) dosyasını inceleyin.

## Lisans

Yayınlama/lisans seçimi henüz belirtilmediği için otomatik olarak açık kaynak lisansı eklenmedi. GitHub'da görünürlük ayarlarken bu durumu dikkate alın.