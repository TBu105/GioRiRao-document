# Phân quyền ghi chú
Admin: Ad
managerStore: mS
staffBarista: sB
staffWaiter: sW
staffShipper: sS
staffCashier: sC

# Thành phố
Tạo thành phố: Ad
Cập nhật thông tin thành phố: Ad
Lấy danh sách thành phố: Ad

# Khu vực
Tạo khu vực: Ad
Cập nhật thông tin khu vực: Ad
Lấy danh sách khu vực theo thành phố: Ad

# Cửa hàng
Tạo cửa hàng: Ad
Lấy thông tin chi tiết của cửa hàng: Ad, mS
Cập nhật thông tin chi tiết của cửa hàng: Ad, mS
Cập nhật quản lý: Ad
Lấy danh sách cửa hàng theo khu vực: Ad

# Logic trong service
## Tạo thành phố: Ad
Dữ liệu đầu vào: tên thành phố-string
Dữ liệu đầu ra: thành phố được tạo
Luồng xử lý:
    Lọc dữ liệu, ngoài field name thì hệ thống không chấp nhận những dữ liệu khác
    Lấy dữ liệu từ rep.body gọi là data
    kiểm trên xem thành phố đã tồn tại trước đó hay chưa với data.name
    nếu đã tồn tại, trả về lỗi "Thành phố đã tồn tại"


quy trình
liệt kê danh sách các chức năng cần làm
lên logic cho từng chức năng
duyệt
code
    