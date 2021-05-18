function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPath(path: string) {
  let c_path: string[] | string = path.split('.');
  c_path = c_path[c_path.length - 1];
  return c_path.replace('_', ' ');
}

export const errorRequire = error => {
  const path = getPath(error.path);
  return capitalizeFirstLetter(path) + ' is required';
};

const appendZero = data => {
  if (data && data.toString().length === 1) {
    return `0${data}`;
  }
  return data;
};

export const getDate = _date => {
  const date = new Date(_date);
  return `${appendZero(date.getDate())}/${appendZero(date.getMonth() + 1)}/${appendZero(date.getFullYear())}, ${appendZero(
    date.getHours()
  )}:${appendZero(date.getMinutes())}`;
};

export const downloadLink = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${name}`); //or any other extension
  document.body.appendChild(link);
  link.click();
};
