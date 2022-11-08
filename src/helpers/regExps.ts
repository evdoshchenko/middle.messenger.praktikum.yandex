export const regExps = {
  Login: /^[a-zA-Z0-9-_]{3,19}[a-zA-Z][a-zA-Z0-9-_]{0,2}$/,
  Password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  Email: /^[-\w.]+@[A-z0-9]+\.+[A-z]{2,}$/,
  Phone: /^[+]{0,1}[0-9]{10,15}$/,
  FirstName: /^[A-ZА-Я]{1,1}[a-zа-я]{0,50}$/,
  SecondName: /^[A-ZА-Я]{1,1}[a-zа-я]{0,50}$/,
  DisplayName: /^[A-ZА-Я]{1,1}[a-zа-я]{0,50}$/,
  Message: /^.*$/,
  UserID: /^[0-9]{0,15}$/,
};
