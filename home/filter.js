document.addEventListener('DOMContentLoaded', function () {
    const filterDate  = document.getElementById('filterDate');
    const filterPrice = document.getElementById('filterPrice');
    const priceLabel  = document.getElementById('priceLabel');
    const resetBtn    = document.getElementById('resetFilters');
    const noResults   = document.getElementById('noResults');
    const filterLocation = document.getElementById('filterLocation'); // New location filter

    // New preferred gender filter radio buttons
    const preferredGenderRadios = document.querySelectorAll('input[name="filterPreferredGender"]');

    // Flatten all card cols into one array regardless of which .row they sit in
    function getAllCards() {
        return Array.from(document.querySelectorAll('#lodgingDiv .col[data-price]'));
    }

    function applyFilters() {
        const maxPrice     = parseInt(filterPrice.value);
        const selectedDate = filterDate.value;
        const occValue     = document.querySelector('input[name="filterOccupancy"]:checked').value;
        const locationValue = filterLocation ? filterLocation.value : 'all'; // New location filter value
        
        // New: Get preferred gender filter value
        const preferredGenderValue = document.querySelector('input[name="filterPreferredGender"]:checked').value;

        priceLabel.textContent = '$' + maxPrice.toLocaleString();

        const cards = getAllCards();
        let visible = 0;

        cards.forEach(function (card) {
            const price     = parseInt(card.dataset.price);
            const available = card.dataset.available;
            const occupied  = parseInt(card.dataset.occupied);
            const capacity  = parseInt(card.dataset.capacity);
            const isFull    = occupied >= capacity;
            const cardLocation = card.dataset.location || 'central'; // New: Get location from data attribute

            // New: Get preferred gender from data attribute
            const preferredGender = card.dataset.preferredGender || 'co-ed'; // Default to co-ed if not specified

            const priceOk  = price <= maxPrice;
            const dateOk   = !selectedDate || available <= selectedDate;
            const occOk    = occValue === 'all' || !isFull;
            
            // New: Location filter logic
            const locationOk = locationValue === 'all' || cardLocation === locationValue;
            
            // New: Preferred gender filter logic
            let genderOk = true;
            if (preferredGenderValue === 'women-only') {
                genderOk = preferredGender === 'women-only';
            } else if (preferredGenderValue === 'co-ed') {
                genderOk = preferredGender === 'co-ed';
            }
            // 'any' option shows all, no filtering needed

            const shouldShow = priceOk && dateOk && occOk && genderOk && locationOk;
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
    
    // Location filter listener
    if (filterLocation) {
        filterLocation.addEventListener('change', applyFilters);
    }
    
    // Occupancy filter listeners
    document.querySelectorAll('input[name="filterOccupancy"]').forEach(function (radio) {
        radio.addEventListener('change', applyFilters);
    });

    // New: Preferred gender filter listeners
    preferredGenderRadios.forEach(function (radio) {
        radio.addEventListener('change', applyFilters);
    });

    resetBtn.addEventListener('click', function () {
        filterDate.value  = '';
        filterPrice.value = 2000;
        document.getElementById('occAll').checked = true;
        document.getElementById('genderAny').checked = true; // Reset gender filter to 'Any'
        if (filterLocation) {
            filterLocation.value = 'all'; // Reset location filter
        }
        applyFilters();
    });

    applyFilters();
});