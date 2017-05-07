/**
 * Created by Ksenia on 07.05.2017.
 */

function get_time() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var millisecond = now.getMilliseconds();

    return hour + ":" + minute + ":" + second + ":" + millisecond;
}

function write_log(something) {
    document.write(get_time() + " " + something + "<br>");
}
