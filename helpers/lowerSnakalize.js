function convertToLowerSnake(str) {
  const upperCase = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
  const strArr = str.split('');
  const newStrArr = [];
  strArr.forEach(char => {
    if (upperCase.includes(char)) {
      newStrArr.push('_');
      newStrArr.push(char.toLowerCase());
    } else {
      newStrArr.push(char);
    }
  });
  return newStrArr.join('');
}

export default function (obj) {
  const newObj = {}
  for (let key in obj) {
    newObj[convertToLowerSnake(key)] = obj[key];
  }

  return newObj;
}