export function switchRecycleTypeName(recycle_type) {
  let name = "";
  switch (recycle_type) {
    case "clothes":
      name = "旧衣物";
      break;
    case "books":
      name = "书籍";
      break;
    case "home-appliances":
      name = "家电";
      break;
    case "phone":
      name = "手机平板";
      break;
  }
  return name;
}
