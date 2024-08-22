// Dummy JSON Data
const colleges = [
    {
        rank: 1,
        name: "IIT Madras - Indian Institute of Technology",
        location: "Chennai, Tamil Nadu",
        fees: 209550,
        placement: {
            average: 2148000,
            highest: 19800000
        },
        userRating: 8.6,
        ranking: "3rd/131",
        featured: false,
        logo: "./image/iitMlogo.jpeg",
        courses: "B.Tech. Computer Science Engineering",
        cutoff: 144
    },
    {
        rank: 2,
        name: "IIT Delhi - Indian Institute of Technology",
        location: "New Delhi, Delhi-NCR",
        fees: 254650,
        placement: {
            average: 2582000,
            highest: 20000000
        },
        userRating: 8.7,
        ranking: "1st/35",
        featured: false,
        logo: "./image/iitDelhi.png",
        courses: "B.Tech. + M.Tech. Mathematics and Computing",
        cutoff: 115
    },
    {
        rank: 3,
        name: "Parul University",
        location: "Vadodara, Gujarat",
        fees: 149000,
        placement: {
            average: 400000,
            highest: 3000000
        },
        userRating: 8.1,
        ranking: "99th/147",
        featured: true,
        logo: "./image/parulunive.jpeg",
        courses: "B.Tech.",
        cutoff: 66
    },
    {
        rank: 4,
        name: "IIT Bombay - Indian Institute of Technology",
        location: "Mumbai, Maharashtra",
        fees: 229300,
        placement: {
            average: 2182000,
            highest: 36700000
        },
        userRating: 8.8,
        ranking: "2nd/35",
        featured: false,
        logo: "./image/iitbombaylogo.png",
        courses: "B.Tech. Computer Science Engineering",
        cutoff: 66
    },
    {
        rank: 5,
        name: "IIT Kharagpur - Indian Institute of Technology",
        location: "Kharagpur, West Bengal",
        fees: 220000,
        placement: {
            average: 2100000,
            highest: 36000000
        },
        userRating: 8.5,
        ranking: "4th/35",
        featured: false,
        logo: "./image/iitkharagpur.png",
        courses: "B.Tech. Electrical Engineering",
        cutoff: 130
    },
    {
        rank: 6,
        name: "BITS Pilani - Birla Institute of Technology and Science",
        location: "Pilani, Rajasthan",
        fees: 390000,
        placement: {
            average: 2000000,
            highest: 42000000
        },
        userRating: 8.4,
        ranking: "5th/40",
        featured: true,
        logo: "./image/bitsPilani.jpeg",
        courses: "B.E. Computer Science",
        cutoff: 150
    },
    {
        rank: 7,
        name: "NIT Trichy - National Institute of Technology",
        location: "Tiruchirappalli, Tamil Nadu",
        fees: 170000,
        placement: {
            average: 1600000,
            highest: 28000000
        },
        userRating: 8.3,
        ranking: "8th/50",
        featured: false,
        logo: "./image/nittrichy.png",
        courses: "B.Tech. Mechanical Engineering",
        cutoff: 110
    },
    {
        rank: 8,
        name: "VIT Vellore - Vellore Institute of Technology",
        location: "Vellore, Tamil Nadu",
        fees: 198000,
        placement: {
            average: 1700000,
            highest: 30000000
        },
        userRating: 8.2,
        ranking: "9th/60",
        featured: false,
        logo: "./image/vitVellore.png",
        courses: "B.Tech. Information Technology",
        cutoff: 120
    },
    {
        rank: 9,
        name: "SRM University, Chennai",
        location: "Chennai, Tamil Nadu",
        fees: 220000,
        placement: {
            average: 1600000,
            highest: 24000000
        },
        userRating: 8.0,
        ranking: "10th/75",
        featured: true,
        logo: "./image/SRM.png",
        courses: "B.Tech. Electronics and Communication Engineering",
        cutoff: 105
    },
    {
        rank: 10,
        name: "Anna University, Chennai",
        location: "Chennai, Tamil Nadu",
        fees: 50000,
        placement: {
            average: 1400000,
            highest: 20000000
        },
        userRating: 7.8,
        ranking: "15th/80",
        featured: false,
        logo: "./image/annaUniver.png",
        courses: "B.Tech. Civil Engineering",
        cutoff: 90
    }
    // Add more dummy colleges...
];

let displayedColleges = [];
let perPage = 10;
let currentPage = 1;

// Load initial colleges
document.addEventListener('DOMContentLoaded', function() {
    loadMoreColleges();
    document.querySelector('.table-container').addEventListener('scroll', infiniteScroll);
});

function loadMoreColleges() {
    const tableBody = document.querySelector('#collegeTable tbody');
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;
    
    const newColleges = colleges.slice(startIndex, endIndex);
    displayedColleges = displayedColleges.concat(newColleges);

    newColleges.forEach(college => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${college.rank}</td>
            <td>
                <img src="${college.logo}" alt="${college.name}" style="width: 50px; height: auto; vertical-align: middle; margin-right: 10px;">
                <span>${college.name}</span><br>
                <small>${college.location}</small><br>
                <small>${college.courses}</small><br>
                ${college.featured ? '<span class="featured">Featured</span>' : ''}
                <div><a href="#" class="apply-now">Apply Now</a> <a href="#" class="download-brochure">Download Brochure</a></div>
            </td>
            <td class="fees">₹${college.fees.toLocaleString()}</td>
            <td class="placement">₹${college.placement.average.toLocaleString()}<br><small>Highest: ₹${college.placement.highest.toLocaleString()}</small></td>
            <td class="user-rating">${college.userRating} / 10<br><small>Based on ${Math.floor(Math.random() * 1000)} User Reviews</small></td>
            <td class="ranking">${college.ranking}</td>
        `;
        tableBody.appendChild(row);
    });

    currentPage++;
}

function infiniteScroll() {
    const container = document.querySelector('.table-container');
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        loadMoreColleges();
    }
}

function sortTable(criteria) {
    displayedColleges.sort((a, b) => {
        if (a[criteria] < b[criteria]) return -1;
        if (a[criteria] > b[criteria]) return 1;
        return 0;
    });

    renderTable();
}
// added code for filter
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('feesFilter').addEventListener('change', applyFilters);
document.getElementById('ratingFilter').addEventListener('change', applyFilters);

function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const maxFees = document.getElementById('feesFilter').value;
    const minRating = document.getElementById('ratingFilter').value;

    filteredColleges = colleges.filter(college => {
        const matchesSearchQuery = college.name.toLowerCase().includes(searchQuery);
        const matchesFees = maxFees === 'all' || college.fees <= parseInt(maxFees);
        const matchesRating = minRating === 'all' || college.userRating >= parseFloat(minRating);

        return matchesSearchQuery && matchesFees && matchesRating;
    });

    // Reset the table and index, then re-render with filtered results
    document.querySelector('#collegeTable tbody').innerHTML = '';
    currentDisplayIndex = 0;
    renderTableChunk();
}

// Initial render with filters applied
applyFilters();


//end here

//new code
document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    
    // Filter the displayedColleges array based on the search query
    const filteredColleges = colleges.filter(college => {
        return college.name.toLowerCase().includes(searchQuery);
    });

    // Re-render the table with the filtered data
    renderFilteredTable(filteredColleges);
});
function renderFilteredTable(filteredColleges) {
    const tableBody = document.querySelector('#collegeTable tbody');
    tableBody.innerHTML = '';

    filteredColleges.forEach(college => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${college.rank}</td>
            <td>
                <img src="${college.logo}" alt="${college.name}" style="width: 50px; height: auto; vertical-align: middle; margin-right: 10px;">
                <span>${college.name}</span><br>
                <small>${college.location}</small><br>
                <small>${college.courses}</small><br>
                ${college.featured ? '<span class="featured">Featured</span>' : ''}
                <div><a href="#" class="apply-now">Apply Now</a> <a href="#" class="download-brochure">Download Brochure</a></div>
            </td>
            <td class="fees">₹${college.fees.toLocaleString()}</td>
            <td class="placement">₹${college.placement.average.toLocaleString()}<br><small>Highest: ₹${college.placement.highest.toLocaleString()}</small></td>
            <td class="user-rating">${college.userRating} / 10<br><small>Based on ${Math.floor(Math.random() * 1000)} User Reviews</small></td>
            <td class="ranking">${college.ranking}</td>
        `;
        tableBody.appendChild(row);
    });
}

//old
function renderTable() {
    const tableBody = document.querySelector('#collegeTable tbody');
    tableBody.innerHTML = '';

    displayedColleges.forEach(college => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${college.rank}</td>
            <td>
                <img src="${college.logo}" alt="${college.name}" style="width: 50px; height: auto; vertical-align: middle; margin-right: 10px;">
                <span>${college.name}</span><br>
                <small>${college.location}</small><br>
                <small>${college.courses}</small><br>
                ${college.featured ? '<span class="featured">Featured</span>' : ''}
                <div><a href="#" class="apply-now">Apply Now</a> <a href="#" class="download-brochure">Download Brochure</a></div>
            </td>
            <td class="fees">₹${college.fees.toLocaleString()}</td>
            <td class="placement">₹${college.placement.average.toLocaleString()}<br><small>Highest: ₹${college.placement.highest.toLocaleString()}</small></td>
            <td class="user-rating">${college.userRating} / 10<br><small>Based on ${Math.floor(Math.random() * 1000)} User Reviews</small></td>
            <td class="ranking">${college.ranking}</td>
        `;
        tableBody.appendChild(row);
    });
}
