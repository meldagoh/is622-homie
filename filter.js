//find all elements with "item" class
//function to initially loop through all items and hide them
// function hide_init(){
//    for (var i = 0; i < alls.length; ++i) { 
//  alls[i].style.display = 'none'; 
// }
// }


// function show_all(){  
//   //loop through all items and show them
//    for (var i = 0; i < alls.length; ++i) { 
//  alls[i].style.display = 'inline-block'; 
// } 
// }


function show_one_dollar(){  
    var onedollars = document.querySelectorAll('.onedollar');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < onedollars.length; ++i) { 
    onedollars[i].style.display = 'inline-block'; 
} 
}

function show_two_dollar(){  
    var twodollars = document.querySelectorAll('.twodollar');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < twodollars.length; ++i) { 
    twodollars[i].style.display = 'inline-block'; 
} 
}

function show_three_dollar(){  
    var threedollars = document.querySelectorAll('.threedollar');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < threedollars.length; ++i) { 
    threedollars[i].style.display = 'inline-block'; 
} 
}

function show_wifiavailable(){
    var wifiavailable = document.querySelectorAll('.wifiavailable');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < wifiavailable.length; ++i) { 
    wifiavailable[i].style.display = 'inline-block'; 
} 
}

function show_nowifi(){
    var nowifi = document.querySelectorAll('.nowifi');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < nowifi.length; ++i) { 
    nowifi[i].style.display = 'inline-block'; 
} 
}


function show_one_room (){
    var oneroom = document.querySelectorAll('.room1');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < oneroom.length; ++i) { 
    oneroom[i].style.display = 'inline-block'; 
} 
}

function show_two_room (){
    var tworoom = document.querySelectorAll('.room2');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < tworoom.length; ++i) { 
    tworoom[i].style.display = 'inline-block'; 
} 
}

function show_three_room (){
    var threeroom = document.querySelectorAll('.room3');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < threeroom.length; ++i) { 
    threeroom[i].style.display = 'inline-block'; 
} 
}

function show_four_room (){
    var fourroom = document.querySelectorAll('.room4');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < fourroom.length; ++i) { 
    fourroom[i].style.display = 'inline-block'; 
} 
}

function show_five_room (){
    var fiveroom = document.querySelectorAll('.room5');
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
        alls[i].style.display = 'none'
    }
   for (var i = 0; i < fiveroom.length; ++i) { 
    fiveroom[i].style.display = 'inline-block'; 
} 
}

function reset(){
    var alls = document.querySelectorAll('.project_container');
    for (var i = 0; i < alls.length; ++i) { 
         alls[i].style.display = 'inline-block'; 
    } 
}
