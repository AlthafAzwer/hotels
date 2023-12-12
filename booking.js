const roomTypeSelect = document.getElementById("roomType");
const extraBedSelect = document.getElementById("extraBed");
const checkInDateInput = document.getElementById("checkInDate");
const checkOutDateInput = document.getElementById("checkOutDate");
const numberOfRoomsInput = document.getElementById("numberOfRooms");

const adventureTypeSelect = document.getElementById("adventureType");
const adultCountInput = document.getElementById("adultCount");
const childCountInput = document.getElementById("childCount");
const foreignAdultCountInput = document.getElementById("foreignAdultCount");
const foreignChildCountInput = document.getElementById("foreignChildCount");

const adultGuideSelect = document.getElementById("adultGuideSelection");
const childrenGuideSelect = document.getElementById("childrenGuideSelection");

//Output
const roomcostOutput = document.getElementById("roomcostOutput");
const advcostOutput = document.getElementById("adventurecost");
const totalcostOutput = document.getElementById("totalCost");

//Room Button
const roomBook = document.getElementById("confirmBooking");
roomBook.addEventListener("click", calculateRoomCost);

//Adventure Button
const advbookbtn = document.getElementById("advBook");
advbookbtn.addEventListener("click", calculateAdventureCost);

//Total Button
roomBook.addEventListener("click", calculateTotalCost);

const wifiSelect = document.getElementById("wifi");
const poolViewSelect = document.getElementById("poolView");
const gardenViewSelect = document.getElementById("gardenView");





function calculateRoomCost() {
  const roomType = roomTypeSelect.value;
  const extraBeds = parseInt(extraBedSelect.value);
  const checkInDate = new Date(checkInDateInput.value);
  const checkOutDate = new Date(checkOutDateInput.value);
  const numberOfRooms = parseInt(numberOfRoomsInput.value);

  // Define room prices
  const roomPrices = {
    single: 25000,
    double: 35000,
    triple: 40000,
  };

  // Calculate the total number of nights
  const diffInTime = Math.abs(checkOutDate - checkInDate);
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  // Calculate room cost based on type, beds, and nights
  let roomCost = diffInDays * roomPrices[roomType] * numberOfRooms;
  roomCost += extraBeds * diffInDays * 8000;

  roomcostOutput.innerHTML = `${roomCost}`

  return roomCost;
}


function calculateAdventureCost() {
  const adventureType = adventureTypeSelect.value;
  const adultCount = parseInt(adultCountInput.value);
  const childCount = parseInt(childCountInput.value);
  const foreignAdultCount = parseInt(foreignAdultCountInput.value);
  const foreignChildCount = parseInt(foreignChildCountInput.value);

  // Define adventure prices
  const adventurePrices = {
    diving: {
      localAdult: 5000,
      localChild: 2000,
      foreignAdult: 10000,
      foreignChild: 5000,
    },
    biking: {
      localAdult: 3000,
      localChild: 1500,
      foreignAdult: 6000,
      foreignChild: 3000,
    },
    "hot-air-ballooning": {
      localAdult: 8000,
      localChild: 4000,
      foreignAdult: 16000,
      foreignChild: 8000,
    },
  };

  // Calculate the total cost based on participant types and prices
  let adventureCost = 0;
  adventureCost += adventurePrices[adventureType].localAdult * adultCount;
  adventureCost += adventurePrices[adventureType].localChild * childCount;
  adventureCost += adventurePrices[adventureType].foreignAdult * foreignAdultCount;
  adventureCost += adventurePrices[adventureType].foreignChild * foreignChildCount;

  const adultGuides = parseInt(adultGuideSelect.value);
  const childrenGuides = parseInt(childrenGuideSelect.value);

  // Define guide prices
  const guidePrices = {
    adult: 1000,
    child: 500,
  };

  // Calculate total guide cost
  let guideCost = adultGuides * guidePrices.adult + childrenGuides * guidePrices.child;

  totaladventure = guideCost + adventureCost;

  advcostOutput.innerHTML = `${totaladventure}`

  return totaladventure;
}

const promoCodeInput = document.getElementById("promoCode");

function calculateDiscount(subtotal) {
  const promoCode = promoCodeInput.value.toLowerCase().trim();
  if (promoCode === "promo123") {
    return subtotal * 0.05;
  } else {
    return 0;
  }
}

function calculateTotalCost() {
    const roomCost = calculateRoomCost();
    const adventureCost = calculateAdventureCost();
    const subtotal = roomCost + adventureCost;
    const discount = calculateDiscount(subtotal);
    const totalCost = subtotal - discount;
    totalcostOutput.innerHTML = `${totalCost}`;
    return totalCost;
  
    // Update UI elements with calculated values
    // document.getElementById("subtotal").innerText = `LKR ${subtotal}`;
    // document.getElementById("discount").innerText = `LKR -${discount}`;
    // document.getElementById("total-payable").innerText = `LKR ${totalCost}`;

    


  }

  
  const addToFavoritesButton = document.getElementById("addToFavorites");
  let favoriteTable = document.getElementById("favorite_add");

function saveToFavorites() {
  const bookingData = {
    roomType: roomTypeSelect.value,
    extraBeds: parseInt(extraBedSelect.value),
    checkInDate: checkInDateInput.value,
    checkOutDate: checkOutDateInput.value,
    numberOfRooms: parseInt(numberOfRoomsInput.value),
    adventureType: adventureTypeSelect.value,
    adultCount: parseInt(adultCountInput.value),
    childCount: parseInt(childCountInput.value),
    foreignAdultCount: parseInt(foreignAdultCountInput.value),
    foreignChildCount: parseInt(foreignChildCountInput.value),
    wifi: wifiSelect.value,
        poolView: poolViewSelect.value,
        gardenView: gardenViewSelect.value,
  };
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  
  favoriteTable.innerHTML = `
  <tr>
  <td>${name.value}</td>
  <td>${email.value}</td>
  <td>${bookingData.checkInDate}</td>
  <td>${bookingData.checkOutDate}</td>
  <td>${bookingData.numberOfRooms}</td>
  <td>${calculateRoomCost()}</td>
  <td>${calculateAdventureCost()}</td>
  <td>${calculateTotalCost()}</td>`

  const jsonString = JSON.stringify(bookingData);
  localStorage.setItem("favoriteBooking", jsonString);

  alert("Booking saved to favorites.");
}

const checkPointsButton = document.getElementById("checkPoints");

function calculateLoyaltyPoints() {
  const numberOfRooms = parseInt(numberOfRoomsInput.value);

  if (numberOfRooms > 3) {
    return numberOfRooms * 20;
  } else {
    return 0;
  }
}

function updateLoyaltyPointsDisplay() {
  const points = calculateLoyaltyPoints();
  if (points > 0) {
    const totalPoints = (localStorage.getItem("loyaltyPoints") || 0) + points;
    localStorage.setItem("loyaltyPoints", totalPoints);
    alert(`Congratulations! You have earned ${points} loyalty points for this booking.`);
  } else {
    alert("Unfortunately, you haven't earned any loyalty points for this booking.");
  }
}

addToFavoritesButton.addEventListener("click", saveToFavorites);
checkPointsButton.addEventListener("click", updateLoyaltyPointsDisplay);

document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("bookingForm");

  form.addEventListener("submit", function(event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  function validateForm() {
    var isValid = true;

    // Validate guest information
    isValid = validateField("name") && isValid;
    isValid = validateField("email") && isValid;
    isValid = validateField("phoneNumber") && isValid;
    isValid = validateField("address") && isValid;
    isValid = validateField("city") && isValid;
    isValid = validateField("country") && isValid;
    isValid = validateField("postalCode") && isValid;

    // Validate room booking
    isValid = validateField("roomType") && isValid;
    isValid = validateField("extraBed") && isValid;
    isValid = validateField("checkInDate") && isValid;
    isValid = validateField("checkOutDate") && isValid;
    isValid = validateField("numberOfRooms") && isValid;

    // Validate adventure booking
    isValid = validateField("adventureType") && isValid;
    isValid = validateField("adultCount") && isValid;
    isValid = validateField("childCount") && isValid;
    isValid = validateField("foreignAdultCount") && isValid;
    isValid = validateField("foreignChildCount") && isValid;
    isValid = validateField("adultGuideSelection") && isValid;
    isValid = validateField("childrenGuideSelection") && isValid;

    // Additional validation logic can be added here

    return isValid;
  }

  function validateField(fieldName) {
    var field = document.getElementById(fieldName);
    var value = field.value.trim();

    if (value === "") {
      alert("Please fill in all required fields.");
      field.focus();
      return false;
    }

    // Additional validation logic for specific fields can be added here

    return true;
  }
});


