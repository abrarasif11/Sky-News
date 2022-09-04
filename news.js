// ---- loading news --- //
const loadCatagories = async () =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCatagories(data.data.news_category);    
    } catch (error){
        console.log(error);
    }
   
} 
//----- display catagories -----//
const displayCatagories = (catagories) => {
    const allCatagories = document.getElementById('all-catagories');
    catagories.forEach((catagory) =>{
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `
        <button class="buttons" style="font-family: 'Poppins', sans-serif; border: none; color :  #5D5FEF;" onclick="loadNews(${catagory.category_id})">${catagory.category_name}</button>
        ` ;
        allCatagories.appendChild(catagoryDiv);
    })
}

// News section //
const loadNews = async (id) => {
    const url = `
      https://openapi.programming-hero.com/api/news/category/0${id}
      `;
    const res = await fetch(url);
    const data = await res.json();
    displayNewses(data.data);
  };
  
  // Display News//
  const displayNewses = (newses) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";
  
    newses.forEach((news) => {
      // console.log(news);
      const newDiv = document.createElement("div");
      newDiv.classList.add("col");
      newDiv.innerHTML = `
            <div class="card">
                          <img src="${
                            news.thumbnail_url
                          }" class="card-img-top h-50" alt="...">
                          <div class="card-body">
                              <h2 style="font-family: 'Poppins', sans-serif;" class="card-title">${news.title}</h2>
                              <p style="font-family: 'Poppins', sans-serif;" class="card-text">${news.details.slice(
                                0,
                                100
                              )}...</p>
                              <div class="d-flex align-items-start">
                              <h3 style="font-family: 'Poppins', sans-serif;">${news.author.name ? news.author.name  : 'No Name Found'}</h3>
                              </div>
                              <img class="w-25 h-25 ps-2 rounded-circle" src="${news.author.img}" alt="">
                              <p style="font-family: 'Poppins', sans-serif;" class="pt-3">${news.author.published_date ? news.author.published_date  : 'No Date Found'}</p>
                              <p <i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view  : '0'}</p>
                              </div>                            
                              <button onclick="loadnewsDetails('${news._id}')" href="#" class="btn btn-primary" style="background-color: #5D5FEF; font-family: 'Poppins', sans-serif;" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Detail News</button> 
                      </div>
      `;
      newsContainer.appendChild(newDiv);
    });
  };

// ---- Modal Section ---- //

  const loadnewsDetails = async(id_name) =>{
    const url =  `https://openapi.programming-hero.com/api/news/${id_name}`;
    const res = await fetch(url);
    const data = await res.json();
    displaynewsDetails(data.data[0]);
  }
  
  const displaynewsDetails = news =>{
    const newsDetailModalLabel = document.getElementById('newsDetailModalLabel');
    newsDetailModalLabel.innerText = news.title;
    console.log(news);
    
    const modalTitle = document.getElementById('newsDetailModalLabel');
    // modalTitle.innerText = news.author.name;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML =`
    
    <img class="w-100" src="${news.image_url}" alt="">
    <p style="font-family: 'Poppins', sans-serif;" class="card-text">${news.details}</p>
    <h4 style="font-family: 'Poppins', sans-serif;">${news.author.name ? news.author.name  : 'No Name Found'}</h4>
    <img class="w-25 h-25 ps-2 rounded-circle" src="${news.author.img}" alt="">
    <p style="font-family: 'Poppins', sans-serif;" class="pt-3">${news.author.published_date ? news.author.published_date  : 'No Date Found'}</p>
    <p <i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view  : '0'}</p>
    `;
  }
loadCatagories();

