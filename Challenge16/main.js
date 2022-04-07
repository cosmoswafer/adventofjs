class Main {
    constructor() {
        const svgs = document.querySelectorAll('svg');
        svgs.forEach((s) =>
            s.addEventListener('click', (e) => {
                const selected_svg = e.currentTarget.parentElement;
                if (selected_svg.classList.contains('selected'))
                    selected_svg.classList.remove('selected');
                else {
                    svgs.forEach((ss) =>
                        ss.parentElement.classList.remove('selected')
                    );
                    selected_svg.classList.add('selected');
                }
            })
        );
    }
}

const main = new Main();
