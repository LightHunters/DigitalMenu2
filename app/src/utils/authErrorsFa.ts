export const authErrorMapFa : Record<string, string> = {
  "user not found": "کاربری وجود ندارد",
  "Invalid password": "رمز عبور اشتباه است",
  "User already exists": "کاربر وجود دارد"
}

export const translateAuthError = (message?: string) => {
  if (!message) return "خطایی رخ داده است";
  return authErrorMapFa[message] || "خطای غیرمنتظره‌ای رخ داد";
};
