const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const container = document.querySelector('.container')
const container2 = document.querySelector('.container2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    container.textContent = 'Loading...';
    container2.textContent = '';

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then(data => {
            if (data.error) container.innerHTML = data.error
            else {
                container.textContent = data.Location;
                container.style.border = '1px solid #C8C9C8';
                container2.textContent = data.Forcastdata;
                container2.style.border = '1px solid #C8C9C8';
            }
        })
    });
})