    const loader = document.getElementById('loader');
    const bar = document.querySelector('.loader-bar');
    const percent = document.querySelector('.loader-percent');

    // Custom progress steps
    const steps = [10, 50, 75, 100];
    let index = 0;

    const interval = setInterval(() => {
        const value = steps[index];
        bar.style.width = value + '%';
        percent.textContent = value + '%';

        index++;

        if (index >= steps.length) {
            clearInterval(interval);
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 500);


    