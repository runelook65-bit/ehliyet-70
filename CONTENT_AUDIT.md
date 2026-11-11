# İçerik denetim kaydı

**Tarih:** 11 Kasım 2026  
**Durum:** Editoryal doğrulama devam ediyor. Yapısal testler, pedagojik/doğruluk incelemesinin yerini tutmaz.

## Sınav biçimi — resmî kaynak doğrulaması

MEB'in 2026 MTSK e-Sınav Kılavuzu (Temmuz 2026 sürümü) uyarınca:

| Ders | Soru |
|---|---:|
| Trafik ve çevre | 23 |
| İlk yardım | 12 |
| Araç tekniği | 9 |
| Trafik adabı | 6 |
| **Toplam** | **50** |

**Süre:** 45 dakika. **Başarı:** 100 üzerinden 70 puan. Yanlış cevap doğruyu eksiltmez.

Kaynak: https://www.meb.gov.tr/meb_iys_dosyalar/2026_07/6a6b50c06daf3993652350_MTSK_e-Sinav_Kilavuzu_2026.pdf (s. 4, 14).

## Mevcut örnek soru bankası

- **53 özgün örnek soru**: Trafik 24 (8 şemalı durum sorusu dahil), ilk yardım 12, motor 9, trafik adabı 8.
- 50 soruluk bir denemede **23 + 12 + 9 + 6** dağılımıyla **50 farklı ID** seçilir.
- Sorular **MEB tarafından yayımlanan gerçek/çıkmış sorular olarak sunulmaz**.
- `js/exam-rules.js` yapısal eksiklik/çift ID/hatalı şık sayısını denetler; **soruların bilimsel ve hukuki doğruluğunu doğrulamaz**.
- Soru havuzu küçük olduğundan tekrarlanan denemelerde soruların büyük kısmı aynı olacaktır. Üretim sürümünden önce kapsam genişletilmelidir.

## Yapılan içerik düzeltmeleri

- **t3**: Otoyollarda otomobillere her yerde 120 km/sa uygulandığı izlenimi kaldırıldı; KGM otoyollarında genel 130 km/sa, Yap-İşlet-Devret otoyollarında 140 km/sa (aksi işaret yoksa) olarak düzeltildi.
- **t1 açıklaması**: Bu ayrım açıklamaya taşındı.
- Kaynak: https://www.kgm.gov.tr/Sayfalar/KGM/SiteTr/Trafik/HizSinirlari.aspx

## Yayın öncesi gerekli denetimler

- [ ] Her soru için yürürlükteki mevzuat veya güvenilir tıbbi/teknik kaynak, kontrol tarihi, editör onayı.
- [ ] İlk yardım: temel yaşam desteği, boğulma, omurga, yanık ve kanama açıklamalarının yetkin eğitmen tarafından denetimi.
- [ ] Trafik: işaret, hız, kavşak, alkol limitleri; değişiklik takip süreci.
- [ ] Motor: araç tekniği sorularının farklı araç türlerine genelleme riski.
- [ ] Tüm sorularda belirsiz seçenek, çoklu doğru ve yanıltıcı açıklama denetimi.
- [ ] Üretim sürümünde test kapsamı, soru çeşitliliği ve erişilebilirlik kontrolleri.

**Not:** 50/45 denemesi **biçim uyumlu bağımsız örnek denemedir**; resmî MEB sınavı veya doğrulanmış soru seti değildir.
