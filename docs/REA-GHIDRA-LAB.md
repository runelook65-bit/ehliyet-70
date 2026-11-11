# REA + Ghidra — izinli karşılaştırmalı ürün analizi laboratuvarı

**Durum (11 Kasım 2026):** Kurulum yönergesi ve ön kontrol betiği hazır. REA/Ghidra burada **çalıştırılmadı**, rakip uygulama ikili dosyası temin veya analiz edilmedi. Sadece App Store ekran görüntüsü görüldü.

## Hedef ve sınır

- Amaç: ehliyet eğitiminde animasyonlu senaryo, quiz akışı, kullanıcı ilerlemesi gibi **gözlemlenebilir davranışları** anlamak ve kendi orijinal uygulamamızı geliştirmek.
- Yalnızca analizine **yetkili olduğunuz** uygulama veya örnek ikili dosyaları kullanın; gerekli izinlere, lisans koşullarına ve yerel mevzuata uyun.
- DRM/şifreleme/erişim korumalarını aşmayın, üçüncü taraf ücretli içeriğini, özgün soru bankasını, video veya başka korunan varlıkları kopyalamayın, gömülü anahtarları kullanmayın, özel kullanıcı bilgilerini çıkarmayın veya sunucuya izinsiz istek göndermeyin.
- İncelemede bilgi/strateji ve kullanıcı davranışı kullanılır; kod, medya ve özgün sorular Ehliyet 70 için yeniden yazılır.

## Ekran görüntüsünden doğrulanabilir olan

App Store ekran görüntüsünde bir trafik sahnesi/video tabanlı soru, dört seçenekli cevap arayüzü, örnek test ekranları ve uygulama içi satın alma ibaresi görünüyor.

**Bilinmeyenler:** Gerçek video formatı, kaynakların paketlenmesi, API uç noktaları, veri şeması, DRM, kullanılan framework, puanlama algoritması, abonelik doğrulaması veya soru bankasının kapsamı. Bunları sadece ekran görüntüsünden çıkardığımızı iddia etmiyoruz.

## Kurulum (kişisel geliştirme bilgisayarında)

REA resmi kaynakları: https://reverseengineeranything.co/ ve https://github.com/morluto/rea  
Ghidra resmi sürümleri: https://github.com/NationalSecurityAgency/ghidra/releases

REA için Node.js (güncel belgelerde 22.19+, 24.11+ ya da 26+) ve npm gerekir. Yerel ikili analizi için yüklü Ghidra ve uygun Java JDK gerekir; REA Ghidra veya Java'yı kendiliğinden kurmaz.

1. Desteklenen macOS/Linux bilgisayarında önce `bash scripts/rea-preflight.sh` çalıştırın. Bu betik yalnızca sürümleri ve ortamı okur, yazılım **kurmaz**.
2. [Resmî REA kurulum talimatlarını](https://reverseengineeranything.co/) gözden geçirin ve `npx rea-agents setup` çalıştırın. Kurulumun önereceği değişiklikleri onaylamadan önce inceleyin.
3. Ghidra kuruluysa terminalinizde (kendi gerçek klasörünüzü kullanın) aşağıdaki gibi ortam yolunu belirtin:

```bash
export GHIDRA_INSTALL_DIR="/absolute/path/to/ghidra_directory"
# Gerekirse:
export JAVA_HOME="/absolute/path/to/jdk"
npx -y rea-agents@latest doctor
```

4. REA ile agent istemcinizde kurulan bağlantıyı kontrol edin. Bir analiz oturumu başlatmak için **yalnızca yetkili, yerel test ikili dosyasını** seçin. Analiz çıktılarında sembol ve çözümlenen sözde kodu kaynak kodun kendisi gibi kabul etmeyin.

### Kanıt kaydı

Her bulguya şu alanları ekleyin:

| Alan | Örnek |
|---|---|
| Artefakt | Yetkili test uygulaması / SHA-256 |
| İzin | Sahibinin yazılı onayı veya sahip olduğumuz örnek |
| İncelenen ekran | Senaryo açılışı, test bitişi |
| Kanıt | Gözlemlenen davranış, yerel sembol, dosya/konum |
| Güven | Kesin gözlem / teknik çıkarım / hipotez |
| Aktarım | Özgün spesifikasyon, test planı, yeniden uygulama |

**Bilinmeyen rakip bulguları Ehliyet 70 gereksinimi olarak sunmayın.**

## İlk özgün geliştirme

- [Animasyonlu trafik senaryoları](../traffic-scenarios.html) — üç telifsiz, kendi SVG animasyonumuz.
- [Senaryo mantığı](../js/scenario-engine.js) — soru, seçenek, açıklama, ilerleme.
- [Testler](../tests/scenarios.test.cjs) — soru tutarlılığı, kalıcı kayıt, invalid input ve sayfa bağlantısı.
- Bunlar **video dosyaları değildir**. İleride lisanslı/orijinal MP4/WebM medya eklenirse transkript, altyazı, performans ve telif testleri gerekecek.

## Gelecek araştırma sırası

1. Sadece App Store ve kullanım arayüzü gözlemi (ekran akışı, hata ve erişilebilirlik).
2. Test cihazında sahibi olduğumuz/izinli örnek uygulamadan davranış analizi.
3. Gerekirse ve yasal yetki varsa, REA + Ghidra ile yerel dosya envanteri ve kod akışı incelemesi.
4. Bulguları **özgün spesifikasyonlara** dönüştür, Ehliyet 70 için temiz uygulama yaz, test et.
