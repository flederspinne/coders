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

function add_human(who, where, name, gender, skill, ...language) {
    if ("coder" == who) {
        where[where.length] = new Coder(name, gender, skill, ...language);
    } else if ("tester" == who) {
        where[where.length] = new Tester(name, gender, skill, ...language);
    } else if ("techwriter" == who) {
        where[where.length] = new Techwriter(name, gender, skill, ...language);
    }
    alert(JSON.stringify(where[where.length - 1]));
}