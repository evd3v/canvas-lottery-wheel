export class Wheel {
  #OFFSET_GAP = 10;
  #INSIDE_GAP = 35;
  #INSIDE_STROKE_WIDTH = 10;
  #CENTER_STROKE_WIDTH = 10;
  #SECTOR_BORDER_WIDTH = 3;
  #SPIN_ANGLE = Math.PI / 25;
  #BASE_STOP_ROUND = 3;

  #CURRENT_ROTATION_ANGLE = 0;
  #CURRENT_ROUND = 0;

  constructor(selector, options) {
    if (!options.sectors) {
      throw new Error("there are no sectors!");
    }
    this.$root = document.querySelector(selector);
    this.$canvas = document.createElement("canvas");
    this.$ctx = this.$canvas.getContext("2d");
    this.sectors = options.sectors;
    this.rotationInterval = null;

    this.#setup();
  }

  #render() {
    this.drawOuterArk();
    this.drawInnerArk();
    this.drawCenterArk();
    this.#generateSectors();
    this.drawTriangle();
  }

  #setup() {
    this.$root.appendChild(this.$canvas);

    this.resizeHandler = this.resizeHandler.bind(this);
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  }

  #generateSectors() {
    this.#mapSectors();
    this.#renderSectors();
    this.#renderText();
  }

  #mapSectors() {
    this.sectors = this.sectors.map((item, index) => {
      const offsetAngle =
        (this.sectorStep * (index + 1) - this.sectorStep * index) / 2 +
        this.sectorStep * index;
      return {
        id: index,
        offsetAngle,
        text: item.text || item,
        startAngle: this.sectorStep * index,
        endAngle: this.sectorStep * (index + 1),
        x1: this.centerRadius * Math.cos(offsetAngle) + this.center.x,
        y1: this.centerRadius * Math.sin(offsetAngle) + this.center.y,
        x2: this.innerRadius * Math.cos(offsetAngle) + this.center.x,
        y2: this.innerRadius * Math.sin(offsetAngle) + this.center.y,
      };
    });
  }

  #renderSectors() {
    this.$ctx.lineWidth = this.#SECTOR_BORDER_WIDTH;
    this.sectors.forEach((item) => {
      this.$ctx.beginPath();
      this.$ctx.fillStyle = item.id % 2 === 0 ? "#990066" : "#6633CC";

      this.$ctx.arc(
        this.center.x,
        this.center.y,
        this.innerRadius,
        item.startAngle +
          this.rotateAngle +
          (2 * this.#SECTOR_BORDER_WIDTH) / (Math.PI * this.innerRadius),
        item.endAngle + this.rotateAngle,
        false
      );
      this.$ctx.arc(
        this.center.x,
        this.center.y,
        this.centerRadius,
        item.endAngle + this.rotateAngle,
        item.startAngle +
          (2 * this.#SECTOR_BORDER_WIDTH) / (Math.PI * this.centerRadius) +
          this.rotateAngle,
        true
      );
      this.$ctx.stroke();
      this.$ctx.fill();
      this.$ctx.save();
    });
  }

  #renderText() {
    this.sectors.forEach((item) => {
      const textRotateAngle = 0.03; // based on text height

      const halfSectorAngle =
        (item.endAngle - item.startAngle) / 2 - textRotateAngle;
      const offsetRadius =
        (this.centerRadius - this.innerRadius) / 2 + this.innerRadius;
      this.$ctx.save();
      this.$ctx.font = "24px serif";
      this.$ctx.fillStyle = "#fff";
      this.$ctx.translate(
        this.center.x +
          offsetRadius *
            Math.cos(
              item.offsetAngle - halfSectorAngle + this.#CURRENT_ROTATION_ANGLE
            ),
        this.center.y +
          offsetRadius *
            Math.sin(
              item.offsetAngle - halfSectorAngle + this.#CURRENT_ROTATION_ANGLE
            )
      );
      this.$ctx.textAlign = "center";
      this.$ctx.rotate(
        item.offsetAngle - halfSectorAngle + this.#CURRENT_ROTATION_ANGLE
      );
      this.$ctx.fillText(item.text, 0, 0);
      this.$ctx.restore();
    });
  }

  rotate() {
    const randomSectors = Math.floor(
      Math.random() * this.sectors.length + this.sectors.length / 2
    );

    const randomAngle = randomSectors * this.sectorStep;
    const stopRound =
      Math.floor(randomAngle / (Math.PI * 2)) + this.#BASE_STOP_ROUND;

    clearInterval(this.rotationInterval);
    this.rotationInterval = setInterval(() => {
      if (this.#CURRENT_ROTATION_ANGLE > 2 * Math.PI) {
        this.#CURRENT_ROTATION_ANGLE =
          2 * Math.PI - this.#CURRENT_ROTATION_ANGLE + this.#SPIN_ANGLE;
        this.#CURRENT_ROUND += 1;
      } else {
        this.#CURRENT_ROTATION_ANGLE += this.#SPIN_ANGLE;
      }

      if (this.#CURRENT_ROUND >= this.#BASE_STOP_ROUND) {
        this.stop(randomAngle, stopRound);
      } else {
        this.#SPIN_ANGLE =
          this.#SPIN_ANGLE > 0.05 ? this.#SPIN_ANGLE * 0.99 : this.#SPIN_ANGLE;
      }

      this.#render();
    }, 24);
  }

  stop(angle, round) {
    this.#SPIN_ANGLE = this.#SPIN_ANGLE * (1 - (this.#SPIN_ANGLE / 24) * angle);

    if (
      this.#CURRENT_ROUND === round &&
      this.#CURRENT_ROTATION_ANGLE.toFixed(1) ===
        (angle % (Math.PI * 2)).toFixed(1)
    ) {
      clearInterval(this.rotationInterval);
    }
  }

  get rotateAngle() {
    return (
      this.sectorStep +
      Math.PI / this.sectors.length +
      this.#CURRENT_ROTATION_ANGLE
    );
  }

  get sectorStep() {
    return (2 * Math.PI) / this.sectors.length;
  }

  get center() {
    return {
      x: Math.round(this.rootSize.width / 2),
      y: Math.round(this.rootSize.height / 2),
    };
  }

  get radius() {
    return (
      (this.rootSize.width > this.rootSize.height
        ? this.center.y
        : this.center.x) - this.#OFFSET_GAP
    );
  }

  get innerRadius() {
    return this.radius - this.#INSIDE_GAP;
  }

  get centerRadius() {
    return this.radius * 0.35;
  }

  get rootSize() {
    return {
      width: this.$root.clientWidth || 0,
      height: this.$root.clientHeight || 0,
    };
  }

  set rootSize(size) {
    this.$canvas.height = size.height;
    this.$canvas.width = size.width;
    this.#render();
    this.rotate();
  }

  resizeHandler() {
    this.rootSize = {
      width: this.$root.clientWidth || 0,
      height: this.$root.clientHeight || 0,
    };
  }

  createOuterGradient() {
    const gradient = this.$ctx.createLinearGradient(
      this.center.x - this.radius,
      this.center.y,
      this.center.x + this.radius,
      this.center.y
    );

    gradient.addColorStop(0, "#990066");
    gradient.addColorStop(1, "#FF9966");
    return gradient;
  }

  drawOuterArk() {
    this.$ctx.beginPath();
    this.$ctx.arc(this.center.x, this.center.y, this.radius, 0.05, Math.PI * 2);
    this.$ctx.fillStyle = this.createOuterGradient();
    this.$ctx.fill();
  }

  drawInnerArk() {
    this.$ctx.beginPath();
    this.$ctx.arc(
      this.center.x,
      this.center.y,
      this.innerRadius,
      0,
      Math.PI * 2
    );
    this.$ctx.lineWidth = this.#INSIDE_STROKE_WIDTH;
    this.$ctx.fillStyle = "#990066";
    this.$ctx.fill();
    this.$ctx.strokeStyle = "#1A173B";
    this.$ctx.stroke();
  }

  drawCenterArk() {
    this.$ctx.beginPath();
    this.$ctx.arc(
      this.center.x,
      this.center.y,
      this.centerRadius,
      0,
      Math.PI * 2
    );
    this.$ctx.lineWidth = this.#CENTER_STROKE_WIDTH;
    this.$ctx.strokeStyle = "#1A173B";
    this.$ctx.stroke();
  }

  drawTriangle() {
    this.$ctx.beginPath();
    const startX = this.center.x + this.innerRadius;
    const startY = this.center.y;
    this.$ctx.moveTo(startX + 20, startY - 20);
    this.$ctx.lineTo(startX + 20, startY + 20);
    this.$ctx.lineTo(startX - 20, startY);
    this.$ctx.closePath();

    this.$ctx.fillStyle = "#fff";
    this.$ctx.fill();
  }
}
