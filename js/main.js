import { buttonsData, menu } from "./db.js";
import { calculatePrice,elements } from "./helpers.js";

//!fonsiyonlar

function searchCategory(e) {
  //tıklanılan butonun data özelliklerine eriştik ve bir değişkene aktarıldı.
  const category = e.target.dataset.category;
//tıklanılan butonun kategorisi ile veri tabanındaki kategorileri karşılaştırır ve aynılarını sayfaya bastırır
  const filteredMenu=menu.filter((item)=>(item.category===category));
  if(category==="all")
    {
        renderMenuItems(menu);
    }
    else{
        renderMenuItems(filteredMenu);
    }
renderBottuns(category);
}

//Ekrana menü elemanlarını aktaracak fonk.
function renderMenuItems(menuItems){

//gönderilen verileri dönüp herbir veri için bir a etiketi oluşturur

let menuHTML=menuItems.map((item)=>
    `
    <a
          id="card"
          href="/productDetail.html?id=${item.id}"
          class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
        >
          <img class="rounded shadow" src="${item.img}" alt="" />
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <h5>${item.title}</h5>
              <p class="text-success"> ${calculatePrice(item.price)}</p>
            </div>
            <p class="lead">
            ${item.desc}
            </p>
          </div>
        </a>
    `

);
menuHTML=menuHTML.join("");
elements.menuArea.innerHTML=menuHTML;
}

function renderBottuns(active){
    //eski botonu siler
   elements.buttonsArea.innerHTML=""; 
   buttonsData.forEach((btn)=>{
    //butonu oluştur
        const buttonEle=document.createElement("button");
    //butonun class ını oluştur
        buttonEle.className="btn btn-outline-dark filter-btn";
      //butonun görünen ismini yazar  
     buttonEle.textContent=btn.text;
     //oluşturulan butonun kategorisini ekler
     buttonEle.dataset.category=btn.value;

     if(btn.value===active)
        {
            buttonEle.classList.add("bg-dark","text-light")
        }
        //html e gönder.
     elements.buttonsArea.appendChild(buttonEle);
    });
};

//! olay izleyicileri

document.addEventListener("DOMContentLoaded",()=>{
    renderBottuns("all");
    renderMenuItems(menu);});
    //olay izleyicisi: tıklandığında searcCategory fonk çalışır.
elements.buttonsArea.addEventListener("click", searchCategory);