let headersList = {
  Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  amount: 60,
  accountId: 1,
  type: 'debit',
});
(async () => {
  try {
    let response = await Promise.all([
      fetch('http://localhost:3000/1/transaction', {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }),
      fetch('http://localhost:3000/1/transaction', {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }),
    ]);

    let data = await response.text();
    console.log(data);
  } catch (error) {
    console.log(' ##############');
    console.log(error);
  }
  // Any code here will be executed after the books variable has the value.
})();
