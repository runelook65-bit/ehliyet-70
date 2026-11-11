# Ehliyet 70 — Ürün ve Geliştirme Yol Haritası

**Tarih:** 11 Kasım 2026  
**Hedef:** Güvenilir sınav hazırlığı deneyimini doğrulayarak iOS'a geçmek.  
**Kapsam:** Web/PWA beta, 53 özgün örnek soru, sınav motoru, test ve iOS'a geçiş.

## 11 Kasım 2026 — Tamamlananlar

- ✅ 2026 MEB biçiminde 50 soru / 45 dakika; trafik 23, ilk yardım 12, araç tekniği 9, trafik adabı 6.
- ✅ 53 sorudan tekrarsız seçim, geçer puan, süre, eksik/çift kayıt birim testleri.
- ✅ Örnek deneme olarak açık etiketleme; soruların **resmî MEB soruları olmadığı** uyarısı.
- ✅ Premium **ücretsiz beta** olarak açıldı; sahte satın alma/yerel PRO erişim anahtarı kaldırıldı.
- ✅ Sıralama gerçek kullanıcı değil, görünür demo etiketi taşıyor.
- ✅ KGM güncel otoyol limitlerine göre soru t1/t3 açıklamaları düzeltildi.
- ✅ GitHub Actions ve Chromium'da 50 soruluk test akışı başarılı.
- ⚠️ 53 örnek sorunun uzman onayı, gerçek iPhone testleri ve premium PNG ikonlarının GitHub'a aktarılması bekliyor.

Kod: [PR #4](https://github.com/runelook65-bit/ehliyet-70/pull/4) · [İçerik denetimi](CONTENT_AUDIT.md)


## Trafik senaryosu prototipi

- ✅ Üç orijinal SVG animasyonlu trafik durumu, tekrar oynatma/duraklatma, dört seçeneğe göre cevap ve açıklama.
- ✅ Senaryo ilerlemesi mevcut yerel kayıt içerisinde `visualScenarios` altında tutuluyor; sınav puanlarını değiştirmiyor.
- ✅ `prefers-reduced-motion`, klavye odakları, metinsel senaryo açıklaması ve canlı geri bildirim eklendi.
- ✅ REA–Ghidra için kurulum öncesi kontrol ve izinli analiz yönergesi hazırlandı; gerçek rakip ikili dosyası incelenmedi.
- ⏳ Gerçek video, sesli betimleme, iPhone/VoiceOver uçtan uca testi ve eğitmen doğrulaması yapılmadı.

## Başarı ölçütleri

- Çözülen her sorunun kaydı; denemelerde hata/crash olmaması
- İçerik doğrulama oranı %100 ve her soruda kaynak/güncelleme tarihi
- Öğrencinin ilk 3 dakikada deneme çözmeye başlayabilmesi
- Beta sırasında kullanıcı davranışlarına göre D1/D7 geri dönüş, soru tamamlama oranı ve 70+ puana ilerleme
- Ücretli ürün açılmadan önce satın alma/geri yükleme/iptal senaryolarının testten geçmesi

## P0 — Yayın engelleri (önce)

| İş | Kabul ölçütü | Öncelik |
|---|---|---|
| ~~20/25 prototip sınavını kaldır ve örnek deneme etiketle~~ | ✅ 50/45 bağımsız örnek deneme, kaynak bildirimi | Tamamlandı |
| ~~50 soru / 45 dakika akışı~~ | ✅ Teknik format ve testler tamam; **içerik doğrulaması ayrı bekliyor** | Teknik tamamlandı |
| 53 özgün örnek soruyu konu uzmanına incelet | Mevzuat/ilk yardım doğruluğu ve kaynak tarihi doğrulanmalı | P0 · Açık |
| ~~Demo Premium anahtarını gerçek satın alma olarak sunma~~ | ✅ Ücretsiz beta, planlar örnek | Tamamlandı |
| ~~Sabit `RIVALS` verisinin statüsü~~ | ✅ Örnek liderlik açık etiketli | Tamamlandı |

## P1 — Teknik istikrar / beta

1. `questions`, `exam`, `progress`, `premium`, `ui` modüllerine ayır; tasarımı koru.
2. Bankayı JSON + şema doğrulama ile yönet; soru ID'si, alanı, açıklaması, sürümü, kaynağı, doğrulanma tarihi ekle.
3. Sınav durum makinesini test et: zaman aşımı, boş soru, geri gitme, uygulamanın arka plana alınması, çift bitirme, yenileme.
4. SRS ve zayıf konu analizlerini birim testleriyle sabitle; verileri farklı cihaz / tarih / saat dilimleriyle kontrol et.
5. Erişilebilirlik: VoiceOver etiketleri, 44pt dokunma hedefleri, Dynamic Type, kontrast ve reduce-motion.
6. Hata yakalama, anonim kullanım ölçümü, KVKK aydınlatma ve analitik onay modeli kur.
7. PWA: çevrimdışı kullanım gerekiyorsa cache sürüm stratejisi ekle; şu an service worker yok.

## P2 — Ürün değerini artırma

1. 500+ **doğrulanmış özgün** soruyla konu kapsamını güçlendir; sayı hedefi içerik doğruluğundan önce gelmemeli.
2. Gerçek sınava benzer denemeler (resmî materyal olmadan, özgün içerik); açık açıklamalı yanlış tekrarları.
3. ✅ Üç başlangıç animasyonlu trafik senaryosu; sonraki aşamada uzman onayı ve daha fazla sahne.
4. 7–14 günlük kişisel çalışma planı; zayıf konulara göre akıllı tekrar.
5. Video değil, önce hızlı yüklenen kısa açıklamalı görsel dersler.
6. Kullanıcı araştırması: 15–20 sürücü adayıyla görev tabanlı beta.

## P3 — iOS ve ücretlendirme

1. iOS hedef mimarisini seç: mevcut web ekranlarını kısa vadede Capacitor ile test et; WebView ile uygulama değeri oluşmazsa native UI'ya geç.
2. Apple Touch Icon 180px / App Store ikonu 1024px / splash / cihaz testleri.
3. StoreKit 2 üzerinden Apple In-App Purchase; üyeliklerin geri yüklenmesi ve abonelik değişimi.
4. Sunucu tarafı işlem doğrulama, erişim kuralları ve kullanıcı hesabı — `localStorage` tek doğruluk kaynağı olmamalı.
5. Uygulama gizliliği, destek kanalı, yaş derecelendirme, silme işlemi ve test hesabı gereklilikleri.
6. TestFlight: en az 20 beta kullanıcısı, cihaz/hata takibi, satın alma sandbox testleri.
7. App Store ekran görüntüleri, açıklama, ASO ve değerlendirme kontrol listesi.

## P4 — Büyüme / gelir

- Ücretsiz deneme + isteğe bağlı tek seferlik Premium için A/B fiyat testi; gerçek dönüşüm olmadan fiyat sabitleme.
- Sürücü kursu paneli: kurum koduyla aktivasyon, sınıf raporları (kişisel veri izni gerekli).
- Organik edinim: kısa öğretici videolar, ders içerikleri, trafik levhaları araması.
- Ölç: kurulum → ilk soru → ilk tamamlanan deneme → D7 → Premium ödeme → iade / destek.

## Sprint önerisi (teslim kriteriyle)

| Sprint | Öncelikli çıktı | Tamamlandı denmesi için |
|---|---|---|
| 1 | Soru bankası denetimi + sınav kuralları + demo etiketleri | 50/45 simülasyon ancak doğrulanmış yeterli içerikle açılıyor |
| 2 | Modüler mimari + otomatik testler | GitHub Actions CI yeşil, mobil regresyon senaryoları geçiyor |
| 3 | İleri çalışma + erişilebilirlik + beta | Pilot kullanıcıların en az %80'i ilk denemeyi yardım almadan bitiriyor |
| 4 | iOS proof-of-concept + TestFlight | Gerçek iPhone'da kararlı ve Apple yönergelerine uygun deneyim |
| 5 | Apple IAP + hesaplar + analitik | Sandbox satın al / geri yükle / iptal testleri ve gizlilik kontrolü geçiyor |

**Kapsam dışı:** İlk sürümde yapay zekâ koçu, canlı topluluk sıralaması, yüzlerce animasyon ve büyük servis altyapısı. İçerik doğruluğu ve sınav güvenilirliği daha yüksek önceliklidir.