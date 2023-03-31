'use strict';

const acceptBtn = document.querySelector('.accept-btn');
const settingsBtn = document.querySelector('.settings-btn');
const checkOne = document.querySelector('.check-one');
const checkTwo = document.querySelector('.check-two');
const checkThree = document.querySelector('.check-three');
const checkFour = document.querySelector('.check-four');
const saveBtn = document.querySelector('.save-preferences');
const dialogOne = document.querySelector('.dialog-one');
const dialogTwo = document.querySelector('.dialog-two');


// Check if cookies are enabled and if there are any cookies stored
if (navigator.cookieEnabled && document.cookie) {
  console.log('Cookies are enabled and cookies are stored');
  printCookies();
  } else {
  console.log('Cookies are not enabled or cookies not found');
  // Wait for 2 seconds before displaying the first dialog box
  setTimeout(() => {
    dialogOne.showModal();
  }, 2000);
};

// Functions!

function printCookies() {
  if(document.cookie.length > 0) {
      const cookies = document.cookie.split('; ');
      for (let i=0; i<cookies.length; i++) {
          console.log(
              decodeURIComponent(cookies[i].split('=')[0]) + ': ' + 
              decodeURIComponent(cookies[i].split('=')[1])
          );
      }
  } else {
      console.log('No cookies found');
  }
}


// Get browser name
function getBrowserName() {
  const ua = navigator.userAgent;
  let browserName;
  if (ua.indexOf("Firefox") !== -1) {
    browserName = "Mozilla Firefox";
  } else if (ua.indexOf("Opera") !== -1 || ua.indexOf("OPR") !== -1) {
    browserName = "Opera";
  } else if (ua.indexOf("Trident") !== -1 || ua.indexOf("MSIE") !== -1) {
    browserName = "Microsoft Internet Explorer";
  } else if (ua.indexOf("Edge") !== -1) {
    browserName = "Microsoft Edge";
  } else if (ua.indexOf("Chrome") !== -1) {
    browserName = "Google Chrome";
  } else if (ua.indexOf("Safari") !== -1) {
    browserName = "Apple Safari";
  } else {
    browserName = "unknown";
  }
  return browserName;
}

// Get OS name
function getOSName() {
  const userAgent = navigator.userAgent;
  let osName = "unknown";
  if (userAgent.indexOf("Win") !== -1) {
    osName = "Windows";
  } else if (userAgent.indexOf("Mac") !== -1) {
    osName = "MacOS";
  } else if (userAgent.indexOf("X11") !== -1) {
    osName = "UNIX";
  } else if (userAgent.indexOf("Linux") !== -1) {
    osName = "Linux";
  }
  return osName;
}

// Get screen dimensions
const screenWidth = (screen.width).toString();
const screenHeight = (screen.height).toString();


// Set cookie
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    SameSite: 'Lax',
    ...options
  };

  const keys = Object.keys(options);
  const values = Object.values(options);

  
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let i = 0; i < keys.length; i++) {
    updatedCookie += `; ${keys[i]}=${values[i]}`;
  }
  document.cookie = updatedCookie;
};


//Get cookie
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};


//Delete cookie
function deleteCookie(name) {
  setCookie(name, '', {'max-age': -1});
};


let browser = getBrowserName();
let system = getOSName();

const date = new Date();
date.setSeconds(date.getSeconds() + 15);


//Event listeners!

//Accept all options
acceptBtn.addEventListener('click', ()=> {

  setCookie('Browser', browser, {'expires': date});
  setCookie('operatingSystem', system, {'expires': date});
  setCookie('screenWidth', screenWidth, {'expires': date});
  setCookie('screenHeight', screenHeight, {'expires': date});

  console.log('Cookies saved succesfully');
  
  console.log(`Browser:` + getCookie('Browser'));
  console.log(`Operating system:` + getCookie('operatingSystem'));
  console.log(`Screen width: ` + getCookie('screenWidth'));
  console.log(`Screen height:` + getCookie('screenHeight'));
  dialogOne.close();
});


//Settings option
settingsBtn.addEventListener('click', ()=> {
  dialogOne.close();
  dialogTwo.showModal();
});


//Saving preferences
saveBtn.addEventListener('click', () => {

  const date = new Date();
  date.setSeconds(date.getSeconds() + 15);


  if (!checkOne.checked && !checkTwo.checked && !checkThree.checked && !checkFour.checked) {
    setCookie('Browser', null, {'expires': date});
    setCookie('operatingSystem', null, {'expires': date});
    setCookie('screenWidth', null, {'expires': date});
    setCookie('screenHeight', null, {'expires': date});
    } if (checkOne.checked) { setCookie('Browser', browser, {'expires': date}); 
    } if (checkTwo.checked) { setCookie('operatingSystem', system, {'expires': date}); 
    } if (checkThree.checked) { setCookie('screenWidth', screenWidth, {'expires': date}); 
    } if (checkFour.checked) { setCookie('screenHeight', screenHeight, {'expires': date}); 
  };

  console.log(`Browser: ` + getCookie('Browser'));
  console.log(`Operating system: ` + getCookie('operatingSystem'));
  console.log(`Screen width: ` + getCookie('screenWidth'));
  console.log(`Screen height: ` + getCookie('screenHeight'));

  dialogTwo.close();
});


//Close by clicking outside the dialog
dialogOne.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect(); 
                                          
  if(e.clientY < rect.top || e.clientY > rect.bottom ||
      e.clientX < rect.left || e.clientX > rect.right) {
        dialogOne.close();
      }
});

dialogTwo.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect(); 
                                          
  if(e.clientY < rect.top || e.clientY > rect.bottom ||
      e.clientX < rect.left || e.clientX > rect.right) {
          dialogTwo.close();
      }
});

