const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cors());


function calculateBMI(height, weight) {
    const total = weight / (height**2);
    return total;
};
function bmiResult(calculateBMI) {
    if (calculateBMI < 18.5) {
        return 'Berat badan kurang';
    } else if ( 18.5 < calculateBMI < 22.9 ) {
        return 'Berat badan normal';
    } else if ( 23 < calculateBMI < 29.9) {
        return 'Berat badan berlebih';
    } else if ( calculateBMI > 30) {
        return 'Obesitas';
    }
};

app.post('/bmi', (req, res) => {

    let persons = {
        name : req.body.name,
        height : req.body.height,
        weight : req.body.weight
    }

    let hasilBmi = calculateBMI(persons.height, persons.weight);
    let statusBmi = bmiResult(calculateBMI(persons.height, persons.weight));
    persons.bmi = hasilBmi;
    persons.statusBmi = statusBmi

    res.json(persons);
});

app.listen(port, () => {
    console.log(`port berjalan pada http://localhost:${port}`);
});