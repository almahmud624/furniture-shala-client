export const setAuthToken = (user) => {
  const currentUser = {
    email: user.email,
  };
  console.log(currentUser);
  fetch("http://localhost:4000/jwt", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("furniture-token", data.token);
    });
};