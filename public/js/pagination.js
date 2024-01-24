
// const totalPages = ;
// const currentPage = ;

// function generatePagination() {
//     const paginationContainer = document.getElementById('pagination');
//     paginationContainer.innerHTML = ''; // Clear existing pagination links

//     if (totalPages > 1) {
//         // Add "Previous" link
//         paginationContainer.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
//                                             <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
//                                         </li>`;

//         // Add page links
//         for (let i = 1; i <= totalPages; i++) {
//             paginationContainer.innerHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}">
//                                                 <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
//                                             </li>`;
//         }

//         // Add "Next" link
//         paginationContainer.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
//                                             <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
//                                         </li>`;
//     }
// }

// function changePage(newPage) {
//     // Handle page change logic here
//     // Call the server to fetch data for the new page, e.g., fetchUsers(newPage);

//     // Update the currentPage and regenerate pagination
//     currentPage = newPage;
//     generatePagination();
// }

// // Initial generation of pagination links
// generatePagination();