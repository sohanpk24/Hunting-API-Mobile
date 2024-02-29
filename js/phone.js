const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones, isShowAll)
};



const displayPhones = (phones, isShowAll)=>{
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';

    //display show all button if there  more then 12 phones
    const showAllContainer = document.getElementById('show-all-container')

    if(phones.length> 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }

    console.log('is show all', isShowAll)

    //display only 12 phone first if not show all
    if(!isShowAll){
      phones = phones.slice(0,12)
    }

    phones.forEach(phone=>{
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`
        phoneCard.innerHTML = ` 
        <figure>
        <img
          src="${phone.image}" 
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button onclick ="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
        </div>
      </div>
        `;

        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false)
}


const handleShowDetail = async (id) =>{
  console.log('show details', id)
  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json()
  const phone = data.data

  showPhoneDetails(phone)
}


const showPhoneDetails = (phone) =>{
  console.log(phone)
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" class="w-cover" />
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>GPS:</span>${phone?.others?.GPS}</p>
  <p><span>displaySize:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>releaseDate:</span>${phone?.mainFeatures?.releaseDate}</p>
  <p><span>USB:</span>${phone?.others?.USB}</p>
  <p><span>memory:</span>${phone?.mainFeatures?.memory}</p>
  <p><span>slug:</span>${phone?.slug}</p>
  
  `


  show_detail_modal.showModal()
}


//handle search button
const handleSearch = (isShowAll) =>{
  toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText,isShowAll)
}

//handle search button 2
// const handleSearch2= ()=> {
//   toggleLoadingSpinner(true)
//   const searchField = document.getElementById('search-field2')
//   const searchText= searchField.value;
//   console.log(searchText)
//   loadPhone(searchText)
// }


//loading spinner
const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}


//handle show all
const handleShowAll = () =>{
  handleSearch(true)

}

loadPhone()