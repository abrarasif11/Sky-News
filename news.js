// loading news //
const loadCatagories = async () =>{
    try{
        const url = ` https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCatagories(data.data.news_category);    
    } catch (error){
        console.log(error);
    }
   
} 
// display catagories //
const displayCatagories = (catagories) => {
    const allCatagories = document.getElementById('all-catagories');
    catagories.forEach((catagory) =>{
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `
        <button class="buttons" style="font-family: 'Poppins', sans-serif; border: none;" onclick="loadNews(${catagory.category_id})">${catagory.category_name}</button>
        ` ;
        allCatagories.appendChild(catagoryDiv);
    })
}
// news section //
const loadNews = async (id) => {
    const url = `
      https://openapi.programming-hero.com/api/news/category/0${id}
      `;
    const res = await fetch(url);
    const data = await res.json();
    displayNewses(data.data);
  };
  
  // Display News
  const displayNewses = (newses) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";
  
    newses.forEach((news) => {
      console.log(news);
      const newDiv = document.createElement("div");
      newDiv.classList.add("col");
      newDiv.innerHTML = `
            <div class="card">
                          <img src="${
                            news.thumbnail_url
                          }" class="card-img-top h-50" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${news.title}</h5>
                              <p class="card-text">${news.details.slice(
                                0,
                                100
                              )}...</p>
                          </div>
                      </div>
      `;
      newsContainer.appendChild(newDiv);
    });
  };
loadCatagories();