document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Serialize form data into a JSON object
    let formData = {};
    const formElements = this.elements;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.tagName === 'BUTTON' || element.type === 'submit') {
            continue; // Skip submit button
        }

        formData[element.name] = element.value;
    }

    // Convert form data to CSV format
    const csvData = convertToCSV(formData);

    // Create a downloadable CSV file
    createCSVFile(csvData);

    // Display success message
    showSuccessMessage();
});

function convertToCSV(obj) {
    const headers = Object.keys(obj).join(',');
    const values = Object.values(obj).join(',');
    return `${headers}\n${values}`;
}

function createCSVFile(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.classList.remove('hidden');
}

function showSuccessMessage() {
    const form = document.getElementById('surveyForm');
    const successMessage = document.getElementById('successMessage');

    // Hide the form
    form.classList.add('hidden');

    // Show the success message
    successMessage.classList.remove('hidden');
}
