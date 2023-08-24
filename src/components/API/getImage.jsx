const BASE_URL = "http://localhost:8000/api"

function getImage(path) {
  if (!path) return "";
//   path = path.replaceAll("\\", "/");
  return `${BASE_URL}/${path}`;
}

export default getImage;