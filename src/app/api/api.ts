export function getCar(): void {
  fetch('http://127.0.0.1:3000/garage/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('error');
      }

      return response.json();
    })
    // .then((data) => {
    //   eslint-disable-next-line no-console
    //   console.log(data);
    // })
    .catch((error) => {
      console.error(error);
    });
}
