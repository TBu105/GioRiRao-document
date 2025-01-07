Folder assests chứa các file tĩnh như ảnh: logo, font chữ và CSS toàn cục

Folder images chứa ảnh
Folder font chứa font
Folder style chứa style toàn cục

# Font
Lý do để font local là để
    Tăng tốc độ tải
    Tránh trường CDN lỗi

Để set up font local với tailwind bạn hãy tìm hiểu file này và sử dụng chatgpt hỗ trợ
https://www.geeksforgeeks.org/how-to-use-font-from-local-files-globally-in-tailwind-css/

# Set up style toàn cục trong file index folder styles
## style toàn cục chứa
Màu nền và màu sắc chung
Định dạng text
Link và Button mặc định
Margin, Padding, ...
CSS Reset

Ví dụ apply
```
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your global styles here */
@layer base {
  body {
    @apply bg-gray-100 text-gray-900;
  }
  h1 {
    @apply text-2xl font-bold mb-4;
  }
}

/* Custom utility classes */
@layer utilities {
  .custom-class {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
}
```


