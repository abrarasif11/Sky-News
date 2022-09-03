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

loadCatagories();