async function rough() {
  const data = await fetch("https://crossdok.com/api/v1/driver/DriverLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: '+917985717101',
    }),
  })
  console.log(await data.json());
}
export default rough;
