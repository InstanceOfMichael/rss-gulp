/* http://stackoverflow.com/a/1141816 */
String.prototype.replaceAll = String.prototype.replaceAll||function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}
