'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var VICTORY_TEXT_X = CLOUD_X + GAP * 2; // координата 'x' для текста о победе
var VICTORY_TEXT_Y = CLOUD_Y + GAP * 2 + FONT_GAP; // координата 'y' для текста о победе
var BAR_WIDTH = 40; // ширина колонки
var MAX_BAR_HEIGHT = 150; // высота самой высокой колонки
var BARS_GAP = 50; // расстояние между колонками
var MAX_BAR_Y = CLOUD_Y + GAP * 4 + FONT_GAP * 3; // координата 'y' для самой высокой колонки
var MAX_TIME_NOTE_Y = MAX_BAR_Y - GAP; // координата 'y' для записи самого высокого результата прохождения игры
var NAMES_Y = CLOUD_Y + GAP * 6 + FONT_GAP * 3; // координата 'y' для записи имени игрока
var TOTAL_GAP = (BAR_WIDTH + BARS_GAP); // расстояние, включающее ширину колонки и расстрояние между колонками
var NOTE_AND_BAR_X = CLOUD_X + GAP * 3; // координата 'x' для колонки и соответсвующих ей записей

// ф-ция отрисовки окна
var renderCloud = function (ctx, x, y, cloudWidth, cloudHeight, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

// ф-ция, определяющая максимальное значение в массиве
var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

// ф-ция, определяющая рандомное значение в заданном диапазоне чисел
var getRandomNumber = function (min, max) {
  return min + Math.random() * (max - min);
};

// ф-ция отрисовки статистики
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', VICTORY_TEXT_X, VICTORY_TEXT_Y);
  ctx.fillText('Список результатов:', VICTORY_TEXT_X, VICTORY_TEXT_Y + GAP + FONT_GAP);

  var maxTime = getMaxElement(times);
  // отрисовка каждой из колонок и соответсвующих подписей при помощи цикла
  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = Math.round(times[i]) * MAX_BAR_HEIGHT / maxTime; // высота колонки, соответствующей текущему результату
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], NOTE_AND_BAR_X + TOTAL_GAP * i, NAMES_Y + MAX_BAR_HEIGHT);
    ctx.fillText(Math.round(times[i]), NOTE_AND_BAR_X + TOTAL_GAP * i, MAX_TIME_NOTE_Y + MAX_BAR_HEIGHT - currentBarHeight);
    // задаем прозрачность колонок (при помощи тернарного оператора)
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 0.9) + ')';
    // присваиваем цвету колонок отдельную переменную
    var barFillStyle = ctx.fillStyle;
    // вызываем ф-цию для отрисовки колонок с соответвующими аргументами
    renderCloud(ctx, NOTE_AND_BAR_X + TOTAL_GAP * i, MAX_BAR_Y + MAX_BAR_HEIGHT - currentBarHeight, BAR_WIDTH, currentBarHeight, barFillStyle);
  }
};
