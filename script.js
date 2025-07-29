let score = 0;
const scoreDisplay = document.getElementById('score');

const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const infoBox = document.getElementById('info');

const cellInfo = {
  cell_wall: {
    name: "ผนังเซลล์",
    function: "ช่วยให้เซลล์พืชแข็งแรง ป้องกันแรงกระแทก",
    structure: "โครงสร้างแข็งแรงอยู่นอกสุดของเซลล์พืช"
  },
  chloroplast: {
    name: "คลอโรพลาสต์",
    function: "สังเคราะห์แสงเพื่อสร้างอาหาร",
    structure: "มีรงควัตถุสีเขียว (คลอโรฟิลล์)"
  },
 one: {
    name: "คลอโรพลาสต์",
    function: "ควบคุมการผ่านเข้า-ออกของสาร",
    structure: "บางมากและยืดหยุ่นได้"
  },
   cell_membrane: {
    name: "เยื่อหุ้มเซลล์",
    function: "ควบคุมการผ่านเข้าออกของสาร",
    structure: "เป็นเยื่อบาง ๆ หุ้มรอบเซลล์"
  },
  mitochondria: {
    name: "ไมโตคอนเดรีย",
    function: "สร้างพลังงานให้เซลล์",
    structure: "มีเยื่อ 2 ชั้น ลักษณะยาวรี"
  },
  nucleus: {
    name: "นิวเคลียส",
    function: "ควบคุมกิจกรรมของเซลล์และเก็บสารพันธุกรรม",
    structure: "อยู่กลางเซลล์ ล้อมรอบด้วยเยื่อสองชั้น"
  }
}

// เริ่ม drag
draggables.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
});

// โซนวาง
dropzones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('dragover');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const draggedId = e.dataTransfer.getData("text/plain");
    const correctAnswer = zone.dataset.answer;

    if (draggedId === correctAnswer) {
      const cell = cellInfo[draggedId];
      zone.innerHTML = `✅ ${cell.name}`;
      zone.style.backgroundColor = "#00d9ffff";

      infoBox.innerHTML = `
        <h3>${cell.name}</h3>
        <p><strong>หน้าที่:</strong> ${cell.function}</p>
        <p><strong>ลักษณะ:</strong> ${cell.structure}</p>
      `;

      // เพิ่มคะแนน
      score += 1;
      scoreDisplay.textContent = score;
    } else {
      zone.innerHTML = `❌ ผิด! ลองใหม่`;
      zone.style.backgroundColor = "#ffe0e0";
    }
  });
});
