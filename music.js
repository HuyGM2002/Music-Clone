/*
    Danh sách chức năng còn thiếu cần phải làm:
    1.Lỗi Index
    2.Thanh rangeBar
*/
// Source
const playBtn = document.querySelector('.pack');
const nextBtn = document.querySelector('.forward');
const prevBtn = document.querySelector('.backward');
const song = document.getElementById('song');
const ImgMus = document.querySelector('.music_image_img');
const TitleMusic = document.querySelector('.music_title h2');
const authorMusic = document.querySelector('.music_author h5');
const Shuffle = document.querySelector('.fa-shuffle');
const Loop = document.querySelector('.fa-arrow-right-arrow-left');
const durationTime = document.querySelector('.music_timer_duration');
const remainNingTime = document.querySelector('.music_timer_remain');
const rangeBar = document.querySelector('#music_task');
const firstSong = document.querySelector('.list_member:first-child');
const listPlay = document.querySelectorAll('.list_member');
let isPlaying = false ;
const arrayOfMusic = ["./music/Thuong Em Den Gia - Le Bao Binh.mp3" , "./music/Payphone - Maroon 5.mp3" , 
                      "./music/Ngay ay ban va toi - Lynk Lee.mp3" , "./music/TamBietNhe-LynkLee_3ysxj.mp3",
                      "./music/Buong Doi Tay Nhau Ra - Son Tung M-TP.mp3","./music/DongVan-TuiHat-6128871.mp3",
                      "./music/Mot Nam Moi Binh An - Son Tung M-TP.mp3","./music/LienHoa-PhuongMyChi-6269534.mp3",
                        "./music/Chi muon ben em luc nay.mp3"];
const arrayOfImg = ["./img/thuong em den gia.jpg","./img/payphone.jpg","./img/ngay ay ban va toi.jpg",
                    "./img/tam biet nhe.jpg","./img/buong doi tay nhau ra.jpg","./img/dong van.jpg",
                    "./img/nam moi binh an.jpg","./img/Lien hoa.jpg","./img/Chi-Muon-Ben-Em-Luc-Nay-Huy-Vac-ft-Jiki-X.jpg"];
const arrayOfTitle = [`Thương em đến già`,`Payphone Lyrics`,`Ngày ấy bạn và tôi`,`Tạm biệt nhé`,
                      `Buông đôi tay nhau ra`,`Đông Vân`,`Năm mới bình an`,`Liên Hoa`,`Chỉ muốn bên em lúc này`];
const arrayOfAuthor = [`Lê Bảo Bình`,`Maroon 5`,`Lynk Lee`,`Lynk Lee`,`Sơn Tùng M-TP`,`Hương Ly`,`Sơn Tùng M-TP`,`Phương Mỹ Chi`,`Jiki & Huy Vạc`];

// Play
function Play(){
    if(isPlaying){
        song.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>' ;
        isPlaying = false ; 
        ImgMus.classList.add('diverse');
        ImgMus.classList.replace('is-Playing','switch');
        setTimeout(function(){
            ImgMus.style.borderRadius = '20px';
        },550);
    }
    else{
       song.play();
       playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>' ;
       isPlaying = true ;
       ImgMus.style.borderRadius = '100%';
       ImgMus.classList.replace('switch','is-Playing');
       ImgMus.classList.remove('diverse');
    }
}
playBtn.addEventListener('click', Play);
// TIẾN LÙI
var i = 0 ;
const size = arrayOfMusic.length;
function changeSong(dir){
    if(dir == 1){
        ++i;
        if(i == size){
            i = 0 ;
        }
    }
    else if(dir == -1){
        // TH1 : Bài hát đang ở khoảng nào đó khác 00:00
        if(Math.floor(song.currentTime) != 0){
            song.currentTime = 0 ;
        }
        else if(Math.floor(song.currentTime) == 0){
            // TH2 : Bài hát đang ở phút đầu tiên (00:00)
            if(i == 0){
                i = size ; 
            } 
            --i;
        }
    }
    song.src = arrayOfMusic[i];
    ImgMus.src = arrayOfImg[i];
    TitleMusic.innerText = arrayOfTitle[i];
    authorMusic.innerText = arrayOfAuthor[i];
    isPlaying = false ;
    Paint(i);
}
nextBtn.addEventListener('click',function(){
    changeSong(1);
});
nextBtn.addEventListener('click',Play);


prevBtn.addEventListener('click',function(){
    changeSong(-1);
});
prevBtn.addEventListener('click',Play);



// 1. Shuffle
var Switch1= false ;
// Xử lý đèn màu
function turn1(){
    // if(!Switch1){
    //     Shuffle.style.color = 'rgb(13, 240, 13)';
    //     Switch1 = true;
    // }
    // else{
    //     Shuffle.style.color = 'black';
    //     Switch1 = false ;
    // }
    Shuffle.style.color = 'rgb(13, 240, 13)';
    setTimeout(function(){
        Shuffle.style.color = 'black';
    },100);
}
function MakeShuffle(){
    // if(!Switch1){
        var randomValue = getRndInteger(-1,size);
        if(randomValue >= 0 && randomValue <= 5){
            Execute(randomValue);
            Paint(randomValue);
        }
    // }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
Shuffle.addEventListener('click',MakeShuffle);
Shuffle.addEventListener('click',turn1);

// 2. Loop
var Switch2 = false ;
// Hàm lên ĐÈN
function turn2(){
    if(!Switch2){
        Loop.style.color = 'rgb(13, 240, 13)';
        Switch2 = true;
    }
    else{
        Loop.style.color = 'black';
        Switch2 = false ;
    }
}
// 2 Hàm Xử Lý
function Return(){
    song.currentTime = 0 ;
    remainNingTime.innerText = "00:00";
    isPlaying = false ;
    Play();
}
function RecurSong(){
    if(!Switch2){
        // Đang tắt loop ---> Bật Loop lên
        song.removeEventListener('ended',nextSong);
        song.addEventListener('ended',Return);
    }
    else{
        // Đang bật loop ---> Tắt Loop đi
        song.removeEventListener('ended',Return);
        song.addEventListener('ended',nextSong);
    }
}
Loop.addEventListener('click',RecurSong);
Loop.addEventListener('click',turn2);

// Thời gian chạy 
function displayTimer(){
    const {duration , currentTime} = song ; 
    rangeBar.max = duration;
    rangeBar.value = currentTime ;
    remainNingTime.textContent = formatTimer(currentTime);
    if(!duration){
        durationTime.textContent = "00:00" ;
    }
    else{
        durationTime.textContent = formatTimer(duration) ;
    }
}
function formatTimer(number){
    const minutes = Math.floor(number / 60);
    const second = Math.floor(number - minutes * 60 );
    return `${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;
}
//  chuyển bài hát khi hết nhạc 
song.addEventListener('ended',nextSong);
function nextSong(){
    changeSong(1);
    Play();
}
displayTimer();
setInterval(displayTimer,500);
rangeBar.addEventListener('change',handleChange);
function handleChange(){
    song.currentTime = rangeBar.value;
}


// List
// Mặc định màu cho bài ĐẦU TIÊN
var order = firstSong.querySelector('.list_member_order');
var icon = firstSong.querySelector('.fa-solid');
var timeofSong = firstSong.querySelector('.list_member_quantity');
Object.assign(firstSong.style,{
    border : '3px solid rgb(13, 240, 13)',
});
order.style.color = 'rgb(13, 240, 13)';
icon.style.color = 'rgb(13, 240, 13)';
timeofSong.style.color = 'rgb(13, 240, 13)';


// Xử lý màu
var indexNow = 0 ;
function Paint(index){  
// Old Index
    listPlay[indexNow].style.border = 'none';
    var oldOrder =listPlay[indexNow].querySelector('.list_member_order');
    var oldIcon =listPlay[indexNow].querySelector('.fa-solid');
    var oldTimeofSong =listPlay[indexNow].querySelector('.list_member_quantity');
    oldOrder.style.color = 'black';
    oldIcon.style.color = 'black';
    oldTimeofSong.style.color = 'black';
// New Index
    listPlay[index].style.border = '3px solid rgb(13, 240, 13)' ;
    var Order =listPlay[index].querySelector('.list_member_order');
    var Icon =listPlay[index].querySelector('.fa-solid');
    var TimeofSong =listPlay[index].querySelector('.list_member_quantity');
    Order.style.color = 'rgb(13, 240, 13)';
    Icon.style.color = 'rgb(13, 240, 13)';
    TimeofSong.style.color = 'rgb(13, 240, 13)';
    indexNow = index;
}
function Execute(index){
    song.src = arrayOfMusic[index];
    ImgMus.src = arrayOfImg[index];
    TitleMusic.innerText = arrayOfTitle[index];
    authorMusic.innerText = arrayOfAuthor[index];
    isPlaying = false ;
    Play();
}

// var Length = listPlay.length;
// for(var index = 0 ; index < Length ; index++){
//     // listPlay[index].addEventListener('click',Paint);
//     // listPlay[index].addEventListener('click',function(){
//     //      Execute(index);
//     // });

//     console.log('index', index);
//     listPlay[index].addEventListener('click',() =>{
//         // Paint()
//         Execute(1);
//         console.log('index', index);
//     });
// }

// listPlay.forEach(function(element,index){
//     element.addEventListener('click',function(){
//         Paint(index);
//     })
// });
// listPlay.forEach(function(element,index){
//     const timeReality = element.querySelector('.list_member_quantity');
//     timeReality.innerText = formatTimer(song.duration);
// })

listPlay.forEach((element, index) => {
    element.addEventListener('click',() =>{
        Paint(index);
        Execute(index);
    });
})

// Tạo ra sự liên kết giữa Player và List
function CatchSong(){
    // i đã thay đổi 
    
}
song.addEventListener('change',CatchSong);
// Tự làm chuyển bài hát khi hết nhạc 
    // if(currentTime === duration){
    //     changeSong(1);
    //     Play();
    // }
    // Tự làm 

// CÁCH 2: TIẾN LÙI
// var i = 0 ;
// const size = arrayOfMusic.length;
// function Next(){
//     ++i;
//     if(i == size){
//         i = 0 ;
//     }
//     song.src = arrayOfMusic[i];
//     ImgMus.src = arrayOfImg[i];
//     TitleMusic.innerText = arrayOfTitle[i];
//     authorMusic.innerText = arrayOfAuthor[i];
//     isPlaying = false ;
// }
// nextBtn.addEventListener('click',Next);
// nextBtn.addEventListener('click',Play);

// function Prev(){
//     if(i == 0){
//         i = size;
//     }
//     --i;
//     song.src = arrayOfMusic[i];
//     ImgMus.src = arrayOfImg[i];
//     TitleMusic.innerText = arrayOfTitle[i];
//     authorMusic.innerText = arrayOfAuthor[i];
//     isPlaying = false ;
// }
// prevBtn.addEventListener('click',Prev);
// prevBtn.addEventListener('click',Play);
// `./music/${arrayOgMusic[0]}`

