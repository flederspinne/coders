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
    // writeln перестал работать почему-то
    document.writeln(get_time() + " " + something + "<br>");
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
            who.drink("кофе");
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
            who.code();
            break;
        }
    }
}

function working_day(who) {
    setInterval(function () {

        if (!flag_come) {
            do_something(who, 1);
            flag_come = true;
        }

        let rand_method = Math.floor(Math.random() * (Object.getOwnPropertyNames(who).length - 2) + 3);

        do_something(who, rand_method);

    }, 2000);
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