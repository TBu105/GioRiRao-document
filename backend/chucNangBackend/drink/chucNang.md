# Phân quyền viết tắt
Admin: Ad
managerStore: mS
staffBarista: sB
staffWaiter: sW
staffShipper: sS
staffCashier: sC
endUser: eU

# Mã code chung
drink-

# Nước
Tạo nước drink-createDrink: Ad (flag update false sau 1 ngày)
Lấy danh sách nước drink-getAlldrink(Phân trang)
Lấy danh sách nước drink-getDrinkByTag: eU
Lấy ingredients, recipe drink-getrecipeById: sB
Lấy nước theo tên drink-getDrinkByName: Eu
Cập nhật nước drink-updateDrinkById: Ad
Xóa mềm nước drink-softDeleteDrinkById: Ad

# Logic 
## Tạo nước: Ad
Input: 
- `req.body`:  
  - `name` (string): Tên nước, bắt buộc.  
  - `price` (number): Giá nước, bắt buộc.  
  - `description` (string): Mô tả chi tiết.  
  - `shortDescription` (string): Mô tả ngắn (<=100 ký tự).  
  - `images` (array): Danh sách ảnh (url, alt, order).  
  - `ingredients` (array): Nguyên liệu.  
  - `recipe` (string): Công thức pha chế.  
  - `category` (enum): Loại nước (`coffee`, `tea`, `smoothie`, `juice`, `others`).  
  - `tags` (array): Các thẻ liên quan.
Output: 
  - Tạo mới một drink
Logic: 
1. Xác thực quyền:
   - Kiểm tra quyền của người gửi yêu cầu có phải Admin (`Ad`) hay không.  
   - Nếu không, trả về lỗi: "Bạn không có quyền tạo nước."  
2. Kiểm tra dữ liệu đầu vào:
   - Đảm bảo tất cả các trường  bắt buộc có giá trị.  
   - Kiểm tra tính hợp lệ của từng trường (đúng kiểu dữ liệu, không trống).  
   - Nếu dữ liệu không hợp lệ, trả về thông báo lỗi cụ thể.  
3. Kiểm tra trùng lặp:
   - Kiểm tra tên nước (`name`) trong cơ sở dữ liệu.  
   - Nếu đã tồn tại, trả về lỗi: "Tên nước đã tồn tại." 
4. Tạo nước:
   - Tạo một document mới trong `Drink` model với dữ liệu từ `req.body`.  
   - Lưu `flagUpdate = false`.  
   - Lưu nước mới vào cơ sở dữ liệu.  

5. Output: 
   - Trả về thông báo: "Tạo nước thành công" kèm thông tin nước vừa tạo. 


## Lây danh sách nước(chia page)
Logic:
1. **Truy vấn cơ sở dữ liệu:
   - Lấy tất cả các nước từ `Drink` collection với điều kiện `deleted = false`.  
   - Sắp xếp theo `createdAt` giảm dần.  

2. Output:
   - Danh sách nước (`array`) hoặc thông báo: "Không có nước nào trong hệ thống."  

## Lấy danh sách nước theo tag: eU
Input:
- `req.params.tag`: Tên tag
Output
- Danh sách các drink cùng tag
Logic: 
1. Kiểm tra quyền:
   - Chỉ cho phép `endUser` (`eU`) gọi API này.  

2. Truy vấn cơ sở dữ liệu:
   - Lọc các nước có `tags` chứa giá trị `tag` và `deleted = false`.  

3. Output:
   - Danh sách nước phù hợp hoặc thông báo: "Không tìm thấy nước với tag này." 

## Lấy công thức và nguyên liệu theo 
Input:
- `req.params.id`: Id nước
Output:
- Danh sách nguyên liệu và công thức
Logic
1. Kiểm tra quyền: 
   - Chỉ cho phép `staffBarista` (`sB`) truy cập.  

2. Truy vấn cơ sở dữ liệu:
   - Tìm nước theo ID với `deleted = false`. 
3. Output:
   - Thông tin `ingredients` và `recipe` của nước.  

## Lấy thông tin nước theo tên
Input:
- `req.params.name`: Tên nước 
Output:
- Thông tin và các mô tả về nước
Logic:
1. Truy vấn cơ sở dữ liệu: 
   - Tìm nước có `name` khớp với giá trị đầu vào (không phân biệt hoa thường).  

2. Output:
   - Thông tin chi tiết về nước hoặc thông báo: "Không tìm thấy nước với tên này."  

## Cập nhật nước theo Id
Input:
- `req.params.id`: Id nước
Logic:
1. Xác thực quyền:
   - Kiểm tra quyền của người gọi là Admin (`Ad`).  

2. Kiểm tra dữ liệu:
   - Xác minh các trường cần cập nhật có hợp lệ không.  
   - Nếu có trường không hợp lệ, trả về thông báo lỗi cụ thể.  

3. Cập nhật nước:
   - Tìm nước theo ID và cập nhật dữ liệu.  

4. Output:
   - Trả về thông báo: "Cập nhật nước thành công."  

## Xóa nước theo Id
Input:
- `req.params.id`: Id nước 
Logic
1. Xác thực quyền:  
   - Chỉ cho phép Admin (`Ad`) thực hiện.  

2. Xóa mềm:
   - Cập nhật trường `deleted = true` trong `Drink` model.  

3. Output:
   - Trả về thông báo: "Xóa nước thành công." 