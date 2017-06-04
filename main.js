/**
 * Created by Ksenia on 07.05.2017.
 */

'use strict';

let coders = [];
let testers = [];
let techwriters = [];
let designers = [];
let managers = [];

// Индекс каждого нового поля ввода для очередного языка программирования:
let coder_lang_index = 0;
let designer_lang_index = 0;
// Пол сотрудника, добавляемого в данный момент:
let gender_val = "";
let workplace_x = 0;
let workplace_y = 0;


let current_project = {};


// Время в миллисекундах, выделяемое на день и ночь:
const DAY_PERIOD = 5000; // 24000
const NIGHT_PERIOD = 5000; // 6000

// Почему-то человек приходит в офис, но потом логи переписываются заново, это происходит только при вызове
// setTimeout и setInterval.
// Чтобы справиться с этой проблемой, был изобретён уродливый костыль - параметр start_day, который позволяет
// вызвать метод come_to_office() только один раз в начале работы.


// TODO: Ввести защиту от ввода некорректных данных.
