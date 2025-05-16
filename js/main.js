/* ---------- helpers ---------- */
const STORAGE_KEY = 'chosenUser';   // 'isaac' or 'mira'

export function setUser(u){ localStorage.setItem(STORAGE_KEY, u); }
export function getUser(){ return localStorage.getItem(STORAGE_KEY) || ''; }

/* Build an object of the form inputs so you can do whatever you want */
export function collectForm(elForm){
  const data = Object.fromEntries(new FormData(elForm).entries());
  data.user = getUser();           // add who is sending
  return data;
}

/* When you send to Twilio later:
fetch('/main', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
                body:new URLSearchParams(data) });
*/
