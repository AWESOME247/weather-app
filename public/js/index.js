const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const container = document.querySelector('.container')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    container.textContent = 'Loading...';

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then(data => {
            if (data.error) container.innerHTML = data.error
            else {
                container.textContent = data.Location;
                container.style.border = '1px solid #C8C9C8';

                container.textContent = data.Forcastdata;
                container.style.border = '1px solid #C8C9C8';

            }
        })
    });
})