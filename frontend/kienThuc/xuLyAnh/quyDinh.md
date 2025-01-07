# Size
## webiste
hero image: 1500px
content image: 800px
thumbnail image: 300px

## phone
hero image: 1000px
content image: 500px
thumbnail image: 100px

# Nén ảnh
Nén ảnh và sử dụng web work trước khi gửi ảnh xuống server
maximum size nhỏ hơn hoặc bằng 1MB

# Sử dụng polling để kiểm tra tình trạng upload của ảnh
Khi xử lý tạo mới dữ liệu, ví dụ tạo mới dữ liệu nước, bao gồm: tên, giá, thumbnail
Hệ thống sẽ lấy dữ liệu thông thường như là: tên, giá để tạo dữ liệu trong db trước, trả về thông báo thành công, và đang xử lý ảnh
Sau đó hệ thống mới tiến hành xử lý ảnh, và sẽ đánh dấu ảnh trong db rằng ảnh đã được đăng lên thành công khi đã hoàn thành tải lên cloudinary
Thế nên frontend sẽ polling tình trạng của upload của ảnh mỗi 2 giây

# Lazy loading
Một số ảnh có thể lazy loading