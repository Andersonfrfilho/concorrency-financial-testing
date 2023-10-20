let headersList = {
  Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
  amount: 80,
  account_id: '65916153-ebc7-4e77-9782-bfc0099403ae',
  type: 'debit',
});
(async () => {
  try {
    let response = await Promise.all([
      fetch(
        'http://localhost:3000/65916153-ebc7-4e77-9782-bfc0099403ae/transaction',
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        },
      ),
      fetch(
        'http://localhost:3000/65916153-ebc7-4e77-9782-bfc0099403ae/transaction',
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        },
      ),
    ]);

    let data = await response.text();
    console.log(data);
  } catch (error) {
    console.log(' ##############');
    console.log(error);
  }
  // Any code here will be executed after the books variable has the value.
})();
