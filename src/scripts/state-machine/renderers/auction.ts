export const renderAuction = (data: any): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  const index = Math.max(
    0,
    data.animals.findIndex((a: { auctioned: boolean }) => !a.auctioned),
  );
  const animal = data.animals[index];

  gameContentElement.innerHTML = `
    <h2>Round ${index + 1}</h2>
    <h3>${animal.animal}</h3>
    <p>
      How much would you be willing to pay to have the ${
        animal.animal
      } exhibit at your zoo? You have ${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(data.cash)} remaining.
    </p>
    <form class="cmp-stack cmp-entry-form" data-action="submit-bid">
      <input type="hidden" name="animal" value="${animal.animal}" />
      <div>
        <label for="bidAmount">Bid Amount</label>
        <input id="bidAmount" type="text" name="bid-amount" pattern="^\\$?(?:100|[1-9]?[0-9](?:\\.[0-9]{1,2})?|0\\.[0-9]{1,2})$" inputmode="numeric"/>
      </div>
      <button type="submit">Submit Bid</button>
    </form>
  `;
};
