const lang = new Map<string, string>();

lang.set('SUCCESS', 'Thành công');
lang.set('UNKNOWN', 'Không xác định');
lang.set('INVALID', 'Không hợp lệ');
lang.set('SYSTEM_GENERAL_ERROR', 'Lỗi chung hệ thống');
lang.set('DATABASE_ERROR', 'Lỗi cơ sở dữ liệu');
lang.set('INVALID_HEADERS', 'Headers không hợp lệ');
lang.set('SYNTAX_ERROR', 'Lỗi cú pháp');
lang.set('NOT_FOUND', 'Không tìm thấy');
lang.set('DATABASE_CONNECTION_ERROR', 'Lỗi kết nối cơ sở dữ liệu');
lang.set('INSERT_ERROR', 'Lỗi thêm dữ liệu');
lang.set('UPDATE_ERROR', 'Lỗi cập nhập dữ liệu);');
lang.set('DELETE_ERROR', 'Lỗi xóa dữ liệu');
lang.set('RECORD_NOT_FOUND', 'Không tìm thấy bản ghi');
lang.set('PERMISSION_DENIED', 'Không có quyền truy cập');
lang.set('AUTH_LOGIN_FAIL', 'Đăng nhập thất bại');
lang.set('AUTH_INVALID_TOKEN', 'Token không hợp lệ');
lang.set('AUTH_MISSING_JWT', 'Thiếu jwt');
lang.set('AUTH_DELETED_ACCOUNT', 'Tài khoản đã bị xóa');
lang.set('AUTH_DISABLED_ACCOUNT', 'Tài khoản vô hiệu hóa');
lang.set('AUTH_EXPIRED_TOKEN', 'Token hết hạn');
lang.set('AUTH_INVALID_EMAIL_ADDRESS', 'Email không hợp lệ');
lang.set('AUTH_INVALID_PASSWORD', 'Password không đúng');
lang.set(
  'NEW_PASSWORD_SAME_AS_CURRENT_PASSWORD',
  'Mật khẩu mới giống với mật khẩu hiện tại',
);
lang.set('NON_ACTIVATED_ACCOUNT', 'Tài khoản chưa kích hoạt');
lang.set('OTP_LIMIT_REACHED', 'Đạt đến giới hạn otp');
lang.set('USER_NOT_FOUND', 'Không tìm thấy người dùng');
lang.set('TOKEN_NOT_FOUND', 'Không tìm thấy token');

const viLangs = lang;
export default viLangs;
