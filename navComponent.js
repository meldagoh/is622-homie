// Vue instance
const main = Vue.createApp({});

// Create a new Vue component
main.component("nav-component", {
  template: `


        <nav class="navbar navbar-expand-xl  " style='background-color:#dbe6da'>
        <a class="navbar-brand" href="../home.html">
        <img  class='mx-4 mt-3'src='/images/Screenshot 2022-11-07 at 12.40.27 AM.png' style='width : 220px; margin-left:10px'>
        </a>
        <button class="navbar-toggler mx-4" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon " ></span>
        </button>
      
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          <ul class="navbar-nav ">
            <li class="nav-item active mx-4 ">
              <a class="nav-link" href="/home.html#project-area">
            
            <br>
            <h1 class="fs-5 fw-bold">home <span class="sr-only">(current)</span></a></h1>
            
            </li>
            <li class="nav-item mx-4">
            <a class="nav-link" href="/roomieCreation/roomieCreation.html">
            
          
          <br>
          <h1 class="fs-5 fw-bold">List as a roommate <span class="sr-only">(current)</span></a></h1>
          
            </li>
            <li class="nav-item mx-4">
              <a class="nav-link" href="/Lodginglisting/lodginglisting.html">
         
            <br>
            <h1 class="fs-5 fw-bold">list your lodging <span class="sr-only">(current)</span></a></h1>
            
            </li>
            </li>
            <li class="nav-item mx-4">
            <a class="nav-link" href="/savedListing/saved_listings.html">
           
            <br>
            <h1 class="fs-5 fw-bold">Saved listings <span class="sr-only">(current)</span></a></h1>
            
          </li>
            <li class="nav-item mx-4">
            <a class="nav-link" href="/Loading/loadingprofile.html">
           
            <br>
            <h1 class="fs-5 fw-bold">profile <span class="sr-only">(current)</span></a></h1>
            </li>
              
            </li>
            
          </ul>
    
        </div>
      </nav> 
      
  </body>
    `,
});

// Link this Vue instance with <div id="main">
main.mount("#main");



// <body >
// <nav class="navbar" style='background: #dbe6da; position:sticky ;overflow:hidden; white-space: nowrap'>
//     <div class="container-fluid" >
//         <ul class=" list-unstyled navbar  mx-3 my-0 ">
//             <li>
//                 <img src="/images/logo.png" style="width: 200px; display:inline-block" alt="">
//             </li>
//             </ul>
//         <div>
        
//         </div>
     
//         <ul class=" list-unstyled navbar my-1  my-0 ">

//         <li class="nav-item text-center mx-5 ">
//             <a class="nav-link" href="/register,login/login.html">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="black" class="bi bi-person-fill" viewBox="0 0 16 16">
//                     <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
//                 </svg>
            
//             </a>
//             Login
//         </li>
//             <li class="nav-item text-center">
//                 <a class="nav-link" href="/home.html#project-area">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="35" height="44" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
//                 <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
//                     </svg>
//             </a>
//             Homepage
//             </li>
//         </ul>     
//     </div>
//     </nav>




//     <nav class="navbar" style='background: #dbe6da; position:sticky ;overflow:hidden; white-space: nowrap'>
//     <div class="container-fluid" >
//         <ul class=" list-unstyled navbar my-1  mx-3 my-0 ">
//             <li class="d-flex">
//             <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-search px-2" viewBox="0 0 16 16">
//             <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
//           </svg>
//               <input class="form-control me-2  bg-opacity-25" style="border-radius: 30px; width:300px"type="search" placeholder="Where are you looking?" aria-label="Location">
//             </li>
//             <li class="d-flex">
              
//             </li>
//             <li>
//               <form>
//               <button type="button" class="btn form-control  me-2 bg-opacity-25" style="border-radius: 30px;"  type="submit" style="background-color:#67aa94; color:white">Go</button>
//               </form>
//             </li>

//           </li>
//             </ul>
//         <div>
        
//         </div>
     
//         <ul class=" list-unstyled navbar my-1  my-0 ">

//         <li class="nav-item text-center  ">
//         <a class="nav-link" href="/Lodginglisting/lodginglisting.html">
//         <button type="button" class="btn  me-2 d-inline-flex h-30" style='border-radius:30px; background-color:#67aa94 ;color:white; white-space: nowrap' > List a property  </button>
//       </a>
//         </li>
//             <li class="nav-item text-center">
//             <a class="nav-link" href="/roomieCreation.html">
//             <button type="button" class="btn  px-5   h-30" style='border-radius:30px; background-color:#67aa94 ;color:white; white-space:nowrap' >  List as a roommate  </button>
//             </a>
//             </li>


//         <li class="nav-item text-center mx-3 fa-3x ">
//         <a class="nav-link" href="/saved_listings.html">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16" style="font-size:34px" >
//           <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
//         </svg>
//         </a>
//         </li>

//         </ul>     

//     </div>
//     </nav>


// <nav class="container navbar navbar-expand-lg navbar-light bg-light">
// <a class="navbar-brand" href="#">Logo Here</a>
// <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
//     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
// </button>

// <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <div class="navbar-nav mr-auto">
//         <router-link to="/" class="nav-item nav-link">Home</router-link>
//         <router-link to="/About" class="nav-item nav-link">About</router-link>
//         <router-link to="/Careers" class="nav-link">Careers</router-link>
//         <router-link to="/Contact" class="nav-link">Contact</router-link>
//     </div>
//     <form class="d-flex">
//         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
//         <button class="btn btn-outline-success" type="submit">Search</button>
//     </form>
// </div>
// </nav>
// </div>


// <li class="nav-item dropdown">
{/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Dropdown
</a>
<div class="dropdown-menu" aria-labelledby="navbarDropdown">
<a class="dropdown-item" href="#">Action</a>
<a class="dropdown-item" href="#">Another action</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item" href="#">Something else here</a>
</div>
</li> */}