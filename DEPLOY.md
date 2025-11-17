# Hướng Dẫn Deploy Lên Netlify

## Cách 1: Deploy qua Netlify Dashboard (Khuyến nghị)

1. **Chuẩn bị:**
   - Đảm bảo code đã được push lên GitHub/GitLab/Bitbucket

2. **Deploy:**
   - Truy cập [Netlify](https://www.netlify.com/)
   - Đăng nhập và chọn "Add new site" → "Import an existing project"
   - Kết nối repository của bạn
   - Netlify sẽ tự động detect cấu hình từ `netlify.toml`:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Hoàn tất:**
   - Netlify sẽ tự động build và deploy
   - Bạn sẽ nhận được URL như: `https://your-site-name.netlify.app`

## Cách 2: Deploy qua Netlify CLI

1. **Cài đặt Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   cd christmas-sleepover-invitation
   npm run build
   netlify deploy --prod
   ```

## Cấu hình đã được thiết lập

File `netlify.toml` đã được tạo với:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects: Tất cả routes sẽ redirect về `/index.html`
- Node version: 18

## Lưu ý

- Đảm bảo file nhạc và hình ảnh trong `assets/` đã được commit
- Netlify sẽ tự động build khi bạn push code mới lên repository
- Có thể tùy chỉnh domain trong Netlify dashboard

