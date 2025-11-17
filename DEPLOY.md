# 🚀 Hướng Dẫn Deploy Lên Netlify

## ✅ Code đã được push lên GitHub
Repository: https://github.com/datln04/christmas-card-invitation.git

## 📋 Cách Deploy Lên Netlify

### Cách 1: Deploy qua Netlify Dashboard (Khuyến nghị - Dễ nhất)

1. **Truy cập Netlify:**
   - Vào [https://www.netlify.com/](https://www.netlify.com/)
   - Đăng nhập hoặc đăng ký tài khoản miễn phí

2. **Import Project:**
   - Click nút **"Add new site"** → **"Import an existing project"**
   - Chọn **"Deploy with GitHub"** (hoặc GitLab/Bitbucket)
   - Authorize Netlify truy cập GitHub của bạn
   - Chọn repository: **`datln04/christmas-card-invitation`**

3. **Cấu hình Build:**
   - Netlify sẽ tự động detect từ file `netlify.toml`:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Nếu không tự detect, nhập thủ công:
     - Build command: `npm run build`
     - Publish directory: `dist`

4. **Deploy:**
   - Click **"Deploy site"**
   - Đợi build hoàn tất (khoảng 1-2 phút)
   - Bạn sẽ nhận được URL như: `https://random-name-123.netlify.app`

5. **Tùy chỉnh Domain (Tùy chọn):**
   - Vào **Site settings** → **Domain management**
   - Có thể đổi tên site hoặc thêm custom domain

### Cách 2: Deploy qua Netlify CLI

```bash
# Cài đặt Netlify CLI (nếu chưa có)
npm install -g netlify-cli

# Login vào Netlify
netlify login

# Deploy
cd christmas-sleepover-invitation
netlify deploy --prod
```

### Cách 3: Drag & Drop (Nhanh nhất để test)

1. Chạy build:
   ```bash
   npm run build
   ```

2. Kéo thả folder `dist` vào:
   - [https://app.netlify.com/drop](https://app.netlify.com/drop)

## ⚙️ Cấu hình đã được thiết lập

File `netlify.toml` đã được tạo với:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`
- ✅ SPA redirects: Tất cả routes → `/index.html`
- ✅ Node version: 18

## 🔄 Auto Deploy

Sau lần deploy đầu tiên:
- Mỗi khi bạn push code mới lên GitHub, Netlify sẽ tự động build và deploy
- Bạn có thể xem build logs trong Netlify dashboard

## 📝 Lưu ý

- ✅ File nhạc (~5MB) đã được bundle, có thể mất vài giây để tải lần đầu
- ✅ Tất cả assets (hình ảnh, nhạc) đã được optimize
- ✅ HTTPS được bật tự động
- ✅ Site sẽ có URL dạng: `https://your-site-name.netlify.app`

## 🎉 Hoàn tất!

Sau khi deploy, thiệp Giáng sinh của bạn sẽ live trên internet và có thể chia sẻ với mọi người!
