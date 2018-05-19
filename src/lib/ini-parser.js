var IniParser = {
    _regex : {
        _section : /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        _setting   : /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        _comment : /^\s*;.*$/,
        _line    : /\r\n|\r|\n/
    },
    _splitIntoLines(rawIni) {
        return rawIni.split(this._regex._line);
    },
    _isComment(line) {
        return this._regex._comment.test(line);
    },
    _isSetting(line) {
        return this._regex._setting.test(line);
    },
    _isSection(line) {
        return this._regex._section.test(line);
    },
    /**
     * returns an object that represents the values found and set in the given INI file
     */
    parse(rawIni) {
        const lines = this._splitIntoLines(rawIni);
        let parsedData = {};
        let currentSection = null;
        lines.forEach(((line) => {
            if (line.length === 0 || this._isComment(line)) {
                return;
            } else if (this._isSetting(line)) {
                const [,field, value] = line.match(this._regex._setting);
                if (currentSection) {
                    parsedData[currentSection][field] = value;
                } else {
                    parsedData[field] = value;
                }
            } else if (this._isSection(line)) {
                const [,section] = line.match(this._regex._section);
                parsedData[section] = {};
                currentSection = section;
            }
        }).bind(this));
        return parsedData;
    }
};
export default IniParser;