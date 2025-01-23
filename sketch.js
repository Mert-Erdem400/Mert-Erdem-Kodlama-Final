var pigeons = [];
var totalPigeons = 20;
var backgroundColor = '#87CEEB'; // Gökyüzü rengi (Açık mavi)
var pigeonSpeedIncrement = 1; // Hız arttırma/değiştirme miktarı

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(backgroundColor);

    for (var i = 0; i < totalPigeons; i++) {
        pigeons.push({
            x: random(0, width),
            y: height + 200,
            size: random(40, 70),
            speed: random(1, 4),
            offset: 0,
            textOpacity: 1,
            flewAway: false,
            color: color('#e6e6fa') // Başlangıçta açık beyaz
        });
    }
}

function draw() {
    background(backgroundColor);
    drawPigeons();
}

function drawPigeons() {
    pigeons.forEach(function (pigeon) {
        if (pigeon.offset > height + 400) {
            pigeon.offset = 0;
            pigeon.flewAway = false; // Geri dönen güvercinler için
        }

        pigeon.offset = pigeon.offset + pigeon.speed;

        if (pigeon.flewAway) {
            fill('rgba(0, 0, 0, ' + pigeon.textOpacity + ')');
            textSize(18);
            textAlign(CENTER);
            text('Güvercin uçtu....Mert....!', pigeon.x, pigeon.y - pigeon.offset);

            if (pigeon.textOpacity > 0.01) {
                pigeon.textOpacity -= 0.01;
            } else {
                pigeon.textOpacity = 0;
            }
        } else {
            // Güvercin çizimi
            noStroke();

            // Gövde
            fill(pigeon.color); // Güvercin rengi
            ellipse(pigeon.x, pigeon.y - pigeon.offset, pigeon.size * 1.2, pigeon.size);

            // Kanatlar
            fill('#2ACAEA'); // Kanatlar Turkuaz
            triangle(
                pigeon.x - pigeon.size * 0.8,
                pigeon.y - pigeon.offset,
                pigeon.x - pigeon.size * 1.2,
                pigeon.y - pigeon.offset - pigeon.size * 0.6,
                pigeon.x - pigeon.size * 0.6,
                pigeon.y - pigeon.offset - pigeon.size * 0.3
            ); // Sol kanat
            triangle(
                pigeon.x + pigeon.size * 0.8,
                pigeon.y - pigeon.offset,
                pigeon.x + pigeon.size * 1.2,
                pigeon.y - pigeon.offset - pigeon.size * 0.6,
                pigeon.x + pigeon.size * 0.6,
                pigeon.y - pigeon.offset - pigeon.size * 0.3
            ); // Sağ kanat

            // Baş
            fill('#ffd600'); // Baş Rengi Turuncu
            ellipse(
                pigeon.x,
                pigeon.y - pigeon.offset - pigeon.size * 0.7,
                pigeon.size * 0.5,
                pigeon.size * 0.5
            );

            // Gözler
            fill('white');
            // Sağ göz
            ellipse(
                pigeon.x + pigeon.size * 0.15,
                pigeon.y - pigeon.offset - pigeon.size * 0.75,
                pigeon.size * 0.15,
                pigeon.size * 0.15
            );
            // Sol göz
            ellipse(
                pigeon.x - pigeon.size * 0.15,
                pigeon.y - pigeon.offset - pigeon.size * 0.75,
                pigeon.size * 0.15,
                pigeon.size * 0.15
            );

            fill('black');
            // Sağ göz bebeği
            ellipse(
                pigeon.x + pigeon.size * 0.15,
                pigeon.y - pigeon.offset - pigeon.size * 0.75,
                pigeon.size * 0.07,
                pigeon.size * 0.07
            );
            // Sol göz bebeği
            ellipse(
                pigeon.x - pigeon.size * 0.15,
                pigeon.y - pigeon.offset - pigeon.size * 0.75,
                pigeon.size * 0.07,
                pigeon.size * 0.07
            );

            // Gagası
            fill('orange');
            triangle(
                pigeon.x,
                pigeon.y - pigeon.offset - pigeon.size * 0.7,
                pigeon.x + pigeon.size * 0.2,
                pigeon.y - pigeon.offset - pigeon.size * 0.65,
                pigeon.x,
                pigeon.y - pigeon.offset - pigeon.size * 0.6
            );
        }
    });
}

function wasClickInsidePigeon(pigeon) {
    var pigeonRadius = pigeon.size / 2;

    if (
        (mouseX > pigeon.x - pigeonRadius) &&
        (mouseX < pigeon.x + pigeonRadius) &&
        (mouseY > pigeon.y - pigeon.offset - pigeonRadius) &&
        (mouseY < pigeon.y - pigeon.offset + pigeonRadius)
    ) {
        return true;
    } else {
        return false;
    }
}

function mouseMoved() {
    // İlk güvercin fare imlecini takip etsin
    if (pigeons.length > 0) {
        pigeons[0].x = mouseX;
        pigeons[0].y = mouseY;
    }
}

function mouseClicked() {
    // Arka plan rengini rastgele değiştir
    backgroundColor = color(random(255), random(255), random(255));

    pigeons.forEach(function (pigeon) {
        if (wasClickInsidePigeon(pigeon)) {
            pigeon.flewAway = true;
            pigeon.color = color(random(255), random(255), random(255)); // Güvercin rengini değiştir
        }
    });
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        // Hızı artır
        pigeons.forEach(function (pigeon) {
            pigeon.speed += pigeonSpeedIncrement;
        });
    } else if (keyCode === DOWN_ARROW) {
        // Hızı azalt
        pigeons.forEach(function (pigeon) {
            pigeon.speed -= pigeonSpeedIncrement;
            if (pigeon.speed < 1) {
                pigeon.speed = 1; // Hızın minimum 1 olmasını sağla
            }
        });
    }

    if (key === 'N' || key === 'n') {
        // Yeni bir güvercin ekle
        pigeons.push({
            x: random(0, width),
            y: height + 200,
            size: random(40, 70),
            speed: random(1, 4),
            offset: 0,
            textOpacity: 1,
            flewAway: false,
            color: color('#e6e6fa') // Başlangıçta açık beyaz
        });
    }

    if (key === 'R' || key === 'r') {
        // Tüm güvercinlerin rengini değiştir
        pigeons.forEach(function (pigeon) {
            pigeon.color = color(random(255), random(255), random(255)); // Güvercin rengini değiştir
        });
    }

    if (keyCode === 32) { // SPACE tuşu
        pigeons.forEach(function (pigeon) {
            pigeon.flewAway = true;
        });
    }
}
