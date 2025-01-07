# Mã code chung
auth-
# Nhân viên, Phân quyền, đăng nhập, đăng ký

Tạo quyền auth-createPermission

Tạo chức vụ auth-createRole

Tạo tài khoản admin với quyền admin auth-createAccountAdmin

Tạo tài khoản nhân viên với quyền quản lý cửa hàng auth-createAccountStaff

Tạo tài khoản người dùng auth-createAccountUser

Nhân viên đăng nhập auth-loginStaff

Người dùng đăng nhập auth-loginUser

Thay đổi mật khẩu auth-changePassword

Phân quyền auth-authorize

Kiểm tra tính hợp lệ của Access token auth-verifyAccessToken

Tạo ra access token mới khi refresh token còn hạn sử dụng auth-refreshAccessToken

Thu hồi refresh token auth-revokeRefreshToken

# Logic

## Tạo tài khoản mới với quyền admin auth-createAccountAdmin
Input:
    req.body: Họ tên, email, mật khẩu, sđt, địa chỉ nhà

    Kiểm tra dữ liệu đầu vào đã đủ tiêu chuẩn
        Đúng field yêu cầu
        Field yêu cầu phải đúng loại dữ liệu, đúng định dạng dữ liệu, ví dụ ObjectId nếu đó là id của mongodb
        Một số field bắt buộc phải có
        Thông báo lỗi khi có field không yêu cầu
Output: 
    Một tài khoản mới được tạo ra với quyền admin
Logic:
    Kiểm tra người gửi yêu cầu tạo tài khoản quyền admin có quyền admin hay không
    Nếu không phải quyền admin, thông báo "Bạn không có thẩm quyền sử dụng chức năng này"
    Sử dụng email từ dữ liệu đầu vào để kiểm tra tài khoản người dùng đã tồn tại trước đó trong db hay chưa
    Nếu đã tồn tại, thông báo "Người dùng đã tồn tại với email này"
    Ta lấy mật khẩu trong dữ liệu đầu và để hash mật khẩu sử dụng brcrypt
    Sau khi hash xong ta tiến hành cập nhật password của dữ liệu đầu vào với mật khẩu đã được hash
    Ta bắt đầu thêm role = admin vào dữ liệu đầu vào
    Sử dụng dữ liệu đầu vào để tạo người dùng mới
    Ta trả về thông báo " tạo người dùng thành công "
Kiểm tra
    Trong db đã có người dùng được tạo đúng với dữ liệu đầu vào hay chưa
    Mật khẩu được lưu trữ đã hash hay chưa
    Chức vụ có phải là admin hay không

## Tạo tài khoản mới với quyền quản lý cửa hàng auth-createAccountStaff
Input:
    req.body: Họ tên, email, mật khẩu, sđt, địa chỉ nhà, chức vụ

    Kiểm tra dữ liệu đầu vào đã đủ tiêu chuẩn
        Đúng field yêu cầu
        Field yêu cầu phải đúng loại dữ liệu, đúng định dạng dữ liệu, ví dụ ObjectId nếu đó là id của mongodb
        Một số field bắt buộc phải có
        Thông báo lỗi khi có field không yêu cầu
Output: 
    Một tài khoản mới được tạo ra với quyền nhân viên
Logic:
    Kiểm tra người gửi yêu cầu tạo tài khoản quyền quản lý cửa hàng có phải là một quản lý cửa hàng hay không
    Nếu người tạo không phải quyền quản lý cửa hàng, thông báo "Bạn không có thẩm quyền sử dụng chức năng này"
    Sử dụng email từ dữ liệu đầu vào để kiểm tra tài khoản người dùng đã tồn tại trước đó trong db hay chưa
    Nếu đã tồn tại, thông báo "Người dùng đã tồn tại với email này"
    Ta lấy mật khẩu trong dữ liệu đầu và để hash mật khẩu sử dụng brcrypt
    Sau khi hash xong ta tiến hành cập nhật password của dữ liệu đầu vào với mật khẩu đã được hash
    Sử dụng dữ liệu đầu vào để tạo người dùng mới
    Ta trả về thông báo " tạo người dùng thành công "
Kiểm tra
    Trong db đã có người dùng được tạo đúng với dữ liệu đầu vào hay chưa
    Mật khẩu được lưu trữ đã hash hay chưa
    Chức vụ lưu trữ có trùng với chức vụ đầu vào hay không

## Tạo tài khoản người dùng auth-createAccountUser

Input:
    req.body: ảnh, Họ tên, email, mật khẩu, sđt, địa chỉ giao hàng, 

    Kiểm tra dữ liệu đầu vào đã đủ tiêu chuẩn
        Đúng field yêu cầu
        Field yêu cầu phải đúng loại dữ liệu, đúng định dạng dữ liệu, ví dụ ObjectId nếu đó là id của mongodb
        Một số field bắt buộc phải có
        Thông báo lỗi khi có field không yêu cầu
Output: 
    Một tài khoản mới được tạo ra với quyền nhân viên
Logic:
    Sử dụng email từ dữ liệu đầu vào để kiểm tra tài khoản người dùng đã tồn tại trước đó trong db hay chưa
    Nếu đã tồn tại, thông báo "Người dùng đã tồn tại với email này"
    Ta lấy mật khẩu trong dữ liệu đầu và để hash mật khẩu sử dụng brcrypt
    Sau khi hash xong ta tiến hành cập nhật password của dữ liệu đầu vào với mật khẩu đã được hash
    Sử dụng dữ liệu đầu vào để tạo người dùng mới
    Ta trả về thông báo " tạo người dùng thành công "
Kiểm tra
    Trong db đã có người dùng được tạo đúng với dữ liệu đầu vào hay chưa
    Mật khẩu được lưu trữ đã hash hay chưa

## Người dùng đăng nhập auth-loginUser
Input:
    req.body: email, mật khẩu

    Kiểm tra dữ liệu đầu vào đã đủ tiêu chuẩn
        Đúng field yêu cầu
        Field yêu cầu phải đúng loại dữ liệu, đúng định dạng dữ liệu, ví dụ ObjectId nếu đó là id của mongodb
        Một số field bắt buộc phải có
        Thông báo lỗi khi có field không yêu cầu
Output: 
    Access token, refresh token: được dùng để chứng minh sự tồn tại của bản thân là hợp lệ
Logic:
    Kiểm tra email có trong User hay không
    Nếu không, báo lỗi "Tài khoản không tồn tại"
    Kiểm tra password có trùng khớp với password đã lưu trong db hay không
    Nếu không, báo lỗi "Mật khẩu sai"
    Tạo payload
        payload là một object
        payload chứa userId, role
        khi ta sử dụng email để kiểm tra người dùng có tồn tại thì ta đã có được dữ liệu về người dùng đó, từ đó ta lấy được userId và role
    Tạo access token và refresh token sử dụng secret key lấy từ file .env, và payload vừa mới tạo
        Đối với access token ta đặt thời gian hết hạn là 1 giờ, và refresh token là 7 ngày
    Lưu refresh token vào key token, có userType = "User", tokenExpiry là 7 ngày
    Trả về thông báo "Đăng nhập thành công", refresh token, access token cho người dùng

## Nhân viên đăng nhập auth-loginStaff
Input:
    req.body: email, mật khẩu

    Kiểm tra dữ liệu đầu vào đã đủ tiêu chuẩn
        Đúng field yêu cầu
        Field yêu cầu phải đúng loại dữ liệu, đúng định dạng dữ liệu, ví dụ ObjectId nếu đó là id của mongodb
        Một số field bắt buộc phải có
        Thông báo lỗi khi có field không yêu cầu
Output: 
    Access token, refresh token: được dùng để chứng minh sự tồn tại của bản thân là hợp lệ
Logic:
    Kiểm tra email có trong Staff hay không
    Nếu không, báo lỗi "Tài khoản không tồn tại"
    Kiểm tra password có trùng khớp với password đã lưu trong db hay không
    Nếu không, báo lỗi "Mật khẩu sai"
    Tạo payload
        payload là một object
        payload chứa userId, role
        khi ta sử dụng email để kiểm tra người dùng có tồn tại thì ta đã có được dữ liệu về người dùng đó, từ đó ta lấy được userId và role
    Tạo access token và refresh token sử dụng secret key lấy từ file .env, và payload vừa mới tạo
        Đối với access token ta đặt thời gian hết hạn là 1 giờ, và refresh token là 7 ngày
    Lưu refresh token vào refresh token, có userType là "Staff", tokenExpiry là 7 ngày
    Trả về thông báo "Đăng nhập thành công", refresh token, access token cho người dùng

## Kiểm tra tính hợp lệ của Access token auth-verifyAccessToken

Input:
    front end lưu trữ access token ở trong memory nhưng gửi xuống back end thông qua http request header dưới dạng 
    ```
    const accessToken = 'your-access-token';  // Retrieved from Redux or React state
    fetch('https://your-api-endpoint.com/endpoint', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,  // Send the access token as a Bearer token
  }
})
    ```
Output:
    Cho phép người dùng đi qua và sử dụng hàm được gọi
Logic:
    Chúng ta lấy access token thông qua req.headers['authorization']
    Nếu không có access token, ta trả về thông báo "Authorization header missing"
    Ta tách Bearer ra khỏi access token, và lấy phần token
    Nếu không có phần token, ta trả về thông báo "Missing token in authorization header"
    Sau đó ta tiến hành xác thực access token bằng cách so sánh token được gửi xuống từ front end so sánh với secret key được lưu trữ trong .env

    access token = 123
    secret key = 456

    let a = jwt.verify(access token, secret key)

    a = {
        userId: 789,
        role: "staffShipper"
    }


    Nếu err.name === 'TokenExpiredError', ta gọi trả về status 401 và message là Token expried
    Nếu err.name là những lỗi khác, ta thông báo "Token không hợp lệ"
    Lấy dữ liệu được decode và lưu vào req.user
    Sử dụng next để tiếp tục tới controller được gọi hoặc một middleware khác

## Tạo ra access token mới khi refresh token còn hạn sử dụng auth-refreshAccessToken
Input: 
    refresh token được lấy thông qua http cookies
Output:
    một access token mới
Logic
    Ta kiểm tra tính hợp lệ và thời hạn của refresh token
    Nếu token không hợp lệ, thông báo "Refresh token không hợp lệ"
    Sau đó ta sử dụng refresh token này để tìm kiếm nó trong RefreshToken model
    Nếu không có refresh token hoặc refresh token hết hạn, hoặc refresh token bị revoked, ta thông báo "Refresh token không còn sử dụng được" với status là 401
    Ta tạo 1 access token mới
    Trả về cho người dùng access token mới và thông báo 'refresh access token thành công'

##

##

