//type animation
const typeAnimation = (str, time, element) => {
    // const element = document.getElementById(`${id}`);
    let i = 0;
    const interval = setInterval(() => {
        element.innerHTML += str[i];
        i++;
        if (i >= str.length) {
            clearInterval(interval);
        }
    }, time);
}

export { typeAnimation };