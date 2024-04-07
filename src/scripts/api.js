const apiToken = "7e5bc3b7-9b3c-4476-a6ed-5dc02c289290";
const apiId = "wff-cohort-10";
const apiServer = "https://mesto.nomoreparties.co";

//Загрузка информации о пользователе с сервера
const getUserInfo = () => {
  return fetch(apiServer + "/v1/" + apiId + "/users/me", {
    headers: {
      authorization: apiToken,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

//Загрузка карточек с сервера
const getCardsList = () => {
  return fetch(apiServer + "/v1/" + apiId + "/cards", {
    headers: {
      authorization: apiToken,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

//Редактирование профиля
function patchUserInfo(userInfo) {
  return fetch(apiServer + "/v1/" + apiId + "/users/me", {
    method: "PATCH",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(res.status);
  });
}

//Добавление новой карточки
const patchCard = (cardInfo) => {
  return fetch(apiServer + "/v1/" + apiId + "/cards", {
    method: "POST",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

//Удаление карточки
function deleteCard(id) {
  return fetch(apiServer + "/v1/" + apiId + "/cards/" + id, {
    method: "DELETE",
    headers: {
      authorization: apiToken,
    },
  })
  .then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(res.status);
  });
}

//Постановка лайка
function putLike(id) {
  return fetch(apiServer + "/v1/" + apiId + "/cards/likes/" + id, {
    method: "put",
    headers: {
      authorization: apiToken,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

////Снятие лайка
function deleteLike(id) {
  return fetch(apiServer + "/v1/" + apiId + "/cards/likes/" + id, {
    method: "DELETE",
    headers: {
      authorization: apiToken,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

//Редактирование аватара
function patchUserAvatar(linkAvatarValue) {
  return fetch(apiServer + "/v1/" + apiId + "/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: apiToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: linkAvatarValue,
    }),
  }).then((res) => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(res.status);
  });
}

export {
  getUserInfo,
  getCardsList,
  patchUserInfo,
  patchCard,
  deleteCard,
  putLike,
  deleteLike,
  patchUserAvatar,
};
