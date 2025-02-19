let filteredData = [];
let allData = [];
let currPage = 1;
let itemsPerPage = 4;

document.addEventListener("DOMContentLoaded", () => {
   
  fetchAllData();
});
async function fetchAllData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Failed to fetch data");
    allData = await response.json();
    filteredData = [...allData];

    displayData(filteredData);
  } catch (error) {
    document.getElementById(
      "errorMessage"
    ).innerHTML = `Error:${error.message}`;
  }
}
document.getElementById("searchInput").addEventListener("input",()=>{
    searchData();
})
function searchData() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    
    filteredData = allData.filter(user => 
        user.name.toLowerCase().includes(searchQuery)
    );

    currPage = 1;  // Reset to first page
    displayData(filteredData);
}


//dispalyData
function displayData(filteredData) {
  let resultContainer = document.getElementById("results");
  resultContainer.innerHTML = "";
  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  if (paginatedData.length === 0) {
    resultContainer.innerHTML = `<p class="text-center text-danger">No results found!</p>`;
    return;
  }
  let rowDiv;
  paginatedData.forEach((item, index) => {
    if (index % 3 === 0) {
      rowDiv = document.createElement("div");
      rowDiv.classList.add("row", "justify-content-center");
      resultContainer.appendChild(rowDiv);
    }
    const card = document.createElement("div");
    card.classList.add("col-lg-4");
    card.innerHTML = `<div class="card shadow m-2 p-3 d-flex flex-column gap-1">  <h2 class="card-title fs-4 text-black fw-bold">${item.name}</h2>
                            
                            <p class="fs-6 card-text text-black">Username:${item.username}</p>
                            <p class="fs-6 card-text text-black">Address: ${item.address.city} 
                            </p>
                            <p class="fs-6 card-text text-black">Phone:${item.phone}</p>
                            <p class="fs-6 card-text text-black">Company:${item.company.name}</p>
            </div>
           
                            `;
    rowDiv.appendChild(card);
  });
  updatePagination();
}
function updatePagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (totalPages <= 1) return;
  //back button
  const backButton = document.createElement("button");
  backButton.innerHTML = `<i class="fas fa-arrow-left"></i>`;
  backButton.classList.add("btn", "btn-secondary");
  if(currPage==1){
    backButton.classList.add("disabled");
    backButton.setAttribute("style","opacity:0.2");

  }
  
  backButton.addEventListener("click", () => {
    changePage(currPage - 1);
  });
  paginationContainer.appendChild(backButton);
  //page numbers
  
  for (let i = 1; i <= totalPages; i++) {
    const numButton = document.createElement("button");
    
    numButton.classList.add("btn" , "btn-secondary" ,"mx-1");
    
    numButton.innerText=i;
    
    numButton.addEventListener("click", () => {
      changePage(i);
    });
    if(i===currPage){
        numButton.classList.add("active");
        numButton.setAttribute("style","background-color:#002266");
    }
    
    paginationContainer.appendChild(numButton);
  }
  //next button
  const nextButton = document.createElement("button");
  nextButton.innerHTML = `<i class="fas fa-arrow-right"></i>`;
  nextButton.classList.add("btn", "btn-secondary");
  nextButton.disabled = currPage == totalPages;
  if(currPage==totalPages){
    nextButton.classList.add("disabled");
    nextButton.setAttribute("style","opacity:0.2");
  }
  nextButton.addEventListener("click", () => {
    changePage(currPage+1);
  });
  paginationContainer.appendChild(nextButton);
}
function changePage(pageNumber){
    currPage=pageNumber;
    displayData(filteredData);
}
