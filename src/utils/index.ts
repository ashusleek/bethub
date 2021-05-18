export const API_TYPE = (action: string) => ({
  STARTED: `${action}_STARTED`,
  FULLFILLED: `${action}_FULLFILLED`,
  REJECTED: `${action}_REJECTED`
});

export function cleanObject(obj) {
  for (var propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
  return obj;
}

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export const downloadLink = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', '_blank');
  link.setAttribute('download', `${name}`); //or any other extension
  document.body.appendChild(link);
  link.click();
};
