/**
File: script.js
GUI Assignment:  Homework 3
Sarah Toth, UML C.S., Sarah_Toth@student.uml.edu
Copyright (c) 2025 by Sarah.  All rights reserved.
Updated by ST on June 15, 2025 at 8:43 PM
**/

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const numberInputs = document.querySelectorAll('input[type="number"]');

    // Prevent lone '.' or '-' from being valid input
    numberInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value === '.' || input.value === '-') {
                input.value = '';
            }
        });

        // Prevent typing '.' or ',' into the field
        input.addEventListener('keydown', (e) => {
            if (e.key === '.' || e.key === ',') {
                e.preventDefault();
            }
        });
    });
});

// Handle form submission for generating table
document.getElementById('tableForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // get input fields and elements
    const startRowInput = document.getElementById('startRow');
    const endRowInput = document.getElementById('endRow');
    const startColInput = document.getElementById('startCol');
    const endColInput = document.getElementById('endCol');
    const errorMsg = document.getElementById('errorMsg');
    const tableContainer = document.getElementById('tableContainer');

    // Reset error message and table
    errorMsg.textContent = '';
    tableContainer.innerHTML = '';

    // Store all inputs for easier looping
    const inputs = [startRowInput, endRowInput, startColInput, endColInput];

    // Check for lone '.' or '-' values
    for (let input of inputs) {
        if (input.value === '.' || input.value === '-') {
            errorMsg.textContent = 'Inputs cannot be just "." or "-". Please enter valid numbers.';
            return;
        }
    }

    // Convert to integers
    const startRow = parseInt(startRowInput.value);
    const endRow = parseInt(endRowInput.value);
    const startCol = parseInt(startColInput.value);
    const endCol = parseInt(endColInput.value);

    // Validation
    // All fields are filled with valid numbers
    if ([startRow, endRow, startCol, endCol].some(isNaN)) {
        errorMsg.textContent = 'Please enter all four numbers.';
        return;
    }

    // Each number is between -1000 and 1000
    if ([startRow, endRow, startCol, endCol].some(n => n < -1000 || n > 1000)) {
        errorMsg.textContent = 'All values must be between -1000 and 1000.';
        return;
    }

    // Start values are less than or equal to end values
    if (startRow > endRow || startCol > endCol) {
        errorMsg.textContent = 'Start values must be less than or equal to end values.';
        return;
    }

    // Limit the size of the table
    if (endRow - startRow > 100 || endCol - startCol > 100) {
        errorMsg.textContent = 'Please enter a range of 100 or less for rows and columns.';
        return;
    }

    // Generate table
    // Create table element and header/body
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Generate header row with column numbers
    const headRow = document.createElement('tr');
    headRow.appendChild(document.createElement('th')); // Empty top-left cell
    for (let c = startCol; c <= endCol; c++) {
        const th = document.createElement('th');
        th.textContent = c;
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);

    // Generate rows with multiplication values
    for (let r = startRow; r <= endRow; r++) {
        const tr = document.createElement('tr');
        const rowHeader = document.createElement('th');
        rowHeader.textContent = r;
        tr.appendChild(rowHeader);
        for (let c = startCol; c <= endCol; c++) {
            const td = document.createElement('td');
            td.textContent = r * c;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // Add table to page
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
});
