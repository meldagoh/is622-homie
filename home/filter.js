document.addEventListener('DOMContentLoaded', function () {
    const filterDate  = document.getElementById('filterDate');
    const filterPrice = document.getElementById('filterPrice');
    const priceLabel  = document.getElementById('priceLabel');
    const resetBtn    = document.getElementById('resetFilters');
    const noResults   = document.getElementById('noResults');

    // Flatten all card cols into one array regardless of which .row they sit in
    function getAllCards() {
        return Array.from(document.querySelectorAll('#lodgingDiv .col[data-price]'));
    }

    function applyFilters() {
        const maxPrice     = parseInt(filterPrice.value);
        const selectedDate = filterDate.value;
        const occValue     = document.querySelector('input[name="filterOccupancy"]:checked').value;

        priceLabel.textContent = '$' + maxPrice.toLocaleString();

        const cards = getAllCards();
        let visible = 0;

        cards.forEach(function (card) {
            const price     = parseInt(card.dataset.price);
            const available = card.dataset.available;
            const occupied  = parseInt(card.dataset.occupied);
            const capacity  = parseInt(card.dataset.capacity);
            const isFull    = occupied >= capacity;

            const priceOk  = price <= maxPrice;
            const dateOk   = !selectedDate || available <= selectedDate;
            const occOk    = occValue === 'all' || !isFull;
            const shouldShow = priceOk && dateOk && occOk;
            const isCurrentlyHidden = card.classList.contains('d-none');

            if (shouldShow) {
                if (isCurrentlyHidden) {
                    // Animate card in
                    card.classList.remove('d-none', 'card-hiding');
                    // Force reflow so animation triggers fresh
                    void card.offsetWidth;
                    card.classList.add('card-showing');
                    card.addEventListener('animationend', function handler() {
                        card.classList.remove('card-showing');
                        card.removeEventListener('animationend', handler);
                    });
                }
                visible++;
            } else {
                if (!isCurrentlyHidden) {
                    // Animate card out, then hide
                    card.classList.add('card-hiding');
                    card.addEventListener('transitionend', function handler() {
                        card.classList.add('d-none');
                        card.classList.remove('card-hiding');
                        card.removeEventListener('transitionend', handler);
                    });
                }
            }
        });

        // Show/hide no-results after transitions settle
        setTimeout(function () {
            const anyVisible = getAllCards().some(c => !c.classList.contains('d-none'));
            noResults.classList.toggle('d-none', anyVisible);
        }, 400);
    }

    filterPrice.addEventListener('input', applyFilters);
    filterDate.addEventListener('change', applyFilters);
    document.querySelectorAll('input[name="filterOccupancy"]').forEach(function (radio) {
        radio.addEventListener('change', applyFilters);
    });

    resetBtn.addEventListener('click', function () {
        filterDate.value  = '';
        filterPrice.value = 2000;
        document.getElementById('occAll').checked = true;
        applyFilters();
    });

    applyFilters();
});