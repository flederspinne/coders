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
        }
        case 2: {
            who.go_home();
        }
        case 3: {
            who.drink("кофе");
        }
        case 4: {
            who.laugh();
        }
        case 5: {
            who.read_documentation();
        }
        case 6: {
            who.talk();
        }
        case 7: {
            who.code();
        }
    }
}
