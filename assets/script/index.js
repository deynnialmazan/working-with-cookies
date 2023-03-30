'use strict';
const firstDialog = document.querySelector('.first-dialog');
const secondDialog = document.querySelector('.second-dialog');
const acceptBtn = document.querySelector('.accept-btn');
const settingsBtn = document.querySelector('.settings-btn');
const checkOne = document.querySelector('.check-one');
const checkTwo = document.querySelector('.check-two');
const checkThree = document.querySelector('.check-three');
const checkFour = document.querySelector('.check-four');
const saveBtn = document.querySelector('.save-preferences');


// Check if cookies are enabled and if there are any cookies stored
if (navigator.cookieEnabled && document.cookie) {
  console.log('Cookies are enabled and cookies available');
  console.log(document.cookie);
  firstDialog.style.display = 'none';
} else {
  console.log('Cookies are not enabled or cookies not found');
  // Wait for 2 seconds before displaying the first dialog box
  setTimeout(() => {
    firstDialog.style.display = 'block';
  }, 2000);
};

// Functions!

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

//Accept all option
acceptBtn.addEventListener('click', ()=> {

  setCookie('Browser', browser, {'expires': date});
  setCookie('operatingSystem', system, {'expires': date});
  setCookie('screenWidth', screenWidth, {'expires': date});
  setCookie('screenHeight', screenHeight, {'expires': date});

  console.log('Cookies saved succesfully');
  
  console.log(getCookie('Browser'));
  console.log(getCookie('operatingSystem'));
  console.log(getCookie('screenWidth'));
  console.log(getCookie('screenHeight'));

  firstDialog.style.display = 'none';
});


//Settings option
settingsBtn.addEventListener('click', ()=> {
  firstDialog.style.display = 'none';
  secondDialog.style.display = 'block';
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

  console.log(getCookie('Browser'));
  console.log(getCookie('operatingSystem'));
  console.log(getCookie('screenWidth'));
  console.log(getCookie('screenHeight'));
  
});

