# Phân quyền viết tắt
Admin: Ad
managerStore: mS
staffBarista: sB
staffWaiter: sW
staffShipper: sS
staffCashier: sC

# Mã code chung
drink-

# Nước
Xóa mềm nước drink-softDeleteDrink Ad

# Logic 
## Tạo thành phố: Ad
Dữ liệu đầu vào: tên thành phố-string
Dữ liệu đầu ra: thành phố được tạo
Luồng xử lý:
    Lọc dữ liệu, ngoài field name thì hệ thống không chấp nhận những dữ liệu khác
    Lấy dữ liệu từ rep.body gọi là data
    kiểm trên xem thành phố đã tồn tại trước đó hay chưa với data.name
    nếu đã tồn tại, trả về lỗi "Thành phố đã tồn tại"

    