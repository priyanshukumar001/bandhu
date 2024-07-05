
const htmlEntities = (p1) => {
    let p2 = p1.replace(/\*/g, '&#42;'); //asterics
    p2 = p2.replace(/\_/g, '&#95;'); //underscores
    p2 = p2.replace(/\`/g, '&#96;'); //backtics
    p2 = p2.replace(/\~/g, '&#126;'); //tilde
    p2 = p2.replace(/\^/g, '&#94;'); //caret
    p2 = p2.replace(/\-/g, '&#45;'); //minus sign
    p2 = p2.replace(/\!/g, '&#33;'); // exclamation mark
    p2 = p2.replace(/\"/g, '&#34;'); // double quote
    p2 = p2.replace(/\$/g, '&#36;'); // dollar sign
    p2 = p2.replace(/\%/g, '&#37;'); // percent
    p2 = p2.replace(/\'/g, '&#39;'); // single quote
    p2 = p2.replace(/\(/g, '&#40;'); // left parenthesis
    p2 = p2.replace(/\)/g, '&#41;'); // right parenthesis
    p2 = p2.replace(/\+/g, '&#43;'); // plus sign
    p2 = p2.replace(/\,/g, '&#44;'); // comma
    p2 = p2.replace(/\./g, '&#46;'); // period
    p2 = p2.replace(/\//g, '&#47;'); // forward slash
    p2 = p2.replace(/\:/g, '&#58;'); // colon
    p2 = p2.replace(/\=/g, '&#61;'); // equals sign
    p2 = p2.replace(/\?/g, '&#63;'); // question mark
    p2 = p2.replace(/\@/g, '&#64;'); // at sign
    p2 = p2.replace(/\[/g, '&#91;'); // left square bracket
    p2 = p2.replace(/\\/g, '&#92;'); // backslash
    p2 = p2.replace(/\]/g, '&#93;'); // right square bracket
    p2 = p2.replace(/\{/g, '&#123;'); // left curly brace
    p2 = p2.replace(/\|/g, '&#124;'); // vertical bar
    p2 = p2.replace(/\}/g, '&#125;'); // right curly brace

    return p2;
}

export const parseBasics = (str) => {
    str = str.replace(/\&/g, '&amp'); // ampersand
    str = str.replace(/\#/g, '&#35;'); // hash
    str = str.replace(/\</g, '&#60;'); //less than symbol
    str = str.replace(/\>/g, '&#62;'); //greater than symbol
    // str = str.replace(/\//g, '&#47;'); // forward slash
    str = str.replace(/\(([\s\S]*?)\)/gs, (match, p1) => {
        // Modify the special characater inside the matched content
        let parsedTxt = htmlEntities(p1);
        return `(${parsedTxt})`;
    });
    str = str.replace(/\/```([\s\S]+?)```\//gs, (match, p1) => {
        // Modify the special characater inside the matched content
        let backtics = p1.replace(/\`/g, '&#96;'); //backtics
        return `/${backtics}/`;
    });
    str = str.replace(/\"([\s\S]+?)\"/gs, (match, p1) => {
        // Modify the special characater inside the matched content
        let parsedTxt = htmlEntities(p1);
        return `"${parsedTxt}"`;
    });
    str = str.replace(/\//g, '&#47;'); // forward slash
    str = str.replace(/````([\s\S]+?)````/gs, "`$1`")
    return str;
}

const parseBold = (str) => {
    return str.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

const parseItalic = (str) => {
    return str.replace(/\*(?!=\s)(.+?)(?!=\s)\*/g, "<em>$1</em>");
}

const parseUnderline = (str) => {
    return str.replace(/\_\_(.+?)\_\_/g, "<u>$1</u>")
}
const parseStrikeThrough = (str) => {
    return str.replace(/\~\~(.+?)\~\~/g, "<del>$1</del>");
}

const parseBackticks = (str) => {
    // return str.replace(/(?<=\s|\n)```([\s\S]+?)```(?<=\s|\n)/gs, (match, p1) => {
    return str.replace(/```([\s\S]+?)```/gs, (match, p1) => {
        // Modify the special characater inside the matched contents
        let parsedTxt = htmlEntities(p1);
        return `<pre><code>${parsedTxt}</code></pre>`;
    });

}

//this is for technical coding words
const parseCode = (str) => {
    return str.replace(/`([^`]+)`/gs, (match, p1) => {
        // Modify the special characater inside the matched content
        let parsedTxt = htmlEntities(p1);
        return `<code class="inline">${parsedTxt}</code>`;

    });

}
const parseSuperscript = (str) => {
    return str.replace(/\^(\w+)/g, "<sup>$1</sup>");
}

const parseSubscript = (str) => {
    return str.replace(/(\w+)\^/g, "<sub>$1</sub>");
}

const parseDash = (str) => {
    return str.replace(/^(?<!\w)[\*\-]/g, "<br/>=>") // can add any character that we have check within the square bracket
}

const parseUrl = (str) => {
    return str.replace(/(?:(https?):\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g, "<a href='$1$2$3'>$1$2$3</a>");
}

const formatText = (text) => {
    let str = text;
    str = parseBasics(str);
    str = parseBackticks(str);
    str = parseCode(str);
    str = parseBold(str);
    str = parseItalic(str);
    str = parseStrikeThrough(str);
    str = parseUnderline(str);
    str = parseSubscript(str);
    str = parseSuperscript(str);
    // str = parseUrl(str);
    // str = parseDash(str);
    return str;

}

export default formatText;