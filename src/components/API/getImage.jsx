const BASE_URL = "https://server-cashierapp-production.up.railway.app/api"

function getImage(path) {
  if (!path) return "";
//   path = path.replaceAll("\\", "/");
  return `${BASE_URL}/${path}`;
}

export default getImage;