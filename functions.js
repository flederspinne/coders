/**
 * Created by Ksenia on 07.05.2017.
 */

function get_time() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let millisecond = now.getMilliseconds();

    return hour + ":" + minute + ":" + second + ":" + millisecond;
}

function write_log(something) {

    $('#simulation_log').append(get_time() + " " + something + "<br>");
    document.getElementById('simulation_log').scrollTop = 9999;

}

function do_something(who, what) {
    switch (what) {
        case 1: {
            who.come_to_office();
            break;
        }
        case 2: {
            who.go_home();
            break;
        }
        case 3: {
            let drinks = ["чай", "кофе", "какао", "водичку", "сок", "квас"];
            let rand_drink = Math.round(Math.random() * (drinks.length - 1));
            who.drink(drinks[rand_drink]);
            break;
        }
        case 4: {
            who.laugh();
            break;
        }
        case 5: {
            who.read_documentation();
            break;
        }
        case 6: {
            who.talk();
            break;
        }
        case 7: {
            if (who instanceof Coder || who instanceof Designer) {
                who.code();
            } else if (who instanceof Tester) {
                let test_methods = ["вручную", "автотесты"];
                let rand_method = Math.round(Math.random() * (test_methods.length - 1));
                who.test(test_methods[rand_method]);
            } else if (who instanceof Techwriter) {
                who.write_documentation();
            } else if (who instanceof Manager) {
                who.organize_meeting();
            }
            break;
        }
        case 8: {
            if (who instanceof Tester) {
                who.make_testing_method();
            } else if (who instanceof Designer) {
                who.create_design();
            } else if (who instanceof Manager) {
                who.communicate_with_customer();
            }
            break;
        }
        case 9: {
            if (who instanceof Tester) {
                who.make_testbench();
            } else if (who instanceof Designer) {
                who.create_UX();
            }
            break;
        }
        case 10: {
            if (who instanceof Designer) {
                who.draw();
            }
            break;
        }
    }

    if (current_project.readiness >= current_project.difficulty) {
        write_log("Всем премию!");
        // Остановка всех таймаутов на странице:
        var id = window.setTimeout(function() {}, 0);

        while (id--) {
            window.clearTimeout(id);
        }
    }
}

function start_working_day(who) {
    // Идентификатор интервала для каждого конкретного человека хранится в params.work_interval:
    who.params.work_interval = setInterval(function () {

        if (who.params.start_day) {
            do_something(who, 1);
            who.params.start_day = false;
        }

        let rand_method = Math.round(Math.random() * (Object.getOwnPropertyNames(who).length - 2) + 3);

        do_something(who, rand_method);

    }, 1000);
}

function start_working_day_for(whom) {
    if (whom.length) {
        for (let i = 0; i < whom.length; i++) {
            start_working_day(whom[i]);
        }
    }
}

function start_working_day_all() {
    start_working_day_for(coders);
    start_working_day_for(testers);
    start_working_day_for(techwriters);
    start_working_day_for(designers);
    start_working_day_for(managers);
}

function initialize_day() {

    start_working_day_all();

    setTimeout(function () {
        end_working_day_all();
    }, DAY_PERIOD);

    let day_counter = 1;

    // Для обеспечения правильных интервалов между рабочими днями.
    // Во всём виновата чёртова асинхронность.
    for (let i = 0; i < (current_project.planned_time - 1) * 2; i += 2) {

        setTimeout(function () {
            start_working_day_all();
        }, (NIGHT_PERIOD) * (i + 2));

        setTimeout(function () {
            end_working_day_all();

            day_counter++;

            if (day_counter == current_project.planned_time) {
                if (current_project.readiness < current_project.difficulty) {
                    write_log("Всех уволить!");
                } else {
                    write_log("Закончили в срок!");
                }
            }

        }, DAY_PERIOD + (NIGHT_PERIOD) * (i + 2));

    }

}

function end_working_day(who) {
    do_something(who, 2);
    clearInterval(who.params.work_interval);
    who.params.start_day = true;
}

function end_working_day_for(whom) {
    if (whom.length) {
        for (let i = 0; i < whom.length; i++) {
            end_working_day(whom[i]);
        }
    }
}

function end_working_day_all() {
    end_working_day_for(coders);
    end_working_day_for(testers);
    end_working_day_for(techwriters);
    end_working_day_for(designers);
    end_working_day_for(managers);
}

function add_human(who, where, name, gender, skill, language) {
    if ("coder" == who) {
        where[where.length] = new Coder(name, gender, skill, language);
    } else if ("tester" == who) {
        where[where.length] = new Tester(name, gender, skill);
    } else if ("techwriter" == who) {
        where[where.length] = new Techwriter(name, gender, skill);
    } else if ("designer" == who) {
        where[where.length] = new Designer(name, gender, skill, language);
    } else if ("manager" == who) {
        where[where.length] = new Manager(name, gender, skill);
    }
}

function get_gender() {
    gender_val = "";

    if ($('#' + $('#human_selection').val() + '_gender_m').prop("checked")) {
        gender_val = "m";
    } else if ($('#' + $('#human_selection').val() + '_gender_f').prop("checked")) {
        gender_val = "f";
    }
}

function increase_project_readiness(skill) {
    let difficulty_percent = current_project.difficulty / 100;
    let skill_percent = skill;
    let delta = skill_percent * difficulty_percent
    if (current_project.readiness + delta <= current_project.difficulty) {
        current_project.readiness += delta;
    } else {
        current_project.readiness = current_project.difficulty;
        write_log("ВСЁ.");
    }

    $('#project_progress_bar').prop("value", current_project.readiness);

}
