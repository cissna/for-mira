const STORAGE_KEY = 'chosenUser';

export function setUser(u) {
  localStorage.setItem(STORAGE_KEY, u);
}

export function getUser() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function collectForm(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    if (data.hasOwnProperty(key)) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }

  data.user = getUser();
  return data;
}
