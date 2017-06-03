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
}

function working_day(who) {
    setInterval(function () {

        if (who.params.start_day) {
            do_something(who, 1);
            who.params.start_day = false;
        }

        let rand_method = Math.round(Math.random() * (Object.getOwnPropertyNames(who).length - 2) + 3);

        do_something(who, rand_method);

    }, 2000);
}

function initialize_day_for(who) {
    if (who.length) {
        for (let i = 0; i < who.length; i++) {
            working_day(who[i]);
        }
    }
}

function initialize_day() {
    initialize_day_for(coders);
    initialize_day_for(testers);
    initialize_day_for(techwriters);
    initialize_day_for(designers);
    initialize_day_for(managers);
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
    // alert(JSON.stringify(where[where.length - 1]));

    $('#add_' + $('#human_selection').val() + '_form').css("visibility", "hidden");
    $('#wanna_add_another_human').css("visibility", "visible");
    $('#choose_human_form').css("visibility", "visible");
    $('#button_settings').css("visibility", "visible");
}

function get_gender() {
    gender_val = "";

    if ($('#' + $('#human_selection').val() + '_gender_m').prop("checked")) {
        gender_val = "m";
    } else if ($('#' + $('#human_selection').val() + '_gender_f').prop("checked")) {
        gender_val = "f";
    }
}

function input_fields_width_align() {
    try {
        // В IE выравнивание происходит некорректно, отступ слева больше.
        // Substring нужен для того, чтобы убрать "px" в возвращаемом значении:
        /* let info_fields_width = $('.info_fields').css("width").substring(0, $('.info_fields').css("width").length - 2);

        let info_fields_padding = $('.info_fields').css("padding").substring(0, $('.info_fields').css("padding").length - 2);
        let body_width = $('body').css("width").substring(0, $('body').css("width").length - 2);
        let info_fields_margin_left = (body_width - info_fields_width - info_fields_padding * 2) / 2;

        $('.info_fields').css("margin-left", info_fields_margin_left + "px"); */
    } catch(err) {
        alert(err);
    }
}