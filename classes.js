/**
 * Created by Ksenia on 07.05.2017.
 */

class Human {

    constructor(name, skill) {
        // Параметры упакованы в отдельный объект, чтобы с помощью Object.getOwnPropertyNames()
        // было проще получать названия методов в виде массива, что необходимо для выполнения
        // методов в случайном порядке.
        // Таким образом, мы просто перечисляем свойства объекта не с нуля, что захватывало бы this.params,
        // а с единицы. Также появляется возможность присвоить фиксированные порядковые номера методам,
        // требующим "особого отношения" (таких, например, как this.come_to_office и this.go_home).
        this.params = {
            name: name,
            skill: skill,
            specialty: "",
            cheerfulness: 25
        }

        // 1
        this.come_to_office = function() {
            write_log(this.params.name + " пришёл в офис.");
            this.params.cheerfulness = 50;
        }

        // 2
        this.go_home = function() {
            write_log(this.params.name + " ушёл домой.");
        }

        // 3
        this.drink = function(drink) {
            write_log(this.params.name + " пьёт " + drink + ".");
            this.params.cheerfulness++;
        }

        // 4
        this.laugh = function() {
            write_log(this.params.name + " смеётся.");
            this.params.cheerfulness++;
        }

        // 5
        this.talk = function() {
            write_log(this.params.name + " разговаривает.");
        }

        // 6
        this.read_documentation = function() {
            if (1 <= this.params.cheerfulness) {
                write_log(this.params.name + " читает документацию.");
                this.params.cheerfulness--;
            }
            else {
                write_log(this.params.name + " пытается читать документацию, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(Math.floor(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}

class Coder extends Human {

    constructor(name, skill, ...language) {
        super(name, skill);
        this.params.language = language;
        this.params.specialty = "программист";

        // 7
        this.code = function() {
            if (1 <= this.params.cheerfulness) {
                let rand_lang = Math.floor(Math.random() * (this.params.language.length));
                write_log(this.params.name + " программирует на " + this.params.language[rand_lang] + ".");
                this.params.skill++;
                this.params.cheerfulness--;
            } else {
                write_log(this.params.name + " пытается программировать, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(Math.floor(Math.random() * (5 - 3) + 3 ));

            }
        }
    }

}

class Tester extends Human {

    constructor(name, skill) {
        super(name, skill);
        this.params.specialty = "тестировщик";

        // 7
        this.test = function(how) {
            if (1 <= this.params.cheerfulness) {
                if ("вручную" == how) {
                    write_log(this.params.name + " тестирует продукт " + how + ".");
                } else if ("автотесты" == how) {
                    write_log(this.params.name + " пишет " + how + ".");
                }
                this.params.skill++;
                this.params.cheerfulness--;
            } else {
                write_log(this.params.name + " пытается тестировать продукт, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(Math.floor(Math.random() * (5 - 3) + 3 ));

            }
        }

        // 8
        this.make_testing_method = function() {
            if (1 <= this.params.cheerfulness) {
                if (200 <= this.params.skill) {
                    write_log(this.params.name + " разрабатывает новую методику тестирования.");
                } else {
                    write_log(this.params.name + " предлагает новую методику тестирования, но она неудачная, так как " +
                        this.params.name + " имеет мало опыта.");
                    this.params.cheerfulness--;
                }
                this.params.cheerfulness--;
            } else {
                write_log(this.params.name + " пытается разработать новую методику тестирования, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(Math.floor(Math.random() * (5 - 3) + 3 ));
            }
        }

        // 9
        this.make_testbench = function () {
            if (1 <= this.params.cheerfulness) {
                write_log(this.params.name + " собирает испытательный стенд.");
            } else {
                write_log(this.params.name + " пытается собрать стенд, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(Math.floor(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}

class Techwriter extends Human {

    constructor(name, skill) {
        super(name, skill);
        this.params.specialty = "технический писатель";

        // 7
        this.write_documentation = function() {
            if (1 <= this.params.cheerfulness) {
                write_log(this.params.name + " пишет документацию.");
                this.params.cheerfulness--;
            } else {
                write_log(this.params.name + " пытается писать документ, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(Math.floor(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}