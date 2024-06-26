const lang = new Map<string, string>();

lang.set('SUCCESS', 'success');
lang.set('UNKNOWN', 'unknown');
lang.set('INVALID', 'invalid');
lang.set('SYSTEM_GENERAL_ERROR', 'system general error');
lang.set('DATABASE_ERROR', 'database error');
lang.set('INVALID_HEADERS', 'invalid headers');
lang.set('SYNTAX_ERROR', 'syntax error');
lang.set('NOT_FOUND', 'not found');
lang.set('DATABASE_CONNECTION_ERROR', 'database connection error');
lang.set('INSERT_ERROR', 'insert error');
lang.set('UPDATE_ERROR', 'update error');
lang.set('DELETE_ERROR', 'delete error');
lang.set('RECORD_NOT_FOUND', 'record not found');
lang.set('PERMISSION_DENIED', 'permission denied');
lang.set('AUTH_LOGIN_FAIL', 'login fail');
lang.set('AUTH_INVALID_TOKEN', 'invalid token');
lang.set('AUTH_MISSING_JWT', 'missing jwt');
lang.set('AUTH_DELETED_ACCOUNT', 'deleted account');
lang.set('AUTH_DISABLED_ACCOUNT', 'disabled account');
lang.set('AUTH_EXPIRED_TOKEN', 'expired token');
lang.set('AUTH_INVALID_EMAIL_ADDRESS', 'invalid email address');
lang.set('AUTH_INVALID_PASSWORD', 'invalid password');
lang.set(
  'NEW_PASSWORD_SAME_AS_CURRENT_PASSWORD',
  'new password same as current password',
);
lang.set('NON_ACTIVATED_ACCOUNT', 'non activated account');
lang.set('OTP_LIMIT_REACHED', 'otp limit reached');
lang.set('USER_NOT_FOUND', 'user not found');
lang.set('TOKEN_NOT_FOUND', 'token not found');
const enLangs = lang;
export default enLangs;
