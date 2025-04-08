export enum HttpStatusCode {
    NOT_FOUND = 404,
    SUCCESS = 200,
    CREATED = 201,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    BAD_REQUEST = 400,
    CONFLICT = 409,
  }

  
export enum HttpStatusMessage {
    USER_NOT_FOUND = "Tài khoản của bạn không tồn tại",
    PASSWORD_INCORRECT = "Mật khẩu của bạn không chính xác",
    LOGIN_SUCCESS = 'Đăng nhập thành công',

    PLEASE_CONFIRM_EMAIL = 'Vui lòng xác nhận tại email của bạn',
    ERROR_SEND_EMAIL = "Không gửi được email",

    TOKEN_EXPIRED = "Token hết hạn",
    TOKEN_VERIFY = "Token mã hóa thành công",
}