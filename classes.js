/**
 * Created by Ksenia on 07.05.2017.
 */

class Human {

    constructor(name, skill) {
        this.name = name;
        this.skill = skill;
        this.specialty = "";
        this.cheerfulness = 25;
    }

    say_hi() {
        write_log("Привет, я " + this.specialty + " " + this.name + ", у меня " + this.skill + " очков опыта.");
    }

    laugh() {
        write_log(this.name + " смеётся.");
        this.cheerfulness++;
    }

    talk() {
        write_log(this.name + " разговаривает.");
    }

    drink(drink) {
        write_log(this.name + " пьёт " + drink + ".");
        this.cheerfulness++;
    }

    read_documentation() {
        write_log(this.name + " читает документацию.");
        this.cheerfulness--;
    }

    come_to_office() {
        write_log(this.name + " пришёл в офис.");
        this.cheerfulness = 50;
    }

    go_home() {
        write_log(this.name + " ушёл домой.");
    }

}

class Coder extends Human {

    constructor(name, skill, ...language) {
        super(name, skill);
        this.language = language;
        this.specialty = "программист";
    }

    code() {
        if (1 <= this.cheerfulness) {
            let rand_lang = Math.floor(Math.random() * (this.language.length));
            write_log(this.name + " программирует на " + this.language[rand_lang] + ".");
            this.skill++;
            this.cheerfulness--;
        } else {
            write_log(this.name + " пытается программировать, но из-за сильной усталости не может. " +
                "Надо сделать перерыв.");
        }
    }

}

class Tester extends Human {

    constructor(name, skill) {
        super(name, skill);
        this.specialty = "тестировщик";
    }

    test(how) {
        if (1 <= this.cheerfulness) {
            if ("вручную" == how) {
                write_log(this.name + " тестирует продукт " + how + ".");
            } else if ("автотесты" == how) {
                write_log(this.name + " пишет " + how + ".");
            }
            this.skill++;
            this.cheerfulness--;
        } else {
            write_log(this.name + " пытается тестировать продукт, но из-за сильной усталости не может. " +
                "Надо сделать перерыв.");
        }
    }

    make_testing_method() {
        if (1 <= this.cheerfulness) {
            if (200 <= this.skill) {
                write_log(this.name + " разрабатывает новую методику тестирования.");
            } else {
                write_log(this.name + " предлагает новую методику тестирования, но она неудачная, так как " +
                    this.name + " имеет мало опыта.");
                this.cheerfulness--;
            }
            this.cheerfulness--;
        } else {
            write_log(this.name + " пытается разработать новую методику тестирования, " +
                "но из-за сильной усталости не может. Надо сделать перерыв.");
        }
    }

}

class Techwriter extends Human {

    constructor(name, skill) {
        super(name, skill);
        this.specialty = "технический писатель";
    }

    write_documentation() {
        if (1 <= this.cheerfulness) {
            write_log(this.name + " пишет документацию.");
            this.cheerfulness--;
        } else {
            write_log(this.name + " пытается писать документ, но из-за сильной усталости не может. " +
                "Надо сделать перерыв.");
        }
    }

}