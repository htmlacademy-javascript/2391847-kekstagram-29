
// Функция проверяет допустима ли длина строки: true / false

const checkValidLength = function (string, maxLength) {
  return string.length <= maxLength;
};

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

isPalindrome2('Лёша на полке клопа нашёл ');

//Функция проверяет является ли строка палиндромом: true / false. Вариант 3

const isPalindrome3 = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();

  let left = 0;
  let right = string.length - 1;

  while (left <= right) {
    if (string[left] !== string[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

isPalindrome3('Лёша на полке клопа нашёл ');

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


// Функция проверяет, что встреча не выходит за рамки рабочего дня.

const checkMeetingTime = (StartTime, EndTime, mitingStartTime, meetingDuration) => {

  const getTimeInMinutes = (time) => {
    const splittedTime = time.split(':');
    const timeInMinutes = parseInt(splittedTime[0], 10) * 60 + parseInt(splittedTime[1], 10);
    return timeInMinutes;
  };

  const DayStartInMinutes = getTimeInMinutes(StartTime);
  const DayEndInMinutes = getTimeInMinutes(EndTime);
  const mitingStartInMinutes = getTimeInMinutes(mitingStartTime);

  if (mitingStartInMinutes < DayStartInMinutes) {
    return false;
  }
  if (mitingStartInMinutes > DayEndInMinutes) {
    return false;
  }
  return (mitingStartInMinutes + meetingDuration <= DayEndInMinutes);

};

checkMeetingTime('08:05', '17:30', '14:0', 90);

// console.log(checkMeetingTime('08:05', '17:30', '14:0', 90)); // true
// console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));     // true
// console.log(checkMeetingTime('08:0', '14:30', '14:00', 90)); // false
// console.log(checkMeetingTime('14:00', '17:30', '08:0', 90));  // false
// console.log(checkMeetingTime('8:00', '17:30', '08:00', 900)); // false
