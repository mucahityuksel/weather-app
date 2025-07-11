# 🌤️ Weather Application

React, Next.js ve TypeScript kullanılarak geliştirilmiş, anlık hava durumu bilgisi ve geçmiş sorguları gösteren basit bir hava durumu uygulamasıdır.

[Live Demo](https://weather-app-git-main-mucahityuksels-projects.vercel.app/)

---

## 🚀 Özellikler

- Anlık hava durumu verisi görüntüleme
- Sıcaklık birimi (°C / °F) değiştirme
- Geçmiş aramaları listeleme ve detaylarını tekrar görüntüleme
- Responsive tasarım
- TypeScript desteği
- Next.js 15 kullanımı

---

## 🛠️ Kullanılan Teknolojiler

- [Next.js 15](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/) (Deployment için)
- [Swiper](https://swiperjs.com/) (Slider bileşenleri için)
- [Moment.js](https://momentjs.com/) (Tarih formatlama)
- LocalStorage (Geçmiş verileri saklama)

---

## ⚡ Kurulum ve Çalıştırma

1. Depoyu klonlayın:

   ```bash
   git clone https://github.com/mucahityuksel/weather-app.git
   cd weather-app
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Geliştirme ortamında projeyi başlatın:

   ```bash
   npm run dev
   ```

4. Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

---

## 🏗️ Build Alma (Production)

Prod ortamı için aşağıdaki komutları çalıştırabilirsiniz:

```bash
npm run build
npm start
```

---

## 🌍 API Bilgisi

Uygulama, OpenWeatherMap gibi bir hava durumu API'si üzerinden veri çekmektedir. API anahtarını ve endpoint ayarlarını `.env.local` dosyasına eklemeniz gerekebilir.

Örnek `.env.local`:

```
NEXT_PUBLIC_WEATHER_API_KEY=API_KEYINIZ
```

---

## 🛆 Deployment

Proje, otomatik olarak [Vercel](https://vercel.com/) üzerine deploy olacak şekilde yapılandırılmıştır. Manuel olarak deploy etmek için:

```bash
vercel
```

---

## ⚠️ Bilgilendirme

- Uygulama tamamen eğitim ve demo amaçlıdır.
- API kullanımı ve olası kısıtlamalar için ilgili servis sağlayıcısının dökümantasyonunu inceleyiniz.

---

## 👨‍💻 Geliştirici

**Mücahit Yüksel**\
[GitHub Profilim](https://github.com/mucahityuksel)

[Live Demo](https://weather-app-git-main-mucahityuksels-projects.vercel.app/)

---

