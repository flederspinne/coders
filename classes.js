/**
 * Created by Ksenia on 07.05.2017.
 */

class Project {

    constructor(time, difficulty, emergency) {
        this.planned_time = time;
        this.difficulty = difficulty;
        this.emergency = emergency;
        this.readiness = 0;
    }

}

class Human {

    constructor(name, gender, skill) {
        // Параметры упакованы в отдельный объект, чтобы с помощью Object.getOwnPropertyNames()
        // было проще получать названия методов в виде массива, что необходимо для выполнения
        // методов в случайном порядке.
        // Таким образом, мы просто перечисляем свойства объекта не с нуля, что захватывало бы this.params,
        // а с единицы. Также появляется возможность присвоить фиксированные порядковые номера методам,
        // требующим "особого отношения" (таких, например, как this.come_to_office и this.go_home).
        this.params = {
            name: name,
            gender: gender,
            skill: skill,
            specialty: "",
            cheerfulness: 25,
            start_day: true,
            work_interval: 0,
            place_x: 0,
            place_y: 0
        }

        // 1
        this.come_to_office = function() {
            if ("m" == this.params.gender) {
                write_log(this.params.name + " пришёл в офис.");
            } else if ("f" == this.params.gender) {
                write_log(this.params.name + " пришла в офис.");
            }

            $('#simulation_office_screen').css("background", "white");
            $('#workplace_' + this.params.place_y + '_' + this.params.place_x + ' .dude').removeClass("hide");
            $('#workplace_' + this.params.place_y + '_' + this.params.place_x + ' .dude').addClass("expandOpen");
            $('#workplace_' + this.params.place_y + '_' + this.params.place_x + ' .dude').css("visibility", "visible");

            this.params.cheerfulness = 25;
        }

        // 2
        this.go_home = function() {
            if ("m" == this.params.gender) {
                write_log(this.params.name + " ушёл домой.");
            } else if ("f" == this.params.gender) {
                write_log(this.params.name + " ушла домой.");
            }

            $('#workplace_' + this.params.place_y + '_' + this.params.place_x + ' .dude').removeClass("expandOpen");
            $('#workplace_' + this.params.place_y + '_' + this.params.place_x + ' .dude').addClass("hide");
            $('#simulation_office_screen').css("background", "#101336");
            /* setTimeout(function () {
                $('#simulation_office_screen').css("background", "URL('img/night.jpg')");
            }, 1000); */
        }

        // 3
        this.drink = function(drink) {
            write_log(this.params.name + " пьёт " + drink + ".");
            change_cheerfulness(this, 1);
        }

        // 4
        this.laugh = function() {
            if (!current_project.emergency) {
                write_log(this.params.name + " смеётся.");
                change_cheerfulness(this, 1);
            } else {
                do_something(this, 7);
            }
        }

        // 5
        // Этот метод будет переопределён: разговаривать можно, только если ты не один в офисе.
        this.talk = function() {
            write_log(this.params.name + " разговаривает.");
        }

        // 6
        this.read_documentation = function() {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " читает документацию.");
                change_cheerfulness(this, -1);
            }
            else {
                write_log(this.params.name + " пытается читать документацию, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}

class Coder extends Human {

    constructor(name, gender, skill, language) {
        super(name, gender, skill);
        this.params.language = language;
        this.params.specialty = "Программист";

        // 5
        this.talk = function() {
            if(coders.length >= 2 || testers.length >= 1 || techwriters.length >= 1 ||
            designers.length >= 1 || managers.length >= 1) {
                write_log(this.params.name + " разговаривает.");
            }
        }

        // 7
        this.code = function() {
            if (this.params.cheerfulness >= 1) {
                let rand_lang = Math.floor(Math.random() * (this.params.language.length));
                write_log(this.params.name + " программирует на " + this.params.language[rand_lang] + ".");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается программировать, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));

            }
        }
    }

}

class Tester extends Human {

    constructor(name, gender, skill) {
        super(name, gender, skill);
        this.params.specialty = "Тестировщик";

        // 5
        this.talk = function() {
            if(coders.length >= 1 || testers.length >= 2 || techwriters.length >= 1 ||
                designers.length >= 1 || managers.length >= 1) {
                write_log(this.params.name + " разговаривает.");
            }
        }

        // 7
        this.test = function(how) {
            if (this.params.cheerfulness >= 1) {
                if ("вручную" == how) {
                    write_log(this.params.name + " тестирует продукт " + how + ".");
                } else if ("автотесты" == how) {
                    write_log(this.params.name + " пишет " + how + ".");
                }
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается тестировать продукт, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));

            }
        }

        // 8
        this.make_testing_method = function() {
            if (this.params.cheerfulness >= 1) {
                if (this.params.skill >= 200) {
                    write_log(this.params.name + " разрабатывает новую методику тестирования.");
                }
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается разработать новую методику тестирования, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }

        // 9
        this.make_testbench = function () {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " собирает испытательный стенд.");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается собрать стенд, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}

class Techwriter extends Human {

    constructor(name, gender, skill) {
        super(name, gender, skill);
        this.params.specialty = "Технический писатель";

        // 5
        this.talk = function() {
            if(coders.length >= 1 || testers.length >= 1 || techwriters.length >= 2 ||
                designers.length >= 1 || managers.length >= 1) {
                write_log(this.params.name + " разговаривает.");
            }
        }

        // 7
        this.write_documentation = function () {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " пишет документацию.");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается писать документ, но из-за сильной усталости не может. " +
                    "Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}

class Designer extends Coder {

    constructor(name, gender, skill, language) {
        super(name, gender, skill, language);
        this.params.specialty = "Веб-дизайнер";

        // 5
        this.talk = function() {
            if(coders.length >= 1 || testers.length >= 1 || techwriters.length >= 1 ||
                designers.length >= 2 || managers.length >= 1) {
                write_log(this.params.name + " разговаривает.");
            }
        }

        // 8
        this.create_design = function () {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " придумывает дизайн продукта.");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается придумать дизайн, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }

        // 9
        this.create_UX = function () {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " проектирует взаимодействие с пользователем.");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается проектировать взаимодействие с пользователем, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }

        // 10
        this.draw = function () {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " рисует.");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается рисовать, " +
                    "но из-за сильной усталости не может. Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}

class Manager extends Human {

    constructor(name, gender, skill) {
        super(name, gender, skill);
        this.params.specialty = "Менеджер";

        // 5
        this.talk = function() {
            if(coders.length >= 1 || testers.length >= 1 || techwriters.length >= 1 ||
                designers.length >= 1 || managers.length >= 2) {
                write_log(this.params.name + " разговаривает.");
            }
        }

        // 7
        this.organize_meeting = function () {
            write_log(this.params.name + " организует совещание.");
            increase_project_readiness(this.params.skill);
        }

        // 8
        this.communicate_with_customer = function () {
            if (this.params.cheerfulness >= 1) {
                write_log(this.params.name + " общается с заказчиком.");
                increase_project_readiness(this.params.skill);
                increase_skill(this);
                change_cheerfulness(this, -1);
            } else {
                write_log(this.params.name + " пытается общаться с заказчиком, " +
                    "но из-за сильной усталости срывается. Надо сделать перерыв.");
                do_something(this, Math.round(Math.random() * (5 - 3) + 3 ));
            }
        }
    }

}
