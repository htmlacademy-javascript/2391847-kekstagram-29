
// Функция проверяет допустима ли длина строки: true / false

const checkValidLength = function (string, maxLength) {
  return string.length <= maxLength;
};

checkValidLength('проверяем эту строку', 10);
checkValidLength('проверяем эту строку', 20);
checkValidLength('проверяем эту строку', 22);


//Функция проверяет является ли строка палиндромом: true / false. Вариант 1

const isPalindrome = function (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString[i];
  }
  return normalizedString === newString;
};

isPalindrome('топот');
isPalindrome('ДовОд ');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

//Функция проверяет является ли строка палиндромом: true / false. Вариант 2

const isPalindrome2 = function (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < Math.floor(normalizedString.length / 2); i++) {
    if (normalizedString[i] !== normalizedString[normalizedString.length - i - 1]) {
      return false;
    }
  }
  return true;
};

isPalindrome2('топот');
isPalindrome2('ДовОд ');
isPalindrome2('Кекс');
isPalindrome2('Лёша на полке клопа нашёл ');

//Функция извлекает цифры из строки и возвращает в виде целого положительного числа
// Вариант 1

const extractDigits = function (parameter) {

  if (typeof parameter === 'number') {
    parameter = parameter.toString();
  }

  let positiveInteger = '';

  for (let i = 0; i < parameter.length; i++) {
    if (!Number.isNaN(parseInt(parameter[i], 10))) {
      positiveInteger += parameter[i];
    }
  }

  return parseInt(positiveInteger, 10);
};

extractDigits('2023 год');
extractDigits('ECMAScript 2022');
extractDigits('1 кефир, 0.5 батона');
extractDigits('агент 007');
extractDigits('а я томат');
extractDigits(2023);
extractDigits(-1);
extractDigits(1.5);


//Функция извлекает цифры из строки и возвращает в виде целого положительного числа.
// Вариант 2

const extractDigits2 = function (parameter) {

  if (typeof parameter === 'number') {
    parameter = parameter.toString();
  }

  let positiveInteger = 0;

  for (let i = 0; i < parameter.length; i++) {

    const digit = parseInt(parameter[i], 10);

    if (!Number.isNaN(digit)) {
      positiveInteger = positiveInteger * 10 + digit;
    }
  }

  return positiveInteger || NaN;
};

extractDigits2('2023 год');
extractDigits2('ECMAScript 2022');
extractDigits2('1 кефир, 0.5 батона');
extractDigits2('агент 007');
extractDigits2('а я томат');
extractDigits2(2023);
extractDigits2(-1);
extractDigits2(1.5);
