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

    $('#deadline_progress_bar').prop("value", day_counter);

    // Для обеспечения правильных интервалов между рабочими днями.
    // Во всём виновата чёртова асинхронность.
    for (let i = 0; i < (current_project.planned_time - 1) * 2; i += 2) {

        setTimeout(function () {
            start_working_day_all();
        }, (NIGHT_PERIOD) * (i + 2));

        setTimeout(function () {
            end_working_day_all();

            day_counter++;

            $('#deadline_progress_bar').prop("value", day_counter);

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

function count_all_people() {
    return(coders.length + testers.length + techwriters.length + designers.length + managers.length);
}

function show_all_people() {
    let coders_number = "<p>Число программистов: " + coders.length + "</p>";
    let testers_number = "<p>Число тестировщиков: " + testers.length + "</p>";
    let techwriters_number = "<p>Число технических писателей: " + techwriters.length + "</p>";
    let designers_number = "<p>Число веб-дизайнеров: " + designers.length + "</p>";
    let managers_number = "<p>Число менеджеров: " + managers.length + "</p>";

    $('#wanna_add_another_human').html("<p>Добавить ещё сотрудника или перейти к настройкам?</p><br>" + coders_number +
    testers_number + techwriters_number + designers_number + managers_number);
}

function add_human(who, where, name, gender, skill, language) {

    let current_type = "";

    if ("coder" == who) {
        where[where.length] = new Coder(name, gender, skill, language);
        coders[coders.length - 1].params.place_x = workplace_x;
        coders[coders.length - 1].params.place_y = workplace_y;
        current_type = coders[coders.length - 1].params.specialty;
    } else if ("tester" == who) {
        where[where.length] = new Tester(name, gender, skill);
        testers[testers.length - 1].params.place_x = workplace_x;
        testers[testers.length - 1].params.place_y = workplace_y;
        current_type = testers[testers.length - 1].params.specialty;
    } else if ("techwriter" == who) {
        where[where.length] = new Techwriter(name, gender, skill);
        techwriters[techwriters.length - 1].params.place_x = workplace_x;
        techwriters[techwriters.length - 1].params.place_y = workplace_y;
        current_type = techwriters[techwriters.length - 1].params.specialty;
    } else if ("designer" == who) {
        where[where.length] = new Designer(name, gender, skill, language);
        designers[designers.length - 1].params.place_x = workplace_x;
        designers[designers.length - 1].params.place_y = workplace_y;
        current_type = designers[designers.length - 1].params.specialty;
    } else if ("manager" == who) {
        where[where.length] = new Manager(name, gender, skill);
        managers[managers.length - 1].params.place_x = workplace_x;
        managers[managers.length - 1].params.place_y = workplace_y;
        current_type = managers[managers.length - 1].params.specialty;
    }

    let dude_gender = "";
    if ("m" == gender) {
        dude_gender = "<img src='img/dude.png'>";
    } else if ("f" == gender) {
        dude_gender = "<img src='img/dude_f.png'>";
    }

    $('#workplace_' + workplace_y + '_' + workplace_x).append("<div class='dude'>" +
        "<p class='text_small'>" + current_type + " " + name + "</p>" +
        "<p id='skill_" + workplace_y + "_" + workplace_x + "' class='text_small'>Опыт: " + skill + "</p>" +
        "<p id='cheerfulness_" + workplace_y + "_" + workplace_x + "' class='text_small'>Настроение: " + 50 + "</p>" +
        "<br>" + dude_gender + "</div>");

    if (workplace_x < 4) {
        workplace_x++;
    } else {
        workplace_x = 0;
        if (workplace_y < 3) {
            workplace_y++;
        }
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

function increase_skill(who) {
    who.params.skill++;
    $('#skill_' + who.params.place_y + '_' + who.params.place_x).text("Опыт: " + who.params.skill);
}

function change_cheerfulness(who, how) {
    who.params.cheerfulness += how;
    $('#cheerfulness_' + who.params.place_y + '_' + who.params.place_x).text("Настроение: " + who.params.cheerfulness);
}

function increase_project_readiness(skill) {
    let difficulty_percent = current_project.difficulty / 100;
    let skill_percent = skill;
    let delta = skill_percent * difficulty_percent
    if (current_project.readiness + delta <= current_project.difficulty) {
        current_project.readiness += delta;
    } else {
        current_project.readiness = current_project.difficulty;
        write_log("Проект завершён.");
    }

    $('#project_progress_bar').prop("value", current_project.readiness);

}
