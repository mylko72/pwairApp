let util = {
  /* 필터 함수
   * params list : 배열
   * params predicate : 조건문에 해당하는 함수
   * return new_list : 필터링된 새로운 배열
   * ex) _filter(users, function(user) { return user.age >= 30; });
   */
  _filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
      if (predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
  },
  /* 매핑 함수 : list의 크기만큼 함수 iteratee를 실행하면서 리턴된 새로운 값을 new_list에 매핑한다.
   * params list : 배열
   * params iteratee : 조건문에 해당하는 함수
   * return new_list : 매핑된 새로운 배열
   * ex) _filter(users, function(user) { return user.age >= 30; });
   */
  _map(list, iteratee) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
      new_list.push(iteratee(list[i]));
    }
    return new_list;
  }

}

export default util;
