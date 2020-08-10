export class Wheel {
  #OFFSET_GAP = 10;
  #INSIDE_GAP = 35;
  #INSIDE_STROKE_WIDTH = 10;
  #CENTER_STROKE_WIDTH = 10;
  #SECTOR_BORDER_WIDTH = 2;

  constructor(selector, options) {
    if (!options.sectors) {
      throw new Error("there are no sectors!");
    }
    this.$root = document.querySelector(selector);
    this.$canvas = document.createElement("canvas");
    this.$ctx = this.$canvas.getContext("2d");
    this.sectors = options.sectors;

    this.#setup();
    this.#render();
  }

  #render() {
    this.drawOuterArk();
    this.drawInnerArk();
    this.drawCenterArk();
    this.#generateSectors();
  }

  #setup() {
    this.$root.appendChild(this.$canvas);

    this.resizeHandler = this.resizeHandler.bind(this);
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  }

  #generateSectors() {
    this.sectors = this.sectors.map((item, index) => {
      const angleOffset = this.sectorStep * index;
      return {
        id: index,
        startAngle: this.sectorStep * index,
        endAngle: this.sectorStep * (index + 1),
        x1: this.centerRadius * Math.cos(angleOffset) + this.center.x,
        y1: this.centerRadius * Math.sin(angleOffset) + this.center.y,
        x2: this.innerRadius * Math.cos(angleOffset) + this.center.x,
        y2: this.innerRadius * Math.sin(angleOffset) + this.center.y,
      };
    });

    this.sectors.forEach((item) => {
      this.$ctx.beginPath();
      this.$ctx.moveTo(item.x1, item.y1);
      this.$ctx.lineWidth = this.#SECTOR_BORDER_WIDTH;
      this.$ctx.strokeStyle = "#1A173B";
      this.$ctx.lineTo(item.x2, item.y2);
      this.$ctx.stroke();
    });
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
    this.$ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
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
}
