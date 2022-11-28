export const setAuthToken = (user) => {
  const currentUser = {
    email: user.email,
  };
  console.log(currentUser);
  fetch("https://furniture-shala-server.vercel.app/jwt", {
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
