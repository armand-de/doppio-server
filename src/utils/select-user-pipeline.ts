export function selectUserPipeline(object: any) {
  delete object.user['password'];
  delete object.user['updatedDate'];
  // delete object.user['phone'];
  delete object.user['createdDate'];
  return object;
}

export function selectUserListPipeline(objectList: any[]) {
  objectList.map((object) => selectUserPipeline(object));
  return objectList;
}
