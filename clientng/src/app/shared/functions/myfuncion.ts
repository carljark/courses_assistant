export function myfunction() {
    const y = document.getElementById('myTopnav');
    if (y.className === 'topnav') {
        y.className += ' responsive';
    } else {
        y.className = 'topnav';
    }
}
