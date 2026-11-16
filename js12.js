

// Array of objects
let items = [
    {
        id: 1,
        name: "Learn JavaScript",
        complete: false
    },
    {
        id: 2,
        name: "Finish homework",
        complete: false
    }
];


// ========================================
// DOM Elements
// ========================================

const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");
const message = document.getElementById("message");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");



function renderItems() {

    // Clear the current list
    itemList.innerHTML = "";

    // If there are no items
    if (items.length === 0) {
        itemList.textContent = "No tasks yet.";
    }

    // Create the HTML for every item
    items.forEach(function(item) {

        const itemDiv = document.createElement("div");

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemStatus = document.createElement("p");

        if (item.complete) {
            itemStatus.textContent = "Status: Complete";
        } else {
            itemStatus.textContent = "Status: Incomplete";
        }

        // Status button
        const statusButton = document.createElement("button");

        if (item.complete) {
            statusButton.textContent = "Mark Incomplete";
        } else {
            statusButton.textContent = "Mark Complete";
        }

        statusButton.addEventListener("click", function() {
            toggleStatus(item.id);
        });


        // Remove button
        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            removeItem(item.id);
        });


        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemStatus);
        itemDiv.appendChild(statusButton);
        itemDiv.appendChild(removeButton);

        itemList.appendChild(itemDiv);
    });


    // Update summary
    updateSummary();
}


itemForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const input = itemInput.value.trim();

    if (input === "") {

        message.textContent = "Please enter a task.";

        return;
    }


    const newItem = {
        id: Date.now(),
        name: input,
        complete: false
    };


    items.push(newItem);


    itemInput.value = "";


    message.textContent = "";

    renderItems();
});

function toggleStatus(id) {

    const item = items.find(function(item) {
        return item.id === id;
    });


    if (item) {
        item.complete = !item.complete;
    }

    renderItems();
}


function removeItem(id) {

    items = items.filter(function(item) {
        return item.id !== id;
    });

    renderItems();
}



function updateSummary() {

    totalCount.textContent = items.length;

    const completedItems = items.filter(function(item) {
        return item.complete === true;
    });


    completedCount.textContent = completedItems.length;
}

renderItems();
