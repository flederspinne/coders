/**
 * Created by Ksenia on 07.05.2017.
 */

'use strict';

let max = new Coder("Максим", 500, "C++", "C#", "JavaScript");
max.say_hi();
max.come_to_office();
max.drink("кофе");
max.laugh();
max.code();
max.code();
max.read_documentation();
max.code();
max.say_hi();
max.go_home();

let sasha = new Tester("Саша", 300);
sasha.say_hi();
sasha.come_to_office();
sasha.drink("водку \"Финляндия\"");
sasha.test("вручную");
sasha.test("вручную");
sasha.test("вручную");
sasha.test("автотесты");
sasha.say_hi();
sasha.go_home();

for (let i in sasha) {
    document.write("sasha[" + i + "] = " + sasha[i] + "<br>");
}

// TODO: Каким-то образом регулировать действия сотрудников.
// Методы должны запускаться в случайном порядке, но ограничиваться некоторыми правилами,
// например, сначала надо прийти в офис, а потом что-то делать, в конце - уйти.
// TODO: Визуализация!
// TODO: Зпаускать действия сотрудников параллельно (по функции на каждого, всё равно JS асинхронный).