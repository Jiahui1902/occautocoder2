
// read form input
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('crosswalkForm');
    if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Fetch API to submit form data without reloading the page
        // fetch('http://127.0.0.1:8989/getoptions', {
        fetch("{{ url_for('get_options') }}", {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.result); 
            document.getElementById('result').innerHTML = response.result; 
        })
        .catch(error => console.error('Error:', error));
    });
    }else {
        console.error("Form not found")
    }
});





function uploadFile() {
            const input = document.getElementById('crosswalkcsvFile');
            const data = new FormData();
            data.append('crosswalkcsv_file', input.files[0]);

            fetch("{{ url_for('parse_crosswalk') }}", {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // document.getElementById("crosswalkdata").innerHTML = data.message;
                })
            .catch(error => console.error('Error:', error));
        }


// function downloadCrosswalk() {
//     fetch("{{ url_for('parse_crosswalk') }}", {
//         method: 'POST',
//         body: new FormData(document.getElementById('crosswalkForm')) // Assuming you have a form
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // document.getElementById("crosswalkdata").innerHTML = "pros";
//         const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'data.json'; // Filename you wish to save as
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     })
//     .catch(error => console.error('Error:', error));
// }        



function downloadCrosswalk() {
    fetch("{{ url_for('parse_crosswalk') }}", {
        method: 'POST',
        body: new FormData(document.getElementById('crosswalkForm'))
    })
    .then(response => response.json())
    .then(response => {    
        if (response.data && Array.isArray(response.data)) {
        document.getElementById("crosswalkdata").innerHTML = response.message;
        // Convert JSON to CSV
        const csv = jsonToCSV(response.data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'crosswaled_data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
            console.error('No data to download or data is empty');
        }
    })
    .catch(error => console.error('Error:', error));
}


// convert JSON to CSV
function jsonToCSV(json) {
    const items = json;
    const replacer = (key, value) => value === null ? '' : value; 
    const header = Object.keys(items[0]);
    const csv = [
        header.join(','), 
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ];
    return csv.join('\r\n');
}





// return interactive results
document.addEventListener('DOMContentLoaded', function() {
            const resultsDiv = document.getElementById('interactiveOutput');
            const urlParams = new URLSearchParams(window.location.search);
            const result = urlParams.get('result');
            if (result) {
                resultsDiv.textContent = 'Crosswalked to: ' + result;
            }
});





